/**
 * הדמייה של סנסור חיצוני
 */

import WebSocket from 'ws';
import { SetRandomCoordinates } from './RandomCoordinates.js';
import dijkstraAlgorithm from './controllers/userController.js';

/**
 * @typedef {({lat: Number, lng: Number})} Position
 */

class Sensor {
	/**
	 *
	 * @param {String} id
	 * @param {Position} position
	 */
	constructor (prop) {
		/** @type {Position} מיקום החיישן */
		this.position = prop.position;

		this.lifeJacketNum = prop.lifeJacketNum;

		this.isActive = true;

		// מצב החיישן
		this.status = 'OK'; // הכל בסדר-ירוקOK / -כתוםAttention-תשומת לב /  SOS-אדום, הזעקת כוחות הצלה

		// האם לנפח את האפודה?
		this.inflatedLifeJacket = false;
	}

	inflate_life_jacket () {
		this.inflatedLifeJacket = true;
	}

	on_sos () {
		this.status = 'SOS';
		this.inflate_life_jacket();
	}

	on_Attention () {
		this.status = 'Attention';
	}

	toSend () {
		return {
			_id: this.id,
			position: this.position,
			status: this.status,
			lifeJacketNum: this.lifeJacketNum,
			isActive: this.isActive,
			inflatedLifeJacket: this.inflatedLifeJacket
		};
	}

	async delete () {
		this.isActive = false;
		return await fetch(`http://127.0.0.1:8000/sensors/${this.id}/delete`, {
			body: JSON.stringify(this.toSend()),
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json' }
		});
	}

	async start () {
		const res = await fetch('http://127.0.0.1:8000/sensors/new', {
			body: JSON.stringify(this.toSend()),
			method: 'POST',
			headers: { 'Content-Type': 'application/json' }
		});

		const newSensor = await res.json();

		this.id = newSensor._id;

		this.ws_client = new WebSocket('ws://127.0.0.1:8000/sensor-ws');

		this.ws_client.on('open', async () => {
			console.log(`sensor ${this.id} connecting`);

			while (this.isActive) {
				this.position = setRandomCoordinates(this.position);

				const random_status = SetRandomStatus();

				switch (random_status) {
					case 'Attention':
						this.on_Attention();
						break;
					case 'SOS':
						this.on_sos();
						dijkstraAlgorithm.getActiveVolunteersDistances(this.position);
						break;
				}

				this.ws_client.send(JSON.stringify(this.toSend()));

				await new Promise(
					(resolve) => setTimeout(resolve, 0.3 * 1000)
				);

				if (this.status !== 'OK') {
					await new Promise(
						(resolve) => setTimeout(resolve, 5 * 1000)
					);
				}
			}
		});
	}
}

function SetRandomStatus () {
	let status = 'OK';

	if (Math.random() <= 0.02) {
		status = 'Attention';

		if (Math.random() <= 0.4) {
			status = 'SOS';
		}
	}

	return status;
}

(async function main () {
	try {
		await sleep(3 * 1000);
		console.log('sensor start...');
		const sensor1 = new Sensor({
			position: {
				lat: 31.791299,
				lng: 34.626264
			}
		});
		sensor1.start();
		const sensor2 = new Sensor({
			position: {
				lat: 31.790960,
				lng: 34.626059
			}
		});
		sensor2.start();

		async function onClose () {
			console.log('process is close...');
			await Promise.all([
				sensor1.delete(), sensor2.delete()
			]);
			console.log('process is close!');
			process.exit(0);
		}

		// process.on('SIGKILL', onClose);
		process.on('SIGINT', onClose);
	} catch (error) {
		console.error(error);
		await sleep(2 * 1000);
		main();
	}
})();

async function sleep (ms) {
	return	 new Promise(
		(resolve) => setTimeout(resolve, ms)
	);
}
