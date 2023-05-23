import cors from 'cors';
import express from 'express';
import expressWs from 'express-ws';

const { app } = expressWs(express());

app.use(cors());
app.use(express.json());

export { app };
