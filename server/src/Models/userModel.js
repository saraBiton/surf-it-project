import { Schema, model } from 'mongoose';

const userSchema = new Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	password: { type: String, required: false },
	city: { type: String, required: false },
	role: { type: String, enum: ['user', 'volunteer', 'parent', 'director', 'lifeguard'], required: true },
	linkToUser: {},
	phones: [String],
	volunteer: { lat: Number, lng: Number, isActive: Boolean }
},
{
	versionKey: false
});

userSchema.index({ firstName: 1, lastName: 1 }, { unique: true });

const User = model('user', userSchema, 'users');

export { User };
