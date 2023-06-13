// export default AddUser;
import React, { useState } from "react";
import { useRoute } from "@react-navigation/native";

import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Button,
  ScrollView,
} from "react-native";
import { basicUrl } from "../../src/config";
import { Picker } from "@react-native-picker/picker";

const { addItem } = require("../../src/Service");

const AddParent = ({ navigation }) => {
  const route = useRoute();
  const { idUser } = route.params;
  const [id, setId] = useState(idUser);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const role="parent";
  const [phones, setPhones] = useState("");
  const [city, setCity] = useState("");

  const handleSignup = () => {
    const userData = {
      id,
      firstName,
      lastName,
      password,
      role,
      phones,
      city,
    };
    console.log(userData);
    addItem(basicUrl + "users/new", userData)
      .then((message) => {
        console.log(message);
        // Display success message to the user
        alert("Details successfully registered.");
      })
      .catch((error) => {
        console.error(error);
        // Display error message to the user
        alert("Error registering details. Please try again.");
      });
  };
 
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}> Welcome to SURF-IT </Text>
        <Text style={styles.subtitle}>Add parent to user </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="id"
            onChangeText={(text) => setId(text)}
            value={id}
            maxLength={9}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="FirstName"
            onChangeText={(text) => setFirstName(text)}
            value={firstName}
            maxLength={20}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="LastName"
            onChangeText={(text) => setLastName(text)}
            value={lastName}
            maxLength={20}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="password"
            onChangeText={(text) => setPassword(text)}
            value={password}
            maxLength={4}
          />
        </View>
        {/* <View style={styles.inputContainer}>
          <Picker
            style={styles.input}
            selectedValue={"Parent"}
          >
            <Picker.Item label="Select role" value="" />
            {roles.map((item, index) => {
            ;
            })}
          </Picker>
        </View> */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Phone"
            onChangeText={(text) => setPhones(text)}
            value={phones}
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
        <View style={styles.buttonContainer}>
          <Button title="Add parent" onPress={handleSignup} />
        </View>
      </View>
    </ScrollView>
  );
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

export default AddParent;
