import mongoose from 'mongoose';
import { User } from '../Models/userModel.js';

const checkLogin = async (user) => {
	// try {
	// 	// Check if credentials exist in Director collection

	// 	console.log(user);

	// 	const director = await Director.find(user);
	// 	console.log(director);
	// 	if (director) {
	// 		return 'Director';
	// 	}

	// 	// Check if credentials exist in Lifeguard collection
	// 	const lifeguard = await Lifeguard.findOne(user);
	// 	// console.log(lifeguard);
	// 	if (lifeguard) {
	// 		return 'Lifeguard';
	// 	}

	// 	// If credentials do not exist in either collection, return error
	// 	return 'Invalid credentials';
	// } catch (error) {
	// 	console.error(error);
	// 	return 'Internal server error';
	// }
};

export default { checkLogin };
