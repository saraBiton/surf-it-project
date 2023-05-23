import express from 'express';
import expressWs from 'express-ws';

const express_app = express();
const { app } = expressWs(express_app);
app.use(express.json());

export {
	app
};
