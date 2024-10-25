import httpStatus from 'http-status';
import AppError from '../../error/AppError';
import { TCarWashService, TServiceQuery } from './carWashService.interface';
import { CarwashModel } from './carWashService.models';
import { SlotModel } from '../slot/slot.model';

const findServiceById = async (id: string) => {
  return await CarwashModel.findById(id).select('-__v');
};

const createCarWashServiceToDB = async (payload: TCarWashService) => {
  const carWashService = await CarwashModel.create(payload);
  return carWashService;
};

export const getAllServiceFromDb = async (query: TServiceQuery) => {
  // Build the filtering/search criteria
  const searchCriteria = query.search
    ? {
        isDeleted: false,
        $or: [
          { name: { $regex: query.search, $options: 'i' } },
          { description: { $regex: query.search, $options: 'i' } },
        ],
      }
    : { isDeleted: false };

  // Build the sort criteria dynamically based on the query
  const sortCriteria: { [key: string]: 1 | -1 } = {};

  if (query.price) {
    sortCriteria.price = query.price === 'asc' ? 1 : -1;
  }

  if (query.duration) {
    sortCriteria.duration = query.duration === 'asc' ? 1 : -1;
  }
  const services = await CarwashModel.find(searchCriteria)
    .sort(sortCriteria)
    .lean();

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const availablService = services.map(async (service) => {
    const findAvailableSlot = await SlotModel.findOne({
      service: service._id,
      createdAt: { $gte: startOfToday },
    });

    return {
      ...service,
      hasOpenSlot: !!findAvailableSlot,
    };
  });

  // Fetch from the database with filter and sort options
  return await Promise.all(availablService);
};
const getSingleServiceFromDb = async (id: string) => {
  const service = await findServiceById(id);

  if (!service) {
    throw new AppError(httpStatus.NOT_FOUND, `${id} this service exists`);
  }
  if (service.isDeleted) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `Service with ID ${id} has been deleted.`,
    );
  }
  return service;
};

const updateService = async (id: string, payload: Partial<TCarWashService>) => {
  const service = await findServiceById(id);
  if (!service) {
    throw new AppError(httpStatus.NOT_FOUND, `${id} this service exists`);
  }
  const updatedService = await CarwashModel.findOneAndUpdate(
    { _id: id },
    payload,
    { new: true },
  ).select('-__v');

  return updatedService;
};

const deleteCarWashServiceFromDB = async (id: string) => {
  const service = await findServiceById(id);
  if (!service) {
    throw new AppError(httpStatus.NOT_FOUND, `${id} this service exists`);
  }
  const updatedService = await CarwashModel.findOneAndUpdate(
    { _id: id },
    {
      isDeleted: true,
    },
    { new: true },
  ).select('-__v');
  return updatedService;
};

export const CarWashService = {
  createCarWashServiceToDB,
  getAllServiceFromDb,
  getSingleServiceFromDb,
  updateService,
  deleteCarWashServiceFromDB,
};
