import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './components/HomeScreen';
import User from './components/Director/User';
import Director from './components/Director/Director';
import LoginScreen from './components/Director/LoginDirection';
import SensorActions, { AddSensor2, DeleteSensor, DeleteSensor2 } from './components/Director/Sensor_management';
import { AddSensor } from './src/Service';
import { basicUrl } from './src/config'; 
import TableData from './components/table';
import MarkerMap from './components/lifeguard/mapOfLocation';
import SensorRentalManagement from './components/Director/Sensor_rental_management';
// import calculateDistance from './try/trydis';
import AppDistance from './components/lifeguard/CalculationDistance';
import { Login, SignUp } from './components/Login';
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Adding_tenant_sensor" component={User} />
        <Stack.Screen name="Director" component={Director} />
        <Stack.Screen name="LoginDirection" component={LoginScreen} />
        <Stack.Screen name="Sensor_management" component={SensorActions} />
        <Stack.Screen name="Adding_sensor" component={AddSensor2} />
        <Stack.Screen name="Deleting_sensor" component={DeleteSensor2} />
        <Stack.Screen name="basicUrl" component={basicUrl} />
        <Stack.Screen name="tableUser" component={TableData} />
       <Stack.Screen name="lifeguardMap" component={MarkerMap} />
       <Stack.Screen name="Sensor_rental_management" component={SensorRentalManagement} />
       <Stack.Screen name="AppDistance" component={AppDistance} />
       <Stack.Screen name="login" component={Login} />
       <Stack.Screen name="SignUp" component={SignUp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
