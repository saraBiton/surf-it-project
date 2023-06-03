import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Button } from 'react-native';
import { basicUrl } from '../../src/config';

const { addUser } = require('../../src/Service');
// const {  addUser } = require('./Service');

const User = () => {
	const [Firstname, setFirstName] = useState('');
	const [LastName, setLastName] = useState('');
	// const [password, setPassword] = useState('');
	const role = 'user';
	const [phones, setPhones] = useState('');
	const [city, setCity] = useState('');

	const [EmergencyPhoneNumber, setEmergencyPhoneNumber] = useState('');

	const handleSignup = () => {
		const userData = {
			Firstname,
			LastName,
			password,
			role,
			phones,
			city
		};
		console.log(userData);
		addUser(basicUrl + 'users/new', userData);
		// console.log(userData);
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}> Welcome to SURF-IT </Text>
			<Text style={styles.subtitle}>Rental of drowning prevention equipment</Text>
			<View style={styles.inputContainer}>
				<TextInput
					style={styles.input}
					placeholder="FirstName"
					onChangeText={(text) => setFirstName(text)}
					value={Firstname}
					maxLength={20}
				/>
			</View>
			<View style={styles.inputContainer}>
				<TextInput
					style={styles.input}
					placeholder="LastName"
					onChangeText={(text) => setLastName(text)}
					value={LastName}
					maxLength={20}
				/>
			</View>
			<View style={styles.inputContainer}>
				<TextInput
					style={styles.input}
					placeholder="Phone"
					onChangeText={(text) => setPhones(text)}
					value={phone}
					maxLength={10}
				/>
			</View>
			<View style={styles.inputContainer}>
				<TextInput
					style={styles.input}
					placeholder="city"
					onChangeText={(text) => setCity(text)}
					value={city}
					maxLength={20}
				/>
			</View>
			<Button title="continue" onPress={handleSignup} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#fff'
	},
	buttonText: {
		color: 'white',
		fontSize: 20
	},
	buttonContainer: {
		marginTop: 30,
		alignItems: 'center',
		justifyContent: 'center'
	},
	button: {
		margin: 10,
		padding: 20,
		backgroundColor: 'gray',
		borderRadius: 10
	},
	inputContainer: {
		marginVertical: 10
	},
	input: {
		backgroundColor: '#F7F7F7',
		borderRadius: 10,
		borderWidth: 1,
		borderColor: '#ccc',
		padding: 10,
		width: '100%',
		marginBottom: 10,
		fontSize: 18,
		color: '#333'
	},

	label: {
		fontWeight: 'bold',
		fontSize: 5,
		marginVertical: 10
	},
	text: {
		fontSize: 30,
		fontWeight: 'bold',
		marginBottom: 20,
		borderRadius: 5
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		textAlign: 'center',
		marginTop: 50,
		marginBottom: 30
	},
	subtitle: {
		fontSize: 20,
		fontWeight: 'bold',
		textAlign: 'center',
		position: 'relative',
		top: -7,
		width: '100%',
		marginTop: 0
	}
});

export default User;
