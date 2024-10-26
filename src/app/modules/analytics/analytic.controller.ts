




import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

import { Request, Response } from "express";
import { analyticService } from "./analytic.service";

// Controller for booking a slot
const serviceAnalyticOverView = catchAsync(async (req: Request, res: Response) => {
    const analyticOverview = await analyticService.serviceAnalyticOverViewFromDB()

    sendResponse(res, {
        success: true,
        message: 'Service analytic overview retrieve successfully',
        statusCode: httpStatus.OK,
        data: analyticOverview,
    });
});

const profitAnalytic = catchAsync(async (req: Request, res: Response) => {
    const analyticOverview = await analyticService.profitAnalyticFromDB()

    sendResponse(res, {
        success: true,
        message: 'Service Revenue analytic overview retrieve successfully',
        statusCode: httpStatus.OK,
        data: analyticOverview,
    });
});



export const analyticController  = {
    serviceAnalyticOverView,
    profitAnalytic
}