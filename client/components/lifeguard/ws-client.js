const ws = new WebSocket('ws://localhost:8000/client-ws');
ws.onopen = () => ws.send('start');

function start_ws_client(cb) {
    ws.onmessage = (m) => {
        const sensor_list = JSON.parse(m.data);
        cb(sensor_list);
    };
}

export { start_ws_client };