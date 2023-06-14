import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import SensorActions from "./Sensor_management";
import TableData from "../table";
import SensorRentalManagement from "./Sensor_rental_management";
import { AllUsers } from "../Users/allUsers";
function Director({ navigation }) {
  const [activeButton, setActiveButton] = useState(null);

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Welcome to SURF-IT </Text>
      <Text style={styles.subtitle}>
        Rental of drowning prevention equipment
      </Text>
      <View style={styles.buttonContainer}>
        {
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Sensor_management")}
          >
            <Text style={styles.buttonText}>Sensor management</Text>
          </TouchableOpacity>

          /* <TouchableOpacity style={styles.button}
					onPress={() => navigation.navigate('Sensor_rental_management')}>
					<Text style={styles.buttonText} >
                    Sensor rental management
					</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.button}
					onPress={() => navigation.navigate('TableData')}>
					<Text style={styles.buttonText} >
                    TableData
					</Text>
				</TouchableOpacity> */
        }
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("AllUsers")}
        >
          <Text style={styles.buttonText}>User Management</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Sensor_rental_management")}
        >
          <Text style={styles.buttonText}>Sensor rental management</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
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
  buttonText: {
    color: "white",
    fontSize: 20,
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
    top: 0,
    width: "100%",
    marginTop: 10,
  },
});
export default Director;
