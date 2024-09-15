import { CONFLICT, NOT_FOUND } from 'http-status';
import AppError from '../../error/AppError';
import UserModel from '../user/user.model';
import { TBooking } from './booking.interface';
import { CarwashModel } from '../carWashService/carWashService.models';
import { SlotModel } from '../slot/slot.model';
import { BookingModel } from './booking.model';

const bookSlotIntoDB = async (payload: TBooking) => {



  const [user, service, slot] = await Promise.all([
   await UserModel.findById(payload.customer).exec(),
   await CarwashModel.findById(payload.service.toString()).exec(),
   await SlotModel.findById(payload.slot).exec(),
  ]);

  if (!user) {
    throw new AppError(NOT_FOUND, 'User not found');
  }

  if (!service) {
    throw new AppError(NOT_FOUND, 'Service not found');
  }

  if (!slot) {
    throw new AppError(NOT_FOUND, 'Slot not found');
  }
  if (slot.isBooked === 'booked') {
    throw new AppError(CONFLICT, 'The slot is already booked! ');
  }

  // const booking = (await BookingModel.create(payload)).populate(
  //   'customer service slot',
  // );
  const booking = await BookingModel.create(payload)
 
  await SlotModel.findByIdAndUpdate(
    payload.slot,
    { isBooked: 'booked' },
    { new: true },
  );

  const populateBooking = await BookingModel.findById(booking._id).populate(
    { path: 'customer', select: "name email phone address" }
  ).populate(
    { path: 'service', select: "name name description price duration isDeleted" }
  ).populate(
    { path: 'slot', select: "service date startTime endTime isBooked" }
  )
  
  return populateBooking;
};

const getAllBookingsFromDB = async () => {
  return await BookingModel.find().populate(
    { path: 'customer', select: "name email phone address" }
  ).populate(
    { path: 'service', select: "name name description price duration isDeleted" }
  ).populate(
    { path: 'slot', select: "service date startTime endTime isBooked" }
  );
};


export const BookingService = {
  bookSlotIntoDB,
  getAllBookingsFromDB,

};
