import { Types } from "mongoose"
import { TSlot } from "../slot/slot.interface";
import { TCarWashService } from "../carWashService/carWashService.interface";

type VehicleType =
  | "car"
  | "truck"
  | "SUV"
  | "van"
  | "motorcycle"
  | "bus"
  | "electricVehicle"
  | "hybridVehicle"
  | "bicycle"
  | "tractor";



export type TBooking = {
    customer: Types.ObjectId , // refer to the user  mongoose schema /model
    service: Types.ObjectId , // refer to the car washing service mongoose schema /model
    slot: Types.ObjectId     // refer to the slot mongoose schema /model 
    vehicleType: VehicleType,
    vehicleBrand: string ,
    manufacturingYear: number ,
    vehicleModel:string ,
    registrationPlate: string
}

export type TBookingPopulated =  {
  customer: string;
  service: TCarWashService;         // After population
  slot: TSlot;               // After population
  vehicleType: VehicleType;
  vehicleBrand: string;
  manufacturingYear: number;
  vehicleModel: string;
  registrationPlate: string;
}