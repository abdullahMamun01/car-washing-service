/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { TUser } from "./user.interface";
import UserModel from "./user.model";
import { findUserByEmail } from "./user.utils";





const createUser  = async (payload : TUser) => {
    const isUserExist = await findUserByEmail(payload.email)
    if(isUserExist){
        throw new AppError(httpStatus.FOUND , `this email : ${payload.email} is already registered!`)
    }
    const newUser = await UserModel.create(payload)
    const userObject = newUser.toObject();

    // eslint-disable-next-line no-unused-vars
    const {password , ...res} = userObject
    return res
}



export const userService  = {
    createUser
}