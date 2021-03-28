import { Document, model, Schema } from "mongoose";

export interface IProject extends Document{
    name: string;
    user: any;
    createAt: Date;
}

const projectSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

export default model<IProject>('Project', projectSchema);