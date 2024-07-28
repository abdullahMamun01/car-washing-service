
import { TBooking } from "./booking.interface";
import { Types } from "mongoose";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const convertToTBooking = (data:any , customerId:string) : TBooking => {
    return {
        customer:new Types.ObjectId(customerId), // Assuming customer ID is provided as a string
        service: new Types.ObjectId(data.serviceId),
        slot: new Types.ObjectId(data.slotId),
        vehicleType: data.vehicleType,
        vehicleBrand: data.vehicleBrand,
        manufacturingYear: data.manufacturingYear,
        registrationPlate: data.registrationPlate
    };
};

