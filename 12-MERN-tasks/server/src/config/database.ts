import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_MONGO!, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });

        console.log('DB Online');
    } catch (error) {
        console.log(error);
        throw new Error('Error al iniciar la DB ver logs');
    }
}

export default connectDB;