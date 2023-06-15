import React, { useState, useEffect } from "react";
import {
    View,
    TextInput,
    Text,
    StyleSheet,
    Button,
    ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Alert } from "@mui/material";

import { basicUrl } from "../../src/config";
const { addItem } = require("../../src/Service");
import { getAllItems } from "../../src/Service";
import { json } from "react-router-dom";


const theURL = basicUrl + 'defibrilators';

const AddDefibrilator = ({ navigation }) => {

    const [defibrilator, setDefibrilator] = useState({
        id: undefined,
        isActive: undefined,
        userId: '',
        position: {}
    });

    const [errorMessage, setErrorMessage] = useState('');

    const [usersList, setUsersList] = useState([{}])

    const submitHandle = async () => {
        addItem(theURL, defibrilator).then((r) => {

            navigation.navigate('AllDefibrilators', {})
        }).catch((error) => {

            if (error?.response?.data?.message) {
                setErrorMessage(error.response.data.message);
            } else if (error.message) {
                setErrorMessage(error.message);
            }
        });
    };

    useEffect(() => {
        getAllItems(basicUrl + 'users')
            .then(res => res.data)
            .then(users => setUsersList(users));
    }, [])

    return (
        <ScrollView>
            <View style={styles.container}>
                {
                    errorMessage ? (

                        <Alert severity="error">{errorMessage}</Alert>

                    ) : null}
                <Text style={styles.subtitle}>Add defibrilator</Text>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="ID"
                        onChangeText={(text) => setDefibrilator({ ...defibrilator, id: text })}
                        value={defibrilator.id}
                        maxLength={9}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Picker
                        style={styles.input}
                        selectedValue={defibrilator.isActive}
                        onValueChange={(v) => setDefibrilator({ ...defibrilator, isActive: v })}
                    >
                        <Picker.Item label="Is active" value='' />
                        <Picker.Item label="True" value='true' />
                        <Picker.Item label="False" value='false' />
                    </Picker>
                </View>

                <Text style={styles.subtitle}>Position</Text>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Lat"
                        onChangeText={(text) => setDefibrilator({
                            ...defibrilator,
                            position: { ...defibrilator.position, lat: text }
                        })}
                        value={defibrilator.position.lat}
                        maxLength={9}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Lng"
                        onChangeText={(text) => setDefibrilator({
                            ...defibrilator,
                            position: { ...defibrilator.position, lng: text }
                        })}
                        value={defibrilator.position.lng}
                        maxLength={9}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Picker
                        style={styles.input}
                        selectedValue={defibrilator.userId}
                        onValueChange={(v) => setDefibrilator({ ...defibrilator, userId: v })}
                    >
                        <Picker.Item label="User" />
                        {usersList.map(user =>
                            <Picker.Item label={user.fullName} value={user._id} />
                        )}
                    </Picker>
                </View>

                <View style={styles.buttonContainer}>
                    <Button title="Save" onPress={() => { submitHandle() }} />
                </View>

            </View>
        </ScrollView>
    );

};

export {
    AddDefibrilator
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
    },
    buttonText: {
        color: "white",
        fontSize: 20,
    },
    buttonContainer: {
        marginTop: 30,
        alignItems: "center",
        justifyContent: "center",
    },
    button: {
        margin: 10,
        padding: 20,
        backgroundColor: "gray",
        borderRadius: 10,
    },
    inputContainer: {
        marginVertical: 10,
    },
    input: {
        backgroundColor: "#F7F7F7",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        width: "100%",
        marginBottom: 10,
        fontSize: 18,
        color: "#333",
    },

    label: {
        fontWeight: "bold",
        fontSize: 5,
        marginVertical: 10,
    },
    text: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 20,
        borderRadius: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 50,
        marginBottom: 30,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        position: "relative",
        top: -7,
        width: "100%",
        marginTop: 0,
    },
});