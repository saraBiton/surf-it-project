import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Text, TouchableOpacity } from 'react-native';
// import { AddSensor, DeleteSensor } from './';
import { addItem } from '../../src/Service';
import { DeleteSensor } from '../../src/Service';
import { basicUrl } from '../../src/config';

function SensorActions({ navigation }) {
    const [activeButton, setActiveButton] = useState(null);

    return (
        <View style={styles.container}>
            <Text style={styles.title}> Welcome to SURF-IT </Text>
            <Text style={styles.subtitle}>Rental of drowning prevention equipment</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button}
                    onPress={() => navigation.navigate('Adding_sensor')}>
                    <Text style={styles.buttonText} >add sensor</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}
                    onPress={() => navigation.navigate('Deleting_sensor')}>
                    <Text style={styles.buttonText} >
                        delete sensor
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export function AddSensor2({ navigation }) {
    const [activeButton, setActiveButton] = useState(null);
    const [IdSensor, setIdSensor] = useState('');
    const handleLogin = () => {
        addItem(`basicUrl`+`/sensors`,IdSensor);
        console.log('IdSensor:', IdSensor);

    };
    return (
        <View style={styles.container}>
            <Text style={styles.subtitle}>Enter sensor id</Text>
            <TextInput
                style={styles.buttonInput}
                placeholder="id sensor"
                value={IdSensor}
                onChangeText={setIdSensor}
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>הוסף</Text>
            </TouchableOpacity>
        </View>
    );
}

export function DeleteSensor2({ navigation }) {

    const [activeButton, setActiveButton] = useState(null);
    const [IdSensor, setIdSensor] = useState('');
    const handleLogin = () => {
        DeleteSensor(IdSensor);
        console.log('IdSensor:', IdSensor);

        // הפניה לדף הבא 
        // navigation.navigate('Director');
    };
    return (
        <View style={styles.container}>
            <Text style={styles.subtitle}>Enter sensor id</Text>
            <TextInput
                style={styles.buttonInput}
                placeholder="id sensor"
                value={IdSensor}
                onChangeText={setIdSensor}
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>הסר</Text>
            </TouchableOpacity>
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 30,
    },
    button: {
        margin: 10,
        padding: 20,
        backgroundColor: 'gray',
        borderRadius: 10,
    },
    buttonInput: {
        margin: 10,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        borderColor: 'gray',
        borderWidth: 1,
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
    },
    text: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
        borderRadius: 5
    },
})
export default SensorActions;
