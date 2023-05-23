import WebSocket from 'ws';

class Sensor {
	constructor (id = '', position) {
		this.id = id;

		// מיקום החיישן
		this.position = position;

		// מצב החיישן
		this.status = 'OK'; // הכל בסדר-ירוקOK / -כתוםAttention-תשומת לב /  SOS-אדום, הזעקת כוחות הצלה

		// האם לנפח את האפודה?
		this.inflated_life_jacket = false;
	}

	inflate_life_jacket () {
		this.inflated_life_jacket = true;
	}

	on_sos () {
		this.status = 'SOS';
		this.inflate_life_jacket();
	}

	on_Attention () {
		this.status = 'Attention';
	}

	start () {
		this.ws_client = new WebSocket('ws://127.0.0.1:8000/sensor-ws');

		this.ws_client.on('open', async () => {
			console.log(`sensor ${this.id} connecting`);

			while (true) {
				this.position = set_random_coordinates(this.position);

				const random_status = set_random_status();

				switch (random_status) {
					case 'Attention':
						this.on_Attention();
						break;
					case 'SOS':
						this.on_sos();
						break;
				}

				const data_to_send = {
					id: this.id,
					position: this.position,
					status: this.status
				};

				this.ws_client.send(JSON.stringify(data_to_send));

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

/**
 * פונקציה זו מייצרת תזוזות קטנות במיקום,
 * ע"מ לייצר אשלייה של תנועה
 */
function set_random_coordinates (position) {
	let random_num = get_random_in_range(0.000001, 0.000009);

	// הסתברות של 0.5 למספר שלילי
	if (Math.random() > 0.5) {
		random_num = make_number_negative(random_num);
	}

	// הסתברות של 0.5 כדי לקבוע האם לשנות את האורך או את הרוחב
	if (Math.random() > 0.5) {
		position.lat += random_num;
	} else {
		position.lng += random_num;
	}

	return position;

	// הופך מספר לשלילי
	function make_number_negative (num) {
		return num - (num * 2);
	}
}

function set_random_status () {
	let status = 'OK';

	if (Math.random() <= 0.02) {
		status = 'Attention';

		if (Math.random() <= 0.4) {
			status = 'SOS';
		}
	}

	return status;
}

// מייצר מספר אקראי בטווח מסויים
function get_random_in_range (min, max, round_num = 5) {
	return Number((Math.random() * (max - min) + min).toFixed(round_num));
}

(function main () {
	console.log('sensor start...');
	const sensor1 = new Sensor('8t8768v7', {
		lat: 31.791299,
		lng: 34.626264
	});
	sensor1.start();
	const sensor2 = new Sensor('b87t876h', {
		lat: 31.790960,
		lng: 34.626059
	});
	sensor2.start();
})();
