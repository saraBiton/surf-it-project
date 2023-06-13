import { Defibrillator } from "../Models/defibrillatorModel.js";

// const getAllDefibrillators = async () => {
// 	// מביא רשימת משתמשים כולל סנסורים
// 	const defibrillators = await Defibrillator.find();
// 	return defibrillators;
// };
async function getAllDefibrillators() {
  try {
    const defibrillators = await Defibrillator.find();
    return defibrillators;
  } catch (error) {
    throw new Error(`Error while retrieving defibrillators: ${error.message}`);
  }
}
// const getAllDefibrillators = async () => {
//   try {
//     const defibrillators = await Defibrillator.find();
//     return defibrillators;
//   } catch (error) {
//     throw new Error(`Error while retrieving defibrillators: ${error.message}`);
//   }
// };

// const getAllDefibrillators = async () => {
//   try {
//     const defibrillators = await Defibrillator.find();
//     return defibrillators;
//   } catch (err) {
//     return err;
//   }
// };

const getDefibrilatorById = async (id) => {
  return await Defibrillator.findById(id).populate("sensors");
};

const addDefibrilator = async (obj) => {
  const defibrillator = new Defibrillator(obj);
  await defibrillator.save();
  return defibrillator;
};

const updateDefibrilator = async (id, obj) => {
  console.log("obj", obj);

  const defibrillator = await Defibrillator.findByIdAndUpdate(id, obj).populate(
    "Defibrilator"
  );
  return defibrillator;
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
  updateDefibrilator,
};
