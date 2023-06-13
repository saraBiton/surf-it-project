import { Schema, model } from 'mongoose';
import { User } from './userModel.js';

const DefibrillatorSchema = new Schema(
<<<<<<< HEAD
	{
		isActive: Boolean,
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			validate: {
				validator: async function (value) {
					if (this.isActive) {
						const user = await User.findOne({ _id: value, role: 'volunteer' });
						return user !== null;
					} else {
						return true; // If isActive is false, validation passes
					}
				},
				message: 'User does not exist or is not a volunteer'
			},

			required () {
				return this.isActive; // userId is required if isActive is true
			}
		},
		position: { lat: Number, lng: Number }
	},
	{
		methods: {
			dataToShow () {
				// מידע להצגה ברשימת כל הדפיברילטורים
				return {
					fullName: `${this.firstName} ${this.lastName}`,
					city: this.city,
					role: this.role
				};
			}
		},
		versionKey: false
	}
=======
  {
    isActive: Boolean,
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      validate: {
        validator: async function (value) {
          if (this.isActive) {
            const user = await User.findOne({ _id: value, role: "volunteer" });
            return user !== null;
          } else {
            return true; // If isActive is false, validation passes
          }
        },
        message: "User does not exist or is not a volunteer",
      },
      required: function () {
        return this.isActive; // userId is required if isActive is true
      },
    },
    position: { lat: Number, lng: Number },
  },
  {
    methods: {
      dataToShow() {
        // מידע להצגה ברשימת כל הדפיברילטורים
        return {
          isActive: this.isActive,
          userId: this.userId,
          position: this.position,
        };
      },
    },
    versionKey: false,
  }
>>>>>>> e96da85d320aa4a08350e21bcef5ac21765d4987
);
console.log(DefibrillatorSchema);

const Defibrillator = model('Defibrillator', DefibrillatorSchema);

export { Defibrillator };
