import React, { useState, useEffect } from "react";
import {
	View,
	TextInput,
	Text,
	StyleSheet,
	Button,
	ScrollView,
} from "react-native";

import { basicUrl } from "../../src/config";
import { updateItem, getById } from '../../src/Service';

import { Picker } from "@react-native-picker/picker";

const usersURL = basicUrl + 'users';

function EditUser({ navigation, route }) {

	const user__id = route.params.user__id;

	const roles = ["user", "volunteer", "parent", "lifeguard"];

	const [user, setUser] = useState({
		_id: '',
		id: '',
		firstName: '',
		lastName: '',
		password: '',
		role: '',
		phones: [''],
		city: ''
	});

	useEffect( () => {

			getById(usersURL, user__id)
			.then((r)=>{
				const data = r.data;
				delete data.volunteer;
				delete data.sensors;

				setUser(data);
			})
	}, []);

	const submitHandle = async () => {

		await updateItem(usersURL, user._id, user);
		navigation.navigate('AllUsers', { user__id: user._id })
	};

	return (
		<ScrollView>
			<View style={styles.container}>
				<Text style={styles.title}> Edit user </Text>
				<View style={styles.inputContainer}>
					<TextInput
						style={styles.input}
						placeholder="ID"
						onChangeText={(text) => setUser({ ...user, id: text })}
						value={user.id}
						maxLength={9} />
				</View>

				<View style={styles.inputContainer}>
					<TextInput
						style={styles.input}
						placeholder="First Name"
						onChangeText={(text) => setUser({ ...user, firstName: text })}
						value={user.firstName}
						maxLength={20} />
				</View>

				<View style={styles.inputContainer}>
					<TextInput
						style={styles.input}
						placeholder="Last Name"
						onChangeText={(text) => setUser({ ...user, firstName: text })}
						value={user.lastName}
						maxLength={20} />
				</View>

				<View style={styles.inputContainer}>
					<TextInput
						style={styles.input}
						placeholder="Password"
						onChangeText={(text) => setUser({ ...user, password: text })}
						value={user.password}
						maxLength={4} />
				</View>

				<View style={styles.inputContainer}>
					<Picker
						style={styles.input}
						selectedValue={user.role}
						onValueChange={(text) => setUser({ ...user, role: text })}
					>
						<Picker.Item label="Select role" value="" />
						{roles.map((item, index) => {
							if (roles[2])
								return <Picker.Item label={item} value={item} key={index} />;
						})}
					</Picker>
				</View>

				<View style={styles.inputContainer}>
					<TextInput
						style={styles.input}
						placeholder="Phone"
						onChangeText={(text) => setUser({ ...user, phones: [text] })}
						value={user.phones[0]}
						maxLength={10}
					/>
				</View>

				<View style={styles.inputContainer}>
					<TextInput
						style={styles.input}
						placeholder="City"
						onChangeText={(text) => setUser({ ...user, city: text })}
						value={user.city}
						maxLength={20}
					/>
				</View>

				<View style={styles.buttonContainer}>
					<Button title="Save" onPress={() => { submitHandle() }} />
				</View>

			</View>
		</ScrollView>
	);
}

export {
	EditUser
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