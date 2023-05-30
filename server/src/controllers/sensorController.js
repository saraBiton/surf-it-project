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
	delete obj._id;
	const sensor = new Sensor(obj);
	await sensor.save();

	if (sensor.isSimulateMoves) {
		console.log();
	}
	return sensor;
};

const updateSensor = async (id, obj) => {
	console.log('obj', obj);

	await Sensor.findByIdAndUpdate(id, obj);
	return 'Updated!';
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
