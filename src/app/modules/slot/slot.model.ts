import { model, Schema } from 'mongoose';
import { TSlot } from './slot.interface';


const slotSchema = new Schema<TSlot>({
  service: {
    type: Schema.Types.ObjectId,
    ref: 'CarWashService',
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  isBooked: {
    type: String,
    enum: ['booked', 'available', 'canceled'],
    default:"available",
    required: false,
  },
}, {versionKey:false , timestamps:true});



// Creating the Slot model
export const SlotModel = model<TSlot>('Slot', slotSchema);
