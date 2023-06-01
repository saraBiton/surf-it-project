// localhost:3000/users/
import { Router } from 'express';
import sensorController from '../controllers/sensorController.js';

const sensor_router = Router();

sensor_router.route('/').get(async (req, res) => {
	const result = await sensorController.getAllSensors();
	res.json(result);
});

sensor_router.route('/new').post(async (req, res) => {
	const obj = req.body;
	const result = await sensorController.addSensor(obj);
	console.log(result);
	res.json(result);
});

sensor_router.route('/:id').get(async (req, res) => {
	const result = await sensorController.getSensorById(req.params.id);
	res.json(result);
});

sensor_router.route('/:id/edit').put(async (req, res) => {
	const obj = req.body;
	const result = await sensorController.updateSensor(req.params.id, obj);
	res.json(result);
});

sensor_router.route('/:id/delete').delete(async (req, res) => {
	const result = await sensorController.deleteSensor(req.params.id);
	res.json(result);
});

export { sensor_router };
