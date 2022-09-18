import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Linking from '../src/LinkingConfiguration';
import DrawerNavigator from './DrawerNavigator';

const Stack = createNativeStackNavigator();

function NavigatorContainer() {
	return (
		<NavigationContainer linking={Linking}>
			<DrawerNavigator />
		</NavigationContainer>
	);
}

export default NavigatorContainer;
