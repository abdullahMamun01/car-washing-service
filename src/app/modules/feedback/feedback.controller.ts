import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { feedbackService } from './feedback.services';
import { Request, Response } from 'express';

// Controller for feedback user
const createFeedback = catchAsync(async (req: Request, res: Response) => {
  const bookingList = await feedbackService.saveUserFeedbackToDB({
    user: req.user.userId,
    ...req.body,
  });
  
  sendResponse(res, {
    success: true,
    message: 'User bookings retrieved successfully',
    statusCode: httpStatus.OK,
    data: bookingList,
  });
});


const getAllFeedback = catchAsync(async (req: Request, res: Response) => {
  const bookingList = await feedbackService.getAllFeedbackFromDB();
  
  sendResponse(res, {
    success: true,
    message: 'User bookings retrieved successfully',
    statusCode: httpStatus.OK,
    data: bookingList,
  });
});

export const feedbackController = {
  createFeedback,
  getAllFeedback
};
