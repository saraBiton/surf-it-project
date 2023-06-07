import { useState } from 'react';
import { sensor } from '../../src/Service';
function SensorView({ route }) {

    const [sensorData, setSensorData] = useState('');

    const id = route.params.sensorId;

    sensor.getById(id)
        .then(res => res.data)
        .then(sensor => setSensorData(JSON.stringify(sensor, null, "\t")))



    return (
        <code>
            {sensorData}
        </code>
    );
}

export {
    SensorView
};