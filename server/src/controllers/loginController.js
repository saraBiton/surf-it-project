import mongoose from 'mongoose';
import { User } from '../Models/userModel.js';

const checkLogin = async (user) => {
	try {
		console.log(user);

		const user1 = await User.find(user);
		console.log(user1);
		if (user1) {
			return user1;
		}


		return 'Invalid credentials';
	} catch (error) {
		console.error(error);
		return 'Internal server error';
	}
};

export default { checkLogin };
