import { User } from '../Models/userModel.js';

const getAllUsers = async () => {
	// מביא רשימת משתמשים כולל סנסורים
	const uses = await User.find().populate('sensors');
	return uses;
};

const getUserById = async (id) => {
	return await User.findById(id).populate('sensors');
};

const addUser = async (obj) => {
	const user = new User(obj);
	await (user.save());
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
const checkLogin = async (username, password) => {
	console.log(username);
	console.log(password);
	try {
		const user = await User.findOne({ username, password });
		console.log(user);
		if (user) {
			return console.log(user);
		} else { return console.error(); }
	} catch (error) {
		console.error(error);
		return 'Internal server error';
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
