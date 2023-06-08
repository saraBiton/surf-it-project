/**
 * התקשרות עם מסד הנתונים עבור הסנסור
 */

import { Sensor } from '../Models/sensorModel.js';
import userController from './userController.js';

const getAllSensors = async () => {
	// מביא גם את פרטי המשתמש המשוייך
	const sensors = await Sensor.find().populate('userId');
	return sensors;
};

const getSensorById = (id) => {
	return Sensor.findById(id).populate('userId');
};

const addSensor = async (obj) => {
	delete obj._id;
	const sensor = new Sensor(obj);
	await sensor.save();

	// אם מוגדר לסימולציה של תזוזה, מפעיל סימולציה
	if (sensor.isSimulateMoves) {
		sensor.randomCoordinatesLoop();
	}
	// -	AddSensorForUser
	// מוסיף את הסנסור לאובייקט המשתמש
	const user = await userController.getUserById(sensor.userId);
	if (user) {
		user.sensors.push(sensor);
		await user.save();
	}

	return await sensor.populate('userId');
};

const SetRandomCoordinatesForAll = async () => {
	// פונ' זו מפעילה סימולצ' תזוזה בכל הסנסורים המוגדרים
	const list = await getAllSensors();

	for (const sensor of list) {
		sensor.randomCoordinatesLoop();
	}
};

const updateSensor = async (id, obj) => {
	console.log('obj', obj);

	const sensor = await Sensor.findByIdAndUpdate(id, obj);

	return await sensor.populate('userId');
};

const deleteSensor = async (id) => {
	const sensor = await Sensor.findByIdAndDelete(id);

	return sensor;
};

export default {
	getAllSensors,
	getSensorById,
	addSensor,
	updateSensor,
	deleteSensor,
	SetRandomCoordinatesForAll
};
