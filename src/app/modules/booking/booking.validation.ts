import { Types } from 'mongoose';
import { z } from 'zod';

export const bookingValidationSchema = z.object({
  body: z.object({
    serviceId: z
      .string({ invalid_type_error: 'serviceId is required', required_error: "serviceId is required" })
      .refine((val) => Types.ObjectId.isValid(val), {
        message: 'Invalid serviceId',
      }),
    slotId: z
      .string({ invalid_type_error: 'slotId is required' })
      .refine((val) => Types.ObjectId.isValid(val), {
        message: 'Invalid slotId',
      }),
    vehicleType: z.enum([
      'car',
      'truck',
      'SUV',
      'van',
      'motorcycle',
      'bus',
      'electricVehicle',
      'hybridVehicle',
      'bicycle',
      'tractor',
    ], { required_error: "vehicleType is required", invalid_type_error: "invalid vehicle type" }),

    vehicleModel: z.string({ required_error: 'vehicleModel is required', invalid_type_error: "vehicleModel must be string" }),
    vehicleBrand: z.string({ required_error: 'vehicleBrand is required', invalid_type_error: "vehicleBrand must be string" }),
    manufacturingYear: z.number({ required_error: 'manufacturingYear is required', invalid_type_error: "vehicleBrand must be number" }),
    registrationPlate: z.string({ required_error: 'registrationPlate is required', invalid_type_error: "registrationPlate must be number" }),
  }),
});
