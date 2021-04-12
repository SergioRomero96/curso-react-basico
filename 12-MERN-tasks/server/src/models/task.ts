import { model, Schema } from "mongoose";

const taskSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project'
    }
})

export default model('Task', taskSchema);