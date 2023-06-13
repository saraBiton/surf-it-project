import { Router } from 'express';
import defibrilatorController from '../controllers/defibrilatorController.js';

const defibrilator_router = Router();

defibrilator_router.route('/').get(async (req, res) => {
	const result = await defibrilatorController.getAllDefibrillators();
	res.json(result);
});

defibrilator_router.route('/new').post(async (req, res) => {
	const obj = req.body;
	const result = await defibrilatorController.addDefibrilator(obj);
	console.log(result);
	res.json(result);
});

defibrilator_router.route('/:id').get(async (req, res) => {
	const result = await defibrilatorController.getDefibrilatorById(req.params.id);
	res.json(result);
});

defibrilator_router.route('/:id/edit').put(async (req, res) => {
	const obj = req.body;
	const result = await defibrilatorController.updateDefibrilator(req.params.id, obj);
	res.json(result);
});

defibrilator_router.route('/:id/delete').delete((req, res) => {
	const result = defibrilatorController.deleteDefibrilator(req.params.id);
	res.json(result);
});

export { defibrilator_router };
