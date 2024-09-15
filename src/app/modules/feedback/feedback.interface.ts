import mongoose from "mongoose"



type TFeedback = {
    user : mongoose.Types.ObjectId ,
    ratings: number ,
    description: string
}


export default TFeedback