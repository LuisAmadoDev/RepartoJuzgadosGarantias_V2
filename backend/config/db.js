import mongoose from 'mongoose';

mongoose.set('strictQuery', false); // Deshabilitar el modo de consulta estricta

export const connectDB = (uri) => {
    return mongoose.connect(uri)
}