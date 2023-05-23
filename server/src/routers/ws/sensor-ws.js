/** @type {import("express-ws").Router} */
import { Router } from "express";

import { sensor_list } from "../../sensor_list.js";

const sensor_ws_router = Router();

sensor_ws_router.ws('/sensor-ws', (ws)=>{
    ws.on('message', (mag) =>{
        ws.onerror = (error) =>{
            console.error('WebSocket error:', error);
        };
        const sensor_data = JSON.parse(msg);

        sensor_list[sensor_data.id] = sensor_data;
    });
});

export{sensor_ws_router};