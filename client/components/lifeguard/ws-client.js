import { basicUrl } from "../../src/config.js";

/** @type {WebSocket} */
let ws;
const url = basicUrl.split("//")[1].replace("/", "");

function start_ws_client(cb) {
  if (!ws) {
    ws = new WebSocket(`ws://${url}/client-ws`);
    ws.onopen = () => ws.send("start");
    ws.onclose = () => (ws = null);
  }

  ws.onmessage = (m) => {
    const sensor_list = JSON.parse(m.data);
    cb(sensor_list);
  };
}

export { start_ws_client };
