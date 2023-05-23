import { Schema, Types, model } from 'mongoose';

const sensorSchema = Schema({
	// sensorID: {type: String, required: true},
	userId: { type: Types.ObjectId, ref: 'User' },
	lifeJacketNum: Number,
	isActive: Boolean
}, {
	versionKey: false
});

const Sensor = model('sensor', sensorSchema, 'sensors');

export { Sensor };
