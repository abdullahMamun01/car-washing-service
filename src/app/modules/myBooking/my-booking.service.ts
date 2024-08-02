import { BookingModel } from "../booking/booking.model";



const getBookingsByUserFromDB = async (userId: string) => {
    const bookings = await BookingModel.find({customer: userId }).select('-customer').populate(
        { path: 'service', select: "name name description price duration isDeleted" }
      ).populate(
        { path: 'slot', select: "service date startTime endTime isBooked" }
      )
    return bookings;
};

export const MyBookingService = {

    getBookingsByUserFromDB
  };
  