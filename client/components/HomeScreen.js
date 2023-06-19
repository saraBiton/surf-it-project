import React, { useState } from "react";
import LoginScreen from "./LoginDirection";
import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";

function HomeScreen({ navigation }) {
  const [activeButton, setActiveButton] = useState(null);
  return (
    <ScrollView>
      <View style={styles.container}>
        <Image
          source={require("../assets/faviconlast.png")}
          style={styles.icon}
        />
        <Text style={styles.title}> Welcome to SURF-IT </Text>
        <Text style={styles.subtitle}>
          Rental of drowning prevention equipment
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("LoginScreen")}
          >
            <Text style={styles.buttonText}>login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("AddUser")}
          >
            <Text style={styles.buttonText}>user</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("LoginDirection")}
          >
            <Text style={styles.buttonText}>volunteer</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("AlertParent")}
          >
            <Text style={styles.buttonText}>alert</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("lifeguardMap")}
          >
            <Text style={styles.buttonText}>lifeguard</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("x")}
          >
            <Text style={styles.buttonText}>x</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate("AllUsers");
            }}
          >
            <Text style={styles.buttonText}>All users list</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate("AllDefibrilators");
            }}
          >
            <Text style={styles.buttonText}> Defibrilators table </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 200,
    height: 200,
    alignSelf: "center",
  },
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
    top: 0,
    width: "100%",
    marginTop: 10,
  },
});
export default HomeScreen;
