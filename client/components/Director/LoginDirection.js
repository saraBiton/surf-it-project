import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import Director from './Director';
import { addUser } from '../../src/Service';
import { basicUrl } from '../../src/config';
import { CheckPassword } from '../../src/Service';
import MarkerMap from '../lifeguard/mapOfLocation';
import axios from 'axios';

// TouchableOpacity
const LoginScreen = ({ navigation }) => {
  const [userName, setuserName] = useState('');
  const [password, setpassword] = useState('');
  const [error, setError] = useState('');

  
  //   const handleLogin = async () => {

  //     if (!userName || !password) {
  //       setError('Username and password are required');
  //       return;
  //     }
  //     try {

  //       const response = await CheckPassword(basicUrl + 'login/',{
  //         userName: userName,
  //         password: password
  //       });
  //       // addUser(basicUrl + 'users/', userData);
  //       console.log(basicUrl + 'login/' + {userData});
  //       console.log(response.value);
  //     } catch (error) {
  //       console.error(error);
  //       setError('Internal server error');
  //     }
  navigation.navigate('Director');

  // ridax
  const handleLogin = async (navigation) => {
    navigation.navigate('Director');

    // navigation.navigate('Director');
    // const Login = {
    //   username: userName,
    //   password: password,
    // };
    // try {
    //   const response = await CheckPassword (basicUrl + 'login/', Login);
    //   console.log(basicUrl + 'login/',Login);
    //   const result = response.data;
    //   console.log(result);
    //   if (result === 'director') {
    //     navigation.navigate('Director');
    //   } else if (result === 'lifeguard') {
    //     navigation.navigate('lifeguardMap');
    //   } else {
    //     setError('Invalid credentials');
    //   }
    // } catch (error) {
    //   console.error(error);
    //   setError('Internal server error');
    // }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>  login </Text>
      <TextInput
        style={styles.buttonInput}
        placeholder="שם משתמש"
        value={userName}
        onChangeText={setuserName}
      />
      <TextInput
        style={styles.buttonInput}
        placeholder="סיסמה"
        secureTextEntry={true}
        value={password}
        onChangeText={setpassword}
      />
      {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
      <Button title="Login" style={styles.buttonText} onPress={handleLogin} />
    </View>
  );


  // export default function LoginForm({ navigation }) {
  //   const [userName, setUserName] = useState('');
  //   const [password, setPassword] = useState('');
  //   const [error, setError] = useState('');

  //   const handleLogin = async () => {
  //     try {
  //       const response = await axios.post(basicUrl + 'login/', {
  //         username: userName,
  //         password: password,
  //       });
  //       const collection = response.data;
  //       console.log(collection);
  //       if (collection === 'Director') {
  //         navigation.navigate('Director');
  //       } else if (collection === 'Lifeguard') {
  //         navigation.navigate('lifeguardMap');
  //       } else {
  //         setError('Invalid credentials');
  //       }
  //     } catch (error) {
  //       console.error(error);
  //       setError('Internal server error');
  //     }
  //   };

  //   return (
  //     <View>
  //       <Text>Enter your username and password:</Text>
  //       <TextInput
  //         style={styles.buttonInput}
  //         placeholder="username"
  //         value={userName}
  //         onChangeText={setUserName}
  //       />
  //       <TextInput
  //         style={styles.buttonInput}
  //         placeholder="password"
  //         secureTextEntry={true}
  //         value={password}
  //         onChangeText={setPassword}
  //       />
  //       {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
  //       <Button title="Login" onPress={handleLogin} />
  //     </View>
  //   );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 30,
  },
  button: {
    margin: 10,
    padding: 20,
    backgroundColor: 'gray',
    borderRadius: 10,
  },
  buttonInput: {
    margin: 10,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: 'gray',
    borderWidth: 1,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    borderRadius: 5
  },
});

export default LoginScreen;
