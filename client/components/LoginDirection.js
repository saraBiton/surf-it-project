import React, { useState } from "react";
import {
  Image,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Director from "./Director/Director";
import { addItem, addUser, CheckPassword } from "../src/Service";
import { basicUrl } from "../src/config";
import MarkerMap from "./lifeguard/mapOfLocation";
import axios from "axios";
import AlertVolunteer from "./volunteer/AlertVolunteer";
import AlertParent from "./Parent/AlertParent";
import { AllUsers } from "./Users/allUsers";
const LoginScreen = ({ navigation }) => {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [password, setpassword] = useState("");
  const [user, setuser] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);

  // navigation.navigate("Director");

  const handleLogin = async () => {
    const { data: user } = await addItem(basicUrl + "login/", {
      firstName,
      lastName,
      password,
    });
    console.log("data", user);
    setuser(user);
    console.log("role: ", user.role);

    const roles = {
      volunteer: "AlertVolunteer",
      lifeguard: "lifeguardMap",
      parent: "AlertParent",
      Director: "AllUsers",
    };
    if (user.role === "user")
      console.log("Entering the application is not authorized.");
    else {
      navigation.navigate(roles[user.role]);
    }
  };
  const handleLoginTitleClick = () => {
    setIsFormVisible(true);
  };
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
        {isFormVisible ? (
          <>
            <TextInput
              style={styles.buttonInput}
              placeholder="שם פרטי"
              value={firstName}
              onChangeText={setfirstName}
            />
            <TextInput
              style={styles.buttonInput}
              placeholder="שם משפחה"
              value={lastName}
              onChangeText={setlastName}
            />
            <TextInput
              style={styles.buttonInput}
              placeholder="סיסמה"
              secureTextEntry={true}
              value={password}
              onChangeText={setpassword}
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity
            style={styles.loginTitle}
            onPress={handleLoginTitleClick}
          >
            <Text style={styles.title}> login </Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

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
    padding: 20,
  },
  buttonContainer: {
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
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

export default LoginScreen;
