import { Schema, model, Types } from 'mongoose';

const userSchema = new Schema({

	id: { type: String, required: true },
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	password: { type: String, required: false },
	city: { type: String, required: false },
	role: { type: String, enum: ['user', 'volunteer', 'parent', 'director', 'lifeguard'], required: true },
	linkToUser: { type: Types.ObjectId, ref: 'User' },
	phones: [String],
	volunteer: { lat: Number, lng: Number, isActive: Boolean, alerts: [String] },
	sensors: [{ type: Schema.Types.ObjectId, ref: 'Sensor' }]
}, {
	methods: {
		dataToShow () {
			// מידע להצגה ברשימת כל היוזרים
			return {
				fullName: `${this.firstName} ${this.lastName}`,
				city: this.city,
				role: this.role
			};
		}
	},
	versionKey: false
});

userSchema.index({ firstName: 1, lastName: 1 }, { unique: true });

const User = model('User', userSchema);

export { User };