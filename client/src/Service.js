import axios from 'axios';

import { basicUrl } from './config';

const getAll = () => axios.get('http://localhost:8000/users');

const getById = (url, userId) => axios.get(`${url}/${userId}`);

const getAllSensors = () =>
	axios.get(`${basicUrl}sensors`);

// const addUser = (url, obj) => axios.post(url, obj);

const addItem = async (url, user) => {
	try {
		const response = await axios.post(`${url}`, user);
		console.log(response.data);
	} catch (error) {
		console.error(error);
	}
};
// const CheckPassword = async (url,userData) => {
//     try {
//         const response = await axios.post(`${url}`,userData);
//         console.log(response.data);
//     } catch (error) {
//         console.error(error);
//     }
// }
export const CheckPassword = async (url, user) => {
	try {
		const response = await axios.post(`${url}`, user);
		console.log(response.data);
		return response.data;
	} catch (error) {
		console.error(error);
	}
};

// const response = await axios.post(`${url}/${userData}`);

const updateItem = (url, userId, obj) => axios.patch(`${url}/${userId}`, obj);

const sendData = async (url, obj) => { // הבן שלי בוכה אז שניה אני בשקט
	try {
		const response = await axios.post(`${url}`, obj);
		console.log(response.data);
	} catch (error) {
		console.error(error);
	}
};

const DeleteSensor = async (url, sensor) => {
	try {
		const response = await axios.post(`${url}`, sensor);
		console.log(response.data);
	} catch (error) {
		console.error(error);
	}
};

export {
	DeleteSensor,
	sendData,
	addItem,
	getById,
	getAll,
	updateItem,
	getAllSensors
};
// איפה המסך של לוגין?
