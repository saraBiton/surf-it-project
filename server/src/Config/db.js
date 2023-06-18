import mongoose from 'mongoose';

export const apiKey = 'AIzaSyBs28fQD8-yiY6leR2cAXSv9CGl5Sm4eVQ';

const connectDB = () =>
	mongoose
		.connect('mongodb://0.0.0.0:27017/Surf-it')
		.then(() => console.log('Connected to DB'))
		.catch((err) => {
			console.log();
			console.log(err);
		});

export default connectDB;
