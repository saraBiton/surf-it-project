import { useState, useEffect, Fragment } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
// import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-reanimated-table';
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell,
} from "react-native-table-component";
import { getAll } from "../../src/Service";
import { wrap } from "lodash";
import AddUser from "../Director/User";


const Table2 = ({ navigation }) => {
  const head = ["Full name", "City", "Role", "", ""];

  const [tableData, setTableData] = useState({
    keys: head,
    values: [[], [], []],
  });

  useEffect(() => {
    makeTable();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, { marginBottom: 20 }]}
        onPress={() => navigation.navigate("Adduser")}
      >
        <Text style={styles.buttonText}>Add user</Text>
      </TouchableOpacity>
      <Table borderStyle={{ borderWidth: 2 }}>
        <Row data={tableData.keys} textStyle={styles.headStyle} />
        <Rows data={tableData.values} textStyle={styles.textStyle} />
      </Table>
    </View>
  );

  async function makeTable() {
    function EditDeleteButtons() {
      return (
        <Fragment>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>edit</Text>
          </TouchableOpacity>

					<TouchableOpacity style={styles.button}>
						<Text style={styles.buttonText}>delete</Text>
					</TouchableOpacity>

				</Fragment>
			);
		};function ShowSensorsButtons () {
			return (
				<TouchableOpacity style={styles.button}>
					<Text style={styles.buttonText}>show sensors</Text>
				</TouchableOpacity>
			);
		};

    const r = await getAll().then((res) => res.data);

    const keys = head;

    const values = r.reduce((array, value) => {
      const rowValues = Object.values(value);
      rowValues.push(<EditDeleteButtons />);
      rowValues.push(<ShowSensorsButtons />);
      array.push(rowValues);
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
export { Table2 };
