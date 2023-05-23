import mongoose from 'mongoose';

const connectDB = () => {
  mongoose
    .connect('mongodb://0.0.0.0:27017/Surf-it')
    .then(() => console.log('Connected to DB'))
    .catch((err) => console.log(err))
};

export default connectDB;