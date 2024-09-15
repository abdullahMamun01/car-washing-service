import httpStatus from 'http-status';
import AppError from '../../error/AppError';
import { TSlot, TSlotQUery } from './slot.interface';
import { SlotModel } from './slot.model';
import { timeFormat } from './slot.utils';
import { CarwashModel } from '../carWashService/carWashService.models';

const createSlotIntoDb = async (payload: TSlot) => {
  //check the service already deleted
  const service = await CarwashModel.findById(payload.service);
  if (!service) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `this service: ${payload.service} not found!`,
    );
  }
  if (service?.isDeleted === true) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'The specified car wash service is not accessible because it is marked as deleted.',
    );
  }

  //check the range already exist
  const conflictSlot = await SlotModel.find({
    service: payload.service,
    date: payload.date,
    $or: [
      { startTime: { $lt: payload.endTime, $gte: payload.startTime } },
      { endTime: { $gt: payload.startTime, $lte: payload.endTime } },
    ],
  });

  // console.log(conflictSlot)
  if (conflictSlot.length > 0) {
    throw new AppError(
      httpStatus.CONFLICT,
      'Slot(s) already exist for the specified time range.',
    );
  }
  //create the clot for range
  const newStartTime = Math.floor(
    new Date(`1970-01-01T${payload.startTime}`).getTime(),
  );
  const newEndTime = Math.floor(
    new Date(`1970-01-01T${payload.endTime}`).getTime(),
  );
  if (newStartTime === newEndTime || newStartTime > newEndTime) {
    throw new AppError(
      httpStatus.CONFLICT,
      'invalid the specified time range.',
    );
  }

  const onHour = 60 * 60 * 1000;
  const slots: TSlot[] = [];

  for (let time = newStartTime; time < newEndTime; time += onHour) {
    const st = new Date(time);
    const et = new Date(time + onHour);
    const startTime = timeFormat(st);
    const endTime = timeFormat(et);

    const slot: TSlot = {
      service: payload.service,
      date: payload.date,
      startTime: startTime,
      endTime: endTime,
      isBooked: 'available',
    };
    slots.push(slot);
  }

  return await SlotModel.insertMany(slots);
};

//list of all available slot
const availabilitySlotIntoDB = async (query: TSlotQUery) => {
  if (query.serviceId) {
    const slot = await SlotModel.findOne({ service: query.serviceId });
    if (!slot)
      throw new AppError(httpStatus.NOT_FOUND, 'this id do not exists!');
  }

  const search: { date?: string; service?: string } = {};
  if (query.date) {
    search.date = query.date;
  }
  if (query.serviceId) {
    search.service = query.serviceId;
  }

  const page = Math.max(query.page ?? 1, 1);
  const limit = Math.max(query.limit ?? 10, 1);
  const skipItems = (page - 1) * limit;

  const slot = await SlotModel.find({ ...search })
    .populate('service')
    .skip(skipItems)
    .limit(limit).sort("-date");
  return slot;
};

type UpdateSlotPayload = {
  slotId: string;
  slotStatus: 'available' | 'unavailable';
};

const updateSlotStatusIntoDB = async (payload: UpdateSlotPayload) => {
  const slot = await SlotModel.findById(payload.slotId);
  if (!slot) {
    throw new AppError(httpStatus.NOT_FOUND, 'Slot not found');
  }
  if (slot.isBooked === 'booked') {
    throw new AppError(
      httpStatus.CONFLICT,
      'Cannot change the status. This slot is already booked!',
    );
  }

  const updatedSlot = await SlotModel.findByIdAndUpdate(
    payload.slotId,
    { isBooked: payload.slotStatus },
    { new: true, runValidators: true },
  );

  return updatedSlot;
};

export const SlotService = {
  createSlotIntoDb,
  availabilitySlotIntoDB,
  updateSlotStatusIntoDB,
};
