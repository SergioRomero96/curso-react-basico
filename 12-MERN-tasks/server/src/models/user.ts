import {model, Schema, Document} from 'mongoose';

export interface IUser extends Document{
    name: string;
    email: string;
    password: string;
    createdAt: Date;
}

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }
});

export default model<IUser>('User', userSchema);