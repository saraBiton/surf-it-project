import { Sensor } from '../Models/sensorModel.js';

const getAllSensors = async () => {
	const sensors = await Sensor.find();
	return sensors;
};

const getSensorById = (id) => {
	return Sensor.findById(id);
};

const addSensor = async (obj) => {
	delete obj._id;
	const sensor = new Sensor(obj);
	await sensor.save();

	if (sensor.isSimulateMoves) {
		sensor.randomCoordinatesLoop();
	}
	return sensor;
};

const SetRandomCoordinatesForAll = async () => {
	const list = await getAllSensors();

	for (const sensor of list) {
		sensor.randomCoordinatesLoop();
	}
};

const updateSensor = async (id, obj) => {
	console.log('obj', obj);

	return await Sensor.findByIdAndUpdate(id, obj);
};

const deleteSensor = async (id) => {
	return await Sensor.findByIdAndDelete(id);
};

export default {
	getAllSensors,
	getSensorById,
	addSensor,
	updateSensor,
	deleteSensor,
	SetRandomCoordinatesForAll
};
