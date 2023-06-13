import { Defibrillator } from '../Models/defibrillatorModel.js';

const getAllDefibrillators = async () => {
	// מביא רשימת דפיברילטורים
	const defibrillator = await Defibrillator.find();
	return defibrillator.map(defibrilator => defibrilator.dataToShow());
};
const getDefibrilatorById = async (id) => {
	return await Defibrillator.findById(id).populate('userId');
};

const addDefibrilator = async (obj) => {
	const defibrillator = new Defibrillator(obj);
	await defibrillator.save();
	return defibrillator;
};

const updateDefibrilator = async (id, obj) => {
	console.log('obj', obj);

	await Defibrillator.findByIdAndUpdate(id, obj).populate('userId');
	return await getDefibrilatorById(id);
};

const deleteDefibrilator = async (id) => {
	const defibrillator = await Defibrillator.findByIdAndDelete(id);
	return defibrillator;
};

export default {
	getAllDefibrillators,
	addDefibrilator,
	deleteDefibrilator,
	getDefibrilatorById,
	updateDefibrilator
};
