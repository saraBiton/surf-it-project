import { User } from '../Models/userModel.js';

const getAllUsers = async () => {
	const uses = await User.find();
	return uses;
};

const getUserById = (id) => {
	return User.findById(id);
};

const addUser = async (obj) => {
	const user = new User(obj);
	await (user.save());
	return user;
};

const updateUser = async (id, obj) => {
	console.log('obj', obj);

	const user = await User.findByIdAndUpdate(id, obj);
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
		if (user) { return console.log(user); 
	} 
		else { return console.error(); }
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
