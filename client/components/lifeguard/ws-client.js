/**@type {WebSocket} */
let ws;

function start_ws_client(cb) {
    if (!ws) {
        ws = new WebSocket('ws://localhost:8000/client-ws');
        ws.onopen = () => ws.send('start');
    }

    ws.onmessage = (m) => {
        const sensor_list = JSON.parse(m.data);
        cb(sensor_list);
    };
}

export { start_ws_client };