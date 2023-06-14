import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './components/HomeScreen';
import Director from './components/Director/Director';
import LoginScreen from './components/LoginDirection';
import SensorActions, { AddSensor2, DeleteSensor, DeleteSensor2 } from './components/Director/Sensor_management';
import { AddSensor } from './src/Service';
import { basicUrl } from './src/config';
import TableData from './components/table';
import MarkerMap from './components/lifeguard/mapOfLocation';
import SensorRentalManagement from './components/Director/Sensor_rental_management';
// import calculateDistance from './try/trydis';
import AppDistance from './components/lifeguard/CalculationDistance';
import { Login } from './components/Login';
import { AllUsers } from './components/Users/allUsers';
import GoogleMaps from './components/lifeguard/x';
import AlertVolunteer from './components/volunteer/AlertVolunteer';
import AddUser from './components/Users/AddUser';
import AlertParent from './components/Parent/AlertParent';
import AddParent from './components/Director/AddParent';
import { EditUser } from './components/Users/editUser'
// import AddUser from './components/Director/User';
const Stack = createStackNavigator();
// , SignUp
function App() {
	return (

		<NavigationContainer>
			<Stack.Navigator>

				<Stack.Screen name="Home" component={HomeScreen} />
				{/* <Stack.Screen name="Adding_tenant_sensor" component={User} /> */}
				<Stack.Screen name="Director" component={Director} />
				<Stack.Screen name="LoginScreen" component={LoginScreen} />
				<Stack.Screen name="Sensor_management" component={SensorActions} />
				<Stack.Screen name="Adding_sensor" component={AddSensor2} />
				<Stack.Screen name="Deleting_sensor" component={DeleteSensor2} />
				<Stack.Screen name="basicUrl" component={basicUrl} />
				<Stack.Screen name="tableUser" component={TableData} />
				<Stack.Screen name="lifeguardMap" component={MarkerMap} />
				<Stack.Screen name="Sensor_rental_management" component={SensorRentalManagement} />
				<Stack.Screen name="AppDistance" component={AppDistance} />
				<Stack.Screen name="login" component={Login} />
				{/* <Stack.Screen name="SignUp" component={SignUp} /> */}
				<Stack.Screen name="AllUsers" component={AllUsers} />
				<Stack.Screen name="x" component={GoogleMaps} />
				<Stack.Screen name="AlertVolunteer" component={AlertVolunteer} />
				<Stack.Screen name="AddUser" component={AddUser} />
				<Stack.Screen name="EditUser" component={EditUser} />
				<Stack.Screen name='AlertParent' component={AlertParent} />
				<Stack.Screen name='AddParent' component={AddParent} />

			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default App;
