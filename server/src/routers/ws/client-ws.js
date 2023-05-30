/** @type {import ("express-ws").Router} */

import { Router } from 'express';

import { sensor_list } from '../../sensor_list.js';

const client_ws_router = Router();

client_ws_router.ws('/client-ws', (ws) => {
	console.log('connection');

	ws.on('message', async (msg) => {
		if (String(msg) === 'start') {
			while (true) {
				ws.send(JSON.stringify(Object.values(sensor_list)));
				await new Promise(
					(resolve) => setTimeout(resolve, 0.3 * 1000)
				);
			}
		}
	});
});

export { client_ws_router };
