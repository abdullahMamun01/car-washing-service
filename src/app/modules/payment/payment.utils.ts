import httpStatus from "http-status";
import AppError from "../../error/AppError";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseStripeMetaData = async (metadata: any) => {

    try {
        // Ensure 'details' property exists before attempting to parse
        if (!metadata.details) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Missing metadata details');
        }

        // Parse the metadata details
        const metaInfo = JSON.parse(metadata.details);
        // Destructure and extract all fields
        const {
            serviceId:service,
            slotId: slot,
            vehicleType,
            vehicleBrand,
            manufacturingYear,
            vehicleModel,
            registrationPlate
        } = metaInfo;

        if (!service || !slot) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Invalid service details');
        }

        // Return all data
        return { 
            service, 
            slot, 
            vehicleType, 
            vehicleBrand, 
            manufacturingYear, 
            vehicleModel, 
            registrationPlate 
        };
    } catch (error) {
        // Handle JSON parse errors or other issues
        throw new AppError(httpStatus.BAD_REQUEST, `Failed to parse service details:`);
    }
};

