import { Schema, model } from 'mongoose';
import { TUser } from './user.interface';
import { hashedPassword } from './user.utils';

// Create the Mongoose schema
const userSchema = new Schema<TUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false
    },
    phone: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey:false
  },
);

userSchema.pre('save' , async function(next){
  this.password = await hashedPassword(this.password)
  next()
})



// Create the Mongoose model
const UserModel = model<TUser>('User', userSchema);

export default UserModel;
