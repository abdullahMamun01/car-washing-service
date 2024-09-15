
import { TBooking } from "./booking.interface";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const convertToTBooking = (data:any , customerId:string) : TBooking => {
    return {
        ...data ,
        customer: customerId, // Assuming customer ID is provided as a string
        service: data.service,
        slot: data.slot,
    };
};

