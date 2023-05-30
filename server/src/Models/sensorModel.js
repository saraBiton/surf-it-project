import { Schema, Types, model } from 'mongoose';

import { SetRandomCoordinates } from '../RandomCoordinates.js';

const Sensor = model('Sensor', new Schema({
	// sensorID: {type: String, required: true},
	userId: { type: Types.ObjectId, ref: 'User' },
	lifeJacketNum: Number,
	isActive: Boolean,
	isSimulateMoves: Boolean,
	position: { lat: Number, lng: Number },
	status: String,
	inflatedLifeJacket: Boolean
}, {
	versionKey: false,
	methods: {
		randomCoordinatesLoop () {
			const ms = 200;

			const handle = setInterval(() => {
				if (this.$isDeleted()) clearInterval(handle);

				this.position = SetRandomCoordinates(this.position);
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
}),
'sensors');

export { Sensor };
