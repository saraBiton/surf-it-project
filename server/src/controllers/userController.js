/**
 * התקשרות עם מסד הנתונים עבור המשתמש
 */

import axios from 'axios';
import { User } from '../Models/userModel.js';

const getAllUsers = async () => {
	// מביא רשימת משתמשים כולל סנסורים
	const users = await User.find();
	return users.map((user) => user.dataToShow());
};

const getUserById = async (id) => {
	return await User.findById(id).populate('sensors');
};

const addUser = async (obj) => {
	const user = new User(obj);
	await user.save();
	return user;
};

const updateUser = async (id, obj) => {
	console.log('obj', obj);

	const user = await User.findByIdAndUpdate(id, obj).populate('sensors');
	return user;
};

const deleteUser = async (id) => {
	const user = await User.findByIdAndDelete(id);
	return user;
};

const checkLogin = async (firstName, lastName, password) => {
	console.log('&&&&&&&');
	console.log(firstName);
	try {
		const user = await User.findOne({ firstName, lastName, password });
		console.log(user);
		return user;
	} catch (error) {
		return error;
	}
};

export default {
	checkLogin,
	getAllUsers,
	getUserById,
	addUser,
	updateUser,
	deleteUser
};
