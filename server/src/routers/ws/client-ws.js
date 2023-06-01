/** @type {import ("express-ws").Router} */

import { Router } from 'express';

import sensorController from '../../controllers/sensorController.js';

const client_ws_router = Router();

client_ws_router.ws('/client-ws', (ws) => {
	console.log('connection');

	ws.on('message', async (msg) => {
		let loop = true;

		if (String(msg) === 'start') {
			ws.on('close', () => { loop = false; });
			// eslint-disable-next-line no-unmodified-loop-condition
			while (loop) {
				// שליחת רשימת סנסורים כל הזמן
				const sensorList = await sensorController.getAllSensors();
				ws.send(JSON.stringify(sensorList));
				await sleep(0.3);
			}
		}
	});
});

export { client_ws_router };

async function sleep (sec) {
	return await new Promise(
		(resolve) => setTimeout(resolve, sec * 1000)
	);
};
