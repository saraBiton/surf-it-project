import mongoose from 'mongoose';
import { User } from '../Models/userModel.js';

const checkLogin = async (user) => {
	try {
		console.log(user);

		const director = await Director.find(user);
		console.log(director);
		if (director) {
			return 'Director';
		}

		const lifeguard = await Lifeguard.findOne(user);
		if (lifeguard) {
			return 'Lifeguard';
		}

		return 'Invalid credentials';
	} catch (error) {
		console.error(error);
		return 'Internal server error';
	}
};

export default { checkLogin };
