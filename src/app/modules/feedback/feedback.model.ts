import mongoose, { Schema} from 'mongoose';
import TFeedback from './feedback.interface';

// Define the feedback interface

// Define the schema for general feedback
const FeedbackSchema: Schema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    ratings: { type: Number, required: true, min: 1, max: 5 },
    description: { type: String, required: true, trim: true },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// Create the feedback model
const FeedbackModel = mongoose.model<TFeedback>('Feedback', FeedbackSchema);

export default FeedbackModel;
