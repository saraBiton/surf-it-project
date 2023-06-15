import { Schema, model } from 'mongoose';

import { setRandomCoordinates, setRandomStatus, sleep } from '../RandomCoordinates.js';
// import { getActiveVolunteersDistances } from '../controllers/CalculationDistance.js';

const Sensor = model('Sensor', new Schema({
	// sensorID: {type: String, required: true},
	userId: { type: Schema.Types.ObjectId, ref: 'User' },
	lifeJacketNum: Number,
	isActive: Boolean,
	isSimulateMoves: Boolean,
	position: { lat: Number, lng: Number },
	status: {
		type: String,
		enum: ['OK', 'Attention', 'SOS'],
		default: 'OK'
	},
	inflatedLifeJacket: {
		type: Boolean,
		default: false
	}
}, {
	versionKey: false,
	methods: {
		randomCoordinatesLoop () {
			// פונ' סימולציית תזוזה
			const sec = 0.3;

			const _this = this;

			intervalRandomLoop();

			/* let handle = setInterval( */
			async function intervalRandomLoop () {
				let loopIsRunning = true;

				while (loopIsRunning) {
					if (
						_this.$isDeleted() ||
						!_this.isActive ||
						!_this.isSimulateMoves
					) {
						loopIsRunning = false;
					} else {
						_this.position = setRandomCoordinates(_this.position);
						_this.status = setRandomStatus(_this.status);

						await _this.save().catch(err => { // התעלמות משגיאה אם החיישן נמחק
							if (err.name === 'DocumentNotFoundError') {
								loopIsRunning = false;
							} else {
								throw err;
							}
						});

						if (_this.status !== 'OK') {
							switch (_this.status) {
								case 'Attention':
									_this.onAttention();
									break;
								case 'SOS':
									_this.onSos();
									break;

								default:
									break;
							}
							await sleep(5);
						}

						await sleep(sec);
					}
				}
			}
		},

		onSos () {
			this.status = 'SOS';
			this.inflatedLifeJacketNow();
<<<<<<< HEAD
			getActiveVolunteersDistances(this.position).catch(
				error => console.error(error)
			);
=======
			// getActiveVolunteersDistances(this.position);
>>>>>>> 15a8ad7ab30569f453ae2fb955220cc7fcc89f29
		},

		onAttention () {
			this.status = 'Attention';
		},

		inflatedLifeJacketNow () {
			this.inflatedLifeJacket = true;
			this.save().catch(err => { // התעלמות משגיאה אם החיישן נמחק
				if (err.name !== 'DocumentNotFoundError') {
					throw err;
				}
			});
		}
	}
}), 'sensors');

export { Sensor };
