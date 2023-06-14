import { useState, useEffect, Fragment } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import {
	Table,
	TableWrapper,
	Row,
	Rows,
	Col,
	Cols,
	Cell,
} from "react-native-table-component";
import { getAllItems } from "../../src/Service";
import { wrap } from "lodash";
import { deleteItem } from '../../src/Service';
import { basicUrl } from "../../src/config";

const theURL = basicUrl + 'defibrilators';

const AllDefibrilators = ({ navigation, route }) => {
	const head = ["ID", "Is active", "Username", ""];

	const [tableData, setTableData] = useState({
		keys: head,
		values: [[], [], []],
	});

	useEffect(() => {
		makeTable();
	}, [route]);

	const deleteRow = (id) => {
		deleteItem(theURL, id)
			.then(() => setTableData(tableData));
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={[styles.button, { marginBottom: 20 }]}

			>
				<Text style={styles.buttonText}>Add defibrilator</Text>
			</TouchableOpacity>
			<Table borderStyle={{ borderWidth: 2 }}>
				<Row data={tableData.keys} textStyle={styles.headStyle} />
				<Rows data={tableData.values} textStyle={styles.textStyle} />
			</Table>
		</View>
	);

	async function makeTable() {
		function EditDeleteButtons({ }) {
			return (
				<Fragment>
					<TouchableOpacity
						style={styles.button}

					>
						<Text style={styles.buttonText}>edit</Text>
					</TouchableOpacity>

					<TouchableOpacity style={styles.button} onPress={() => { deleteRow(user__id) }}>
						<Text style={styles.buttonText}>delete</Text>
					</TouchableOpacity>
				</Fragment>
			);
		}

		const r = await getAllItems(theURL).then((res) => res.data);

		const keys = head;

		const values = r.reduce((array, value) => {
			const row = [
				value.id,
				(value.isActive) ? 'True' : 'False',
				(value.userId) ?
					(`${value.userId.firstName} ${value.userId.lastName}`) : ''
			];

			row.push(<EditDeleteButtons />);
			array.push(row);
			return array;
		}, []);

		setTableData({
			keys,
			values,
		});
	}
};
const styles = StyleSheet.create({
	container: {
		flexWrap: wrap,
		marginTop: 30,
		marginHorizontal: "auto",
	},
	headStyle: {
		margin: 10,
		textAlign: "center",
		fontWeight: "bold",
	},
	textStyle: {
		margin: 10,
		textAlign: "center",
		fontWeight: "normal",
	},

	button: {
		margin: 5,
		padding: 5,
		backgroundColor: "gray",
		borderRadius: 10,
	},
	buttonText: {
		color: "white",
		margin: "auto",
	},
});

export { AllDefibrilators };