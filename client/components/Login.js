import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import { sendData } from '../src/Service';
import { basicUrl } from '../src/config';
import {  StyleSheet } from 'react-native';

const Login = (navigate) => {
	const [fullName, setFullName] = useState(null);
	const [password, setPassword] = useState(null);

	const handleSubmit = (event) => {
		event.preventDefault();

		// Here you can add your authe?ntication logic
		console.log(`fullName: ${fullName}, Password: ${password}`);
		const user = sendData(basicUrl + 'login', { fullName, password });
		console.log(user);
	};
	return (
		<View style={styles.container}>
			<Text style={styles.title}>  login </Text>
			<TextInput
				style={styles.buttonInput}
				placeholder="שם מלא"
				value={fullName}
				onChangeText={setFullName}
			/>
			<TextInput
				style={styles.buttonInput}
				placeholder="סיסמה"
				secureTextEntry={true}
				value={password}
				onChangeText={setPassword}
			/>
			<Button title="Login" style={styles.buttonText} onPress={handleSubmit} />
		</View>
	);
};
// const SignUp = (navigate) => {
// 	const [fullName, setFullName] = useState(null);
// 	const [password, setPassword] = useState(null);

// 	const handleSubmit = (event) => {
// 		event.preventDefault();
// 		// Here you can add your sign up logic
// 		console.log(`Email: ${email}, Password: ${password}`);
// 	};

// 	return (
// 		<form onSubmit={handleSubmit}>
// 			<label>
//                 Email:
// 				<input type="email" value={email} onChange={handleEmailChange} />
// 			</label>
// 			<label>
//                 Password:
// 				<input type="password" value={password} onChange={handlePasswordChange} />
// 			</label>
// 			<button type="submit">Sign up</button>
	

// 		</form>
// 	);
// };
const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 20
	},
	input: {
		width: '100%',
		height: 40,
		borderColor: 'gray',
		borderWidth: 1,
		marginBottom: 10,
		paddingLeft: 10
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		textAlign: 'center',
		marginTop: 50,
		marginBottom: 30
	},
	button: {
		margin: 10,
		padding: 20,
		backgroundColor: 'gray',
		borderRadius: 10
	},
	buttonInput: {
		margin: 10,
		padding: 20,
		backgroundColor: 'white',
		borderRadius: 10,
		borderColor: 'gray',
		borderWidth: 1
	},
	buttonText: {
		color: 'white',
		fontSize: 20
	},
	text: {
		fontSize: 30,
		fontWeight: 'bold',
		marginBottom: 20,
		borderRadius: 5
	}
});

// export default LoginScreen;
// , SignUp
export { Login };
