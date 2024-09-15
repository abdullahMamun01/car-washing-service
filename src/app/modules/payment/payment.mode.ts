import mongoose, { Schema } from "mongoose";
import { Payment } from "./payment.type";

const PaymentSchema = new Schema<Payment>({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Bookings',
      required: true,
    },
    paymentIntentId: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ['Card', 'card'],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'complete', 'failed', 'refunded'],
      required: true,
    },
    paymentDate: {
      type: Date,
      default: Date.now,
      required: true,
    },
    isProcessed: {
      type: Boolean,
      default: false,
    },
  });
  export const PaymentModel = mongoose.model<Payment>('Payment', PaymentSchema);