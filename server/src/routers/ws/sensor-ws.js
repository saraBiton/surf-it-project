/**
 * תקשורת וובסוקט עם סנסור חיצוני
 */

/** @type {import("express-ws").Router} */
import { Router } from 'express';
import sensorController from '../../controllers/sensorController.js';

const sensor_ws_router = Router();

sensor_ws_router.ws('/sensor-ws', (ws) => {
	ws.on('message', (msg) => {
		ws.onerror = (error) => {
			console.error('WebSocket error:', error);
		};
		const sensor_data = JSON.parse(msg);
		sensorController.updateSensor(sensor_data._id, sensor_data);
	});
});

export { sensor_ws_router };
