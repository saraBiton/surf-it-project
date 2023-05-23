import { Sensor } from '../Models/sensorModel.js';

const getAllSensors = async () => {
	try {
		const sensors = await Sensor.find();
		return sensors;
	} catch (err) {
		return err;
	}
};

const getSensorById = (id) => {
	return Sensor.findById(id);
};

const addSensor = async (obj) => {
	try {
		const sensor = new Sensor(obj);
		await (sensor.save());
		return sensor;
	} catch (err) {
		return err;
	}
};

const updateSensor = async (obj) => {
	console.log('obj', obj);
	try {
		await Sensor.findByIdAndUpdate(obj._id.toJSON('new ObjectId'), obj);
		return 'Updated!';
	} catch (err) {
		return err;
	}
};

const deleteSensor = async (id) => {
	await Sensor.findByIdAndDelete(id);
	return 'Deleted!';
};

export default {
	getAllSensors,
	getSensorById,
	addSensor,
	updateSensor,
	deleteSensor
};
