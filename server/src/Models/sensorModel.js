import { Schema, model } from 'mongoose';

import { SetRandomCoordinates } from '../RandomCoordinates.js';

const Sensor = model('Sensor', new Schema({
	// sensorID: {type: String, required: true},
	userId: { type: Schema.Types.ObjectId, ref: 'User' },
	lifeJacketNum: Number,
	isActive: Boolean,
	isSimulateMoves: Boolean,
	position: { lat: Number, lng: Number },
	status: {
		type: String,
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
			const ms = 700;

			const _this = this;

			const handle = setInterval(async function intervalRandomLoop () {
				if (
					_this.$isDeleted() ||
					!_this.isActive ||
					!_this.isSimulateMoves
				) {
					clearInterval(handle);
				} else {
					_this.position = SetRandomCoordinates(_this.position);

					await _this.save().catch(err => { // התעלמות משגיאה אם החיישן נמחק
						if (err.name !== 'DocumentNotFoundError') {
							throw err;
						}
					});
				}
			}, ms);
		},

		onSos () {
			this.status = 'SOS';
			this.inflatedLifeJacket();
		},

		onAttention () {
			this.status = 'Attention';
		},

		inflatedLifeJacketNow () {
			this.inflatedLifeJacket = true;
		}
	}
}), 'sensors');

export { Sensor };
