import React, { useState } from 'react';
import User from './Director/User';
import LoginScreen from './Director/LoginDirection';
import { Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import MarkerMap from './lifeguard/mapOfLocation';
import TableData from './table';
import { Login, SignUp } from './Login';

// import calculateDistance from '../try/trydis';
function HomeScreen ({ navigation }) {
	const [activeButton, setActiveButton] = useState(null);
	return (
		<View style={styles.container}>
			<Image source={require('../assets/faviconlast.png')} style={styles.icon} />
			{/* <Image source={require('../assets/image.jpg')} style={styles.icon} /> */}
			{/* <Image source={require('../assets/logo.png')}></Image> */}
			<Text style={styles.title}> Welcome to SURF-IT </Text>
			<Text style={styles.subtitle}>Rental of drowning prevention equipment</Text>
			<View style={styles.buttonContainer}>
				<TouchableOpacity style={styles.button}
					onPress={() => navigation.navigate('LoginDirection')}>
					<Text style={styles.buttonText} >Director</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.button}
					onPress={() => navigation.navigate('LoginDirection')}>
					<Text style={styles.buttonText} >volunteer</Text>
				</TouchableOpacity>
				{/* <TouchableOpacity style={styles.button}
					onPress={() => navigation.navigate('tableUser')}>
					<Text style={styles.buttonText} >tableUser</Text>
				</TouchableOpacity> */}
				{/* <TouchableOpacity style={styles.button}
					onPress={() => navigation.navigate('login')}>
					<Text style={styles.buttonText} >SignIn</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.button}
					onPress={() => navigation.navigate('SignUp')}>
					<Text style={styles.buttonText} >SignUp</Text>
				</TouchableOpacity> */}
				<TouchableOpacity style={styles.button}
					onPress={() => navigation.navigate('lifeguardMap')}>
					<Text style={styles.buttonText} >lifeguard</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.button}
					onPress={() => { navigation.navigate('Table2'); }} >
					<Text style={styles.buttonText}>test</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	icon: {
		width: 200,
		height: 200,
		alignSelf: 'center'
	},
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#fff'
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
	buttonText: {
		color: 'white',
		fontSize: 20
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
		top: 0,
		width: '100%',
		marginTop: 10
	}
});
export default HomeScreen;
