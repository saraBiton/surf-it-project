/**
 * הפעלת אפליקציית אקספרס שתומכת גם בווב סוקט
 */

import cors from 'cors';
import express from 'express';
import expressWs from 'express-ws';
import 'express-async-errors'; // משמש לתפוס שגיאות בתוך אקספרס

const { app } = expressWs(express());

app.use(cors());
app.use(express.json());

export { app };
