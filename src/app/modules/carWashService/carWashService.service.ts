import httpStatus from 'http-status';
import AppError from '../../error/AppError';
import { TCarWashService } from './carWashService.interface';
import { CarwashModel } from './carWashService.models';

const findServiceById = async (id: string) => {
  return await CarwashModel.findById(id).select('-__v');
};

const createCarWashServiceToDB = async (payload: TCarWashService) => {
  const carWashService = await CarwashModel.create(payload);
  return carWashService;
};

const getAllServiceFromDb = async () => {
  return await CarwashModel.find();
};

const getSingleServiceFromDb = async (id: string) => {
  const service = await findServiceById(id);

  if (!service) {
    throw new AppError(httpStatus.NOT_FOUND, `${id} this service exists`);
  }
  if (service.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, `Service with ID ${id} has been deleted.`);
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
    { new: true }
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
