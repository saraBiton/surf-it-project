// export default AddUser;
import React, { useState } from "react";
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
// import { Picker } from 'react-native';

const { addItem } = require("../../src/Service");
// const { addUser } = require('./Service');
const roles = ["user", "volunteer", "parent", "lifeguard"];

const AddUser = () => {
  const [id, setId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
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
    addItem(basicUrl + "users/new", userData);
    // console.log(userData);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}> Welcome to SURF-IT </Text>
        <Text style={styles.subtitle}>
          Rental of drowning prevention equipment
        </Text>
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
        <View style={styles.inputContainer}>
          <Picker
            style={styles.input}
            selectedValue={role}
            onValueChange={(itemValue) => setRole(itemValue)}
          >
            <Picker.Item label="Select role" value="" />
            {roles.map((item, index) => {
              return <Picker.Item label={item} value={item} key={index} />;
            })}
          </Picker>
        </View>
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
          <Button title="continue" onPress={handleSignup} />
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
    width: "100%",
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

export default AddUser;

// import React, { useState } from "react";
// import {
//   View,
//   TextInput,
//   Text,
//   StyleSheet,
//   Button,
//   Picker,
// } from "react-native";
// import { basicUrl } from "../../src/config";

// const { addItem } = require("../../src/Service");
// // const {  addUser } = require('./Service');
// const roles = ["user", "volunteer", "parent", "lifeguard"];

// const AddUser = () => {
//   const [id, setid] = useState("");
//   const [firstName, setfirstName] = useState("");
//   const [lastName, setlastName] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("");
//   const [phones, setPhones] = useState("");
//   const [city, setCity] = useState("");

//   const handleSignup = () => {
//     const userData = {
//       id,
//       firstName,
//       lastName,
//       password,
//       role,
//       phones,
//       city,
//     };
//     console.log(userData);
//     addItem(basicUrl + "users/new", userData);
//     // console.log(userData);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}> Welcome to SURF-IT </Text>
//       <Text style={styles.subtitle}>
//         Rental of drowning prevention equipment
//       </Text>
//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           placeholder="id"
//           onChangeText={(text) => setid(text)}
//           value={id}
//           maxLength={9}
//         />
//       </View>
//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           placeholder="FirstName"
//           onChangeText={(text) => setfirstName(text)}
//           value={firstName}
//           maxLength={20}
//         />
//       </View>
//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           placeholder="LastName"
//           onChangeText={(text) => setlastName(text)}
//           value={lastName}
//           maxLength={20}
//         />
//       </View>
//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           placeholder="password"
//           onChangeText={(text) => setPassword(text)}
//           value={password}
//           maxLength={4}
//         />
//       </View>
//       <View style={styles.inputContainer}>
//         <Picker
//           style={[styles.input,styles.inputContainer]}
//           selectedValue={role}
//           onValueChange={(itemValue) => setRole(itemValue)}
//         >
//           <Picker.Item label="Select role" value="" />
//           {roles.map((item, index) => {
//             return <Picker.Item label={item} value={item} key={index} />;
//           })}
//         </Picker>
//       </View>
//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           placeholder="Phone"
//           onChangeText={(text) => setPhones(text)}
//           value={phones}
//           maxLength={10}
//         />
//       </View>
//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           placeholder="city"
//           onChangeText={(text) => setCity(text)}
//           value={city}
//           maxLength={20}
//         />
//       </View>
//       <Button title="continue" onPress={handleSignup} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#fff",
//   },
//   buttonText: {
//     color: "white",
//     fontSize: 20,
//   },
//   buttonContainer: {
//     marginTop: 30,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   button: {
//     margin: 10,
//     padding: 20,
//     backgroundColor: "gray",
//     borderRadius: 10,
//   },
//   inputContainer: {
//     marginVertical: 10,
//   },
//   input: {
//     backgroundColor: "#F7F7F7",
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     padding: 10,
//     width: "100%",
//     marginBottom: 10,
//     fontSize: 18,
//     color: "#333",
//   },

//   label: {
//     fontWeight: "bold",
//     fontSize: 5,
//     marginVertical: 10,
//   },
//   text: {
//     fontSize: 30,
//     fontWeight: "bold",
//     marginBottom: 20,
//     borderRadius: 5,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginTop: 50,
//     marginBottom: 30,
//   },
//   subtitle: {
//     fontSize: 20,
//     fontWeight: "bold",
//     textAlign: "center",
//     position: "relative",
//     top: -7,
//     width: "100%",
//     marginTop: 0,
//   },
// });
