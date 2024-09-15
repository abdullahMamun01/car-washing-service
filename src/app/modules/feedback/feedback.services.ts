import httpStatus from "http-status";
import AppError from "../../error/AppError";
import UserModel from "../user/user.model";
import TFeedback from "./feedback.interface";
import FeedbackModel from "./feedback.model";


const saveUserFeedbackToDB = async (paylaod: TFeedback) => {
    const user = await UserModel.findById(paylaod.user)
    if(!user){
        throw new AppError(httpStatus.NOT_FOUND , "this user not found!")
    }

    const feedback = await FeedbackModel.create(paylaod)
    return feedback
} 

const getAllFeedbackFromDB = async () => {
    const feedback = await FeedbackModel.find().populate('user', 'name').sort("-createdAt")
    return feedback
}

export const feedbackService  = {
    saveUserFeedbackToDB,
    getAllFeedbackFromDB
}