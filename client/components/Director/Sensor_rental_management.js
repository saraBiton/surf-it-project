import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
} from "react-native";

// ניהול השכרת חיישנים
function SensorRentalManagement({ navigation }) {
  const [activeButton, setActiveButton] = useState(null);

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Welcome to SURF-IT </Text>
      <Text style={styles.subtitle}>
        Rental of drowning prevention equipment
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Adding_tenant_sensor")}
        >
          <Text style={styles.buttonText}>add user</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("sensor_return")}
        >
          <Text style={styles.buttonText}>sensor return</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Showing_all_sensors")}
        >
          <Text style={styles.buttonText}>Showing all sensors</Text>
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
    padding: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 50,
    marginBottom: 30,
  },
  button: {
    margin: 10,
    padding: 20,
    backgroundColor: "gray",
    borderRadius: 10,
  },
  buttonInput: {
    margin: 10,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    borderColor: "gray",
    borderWidth: 1,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    borderRadius: 5,
  },
});
export default SensorRentalManagement;
