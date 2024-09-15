import httpStatus from 'http-status';
import AppError from '../../error/AppError';
import { BookingModel } from '../booking/booking.model';

const getBookingsByUserFromDB = async (userId: string) => {
  const bookings = await BookingModel.find({
    customer: userId,
  })
    .select('-customer')
    .populate({
      path: 'service',
      select: 'name description price duration isDeleted',
    })
    .populate({
      path: 'slot',
      select: 'service date startTime endTime isBooked',
    });

  if (bookings.length === 0) {
    throw new AppError(httpStatus.NOT_FOUND, 'No booking data found');
  }

  return bookings;
};

export const MyBookingService = {
  getBookingsByUserFromDB,
};
