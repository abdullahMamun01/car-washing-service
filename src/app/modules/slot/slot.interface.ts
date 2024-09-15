import { Types } from 'mongoose';
export type TSlotStatus  = 'booked' | 'available' | 'reserved' | 'unavailable';

export type TSlot = {
  service: Types.ObjectId; // refer to the car washing service model
  date: string;
  startTime: string;
  endTime: string;
  isBooked?: TSlotStatus;
};

export type TSlotQUery = {
  date?: string;
  serviceId?: string;
  page?:number ,
  limit?:number
};
