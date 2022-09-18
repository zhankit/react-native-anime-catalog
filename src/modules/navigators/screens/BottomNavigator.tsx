import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import AnimeStackContainer from './StackNavigator';
import { Theme, useTheme } from 'react-native-paper';
import IconButton from 'react-native-vector-icons/Entypo';

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
	const navigation = useNavigation();
	const theme: Theme = useTheme();

	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				tabBarIcon: ({ color, size }) => {
					let iconName;

					if (route.name === 'Airing') {
						iconName = 'megaphone';
					} else if (route.name === 'Complete') {
						iconName = 'lab-flask';
					} else if (route.name === 'Upcoming') {
						iconName = 'new';
					}

					return (
						<IconButton name={iconName} size={size} color={color} />
					);
				},
				tabBarStyle: {
					backgroundColor: theme.colors.background,
				},
				headerShown: false,
				tabBarActiveTintColor: theme.colors.primary,
				unmountOnBlur: true,
			})}>
			<Tab.Screen name="Airing">
				{props => <AnimeStackContainer {...props} status={'airing'} />}
			</Tab.Screen>
			<Tab.Screen name="Complete">
				{props => (
					<AnimeStackContainer {...props} status={'complete'} />
				)}
			</Tab.Screen>
			<Tab.Screen name="Upcoming">
				{props => (
					<AnimeStackContainer {...props} status={'upcoming'} />
				)}
			</Tab.Screen>
		</Tab.Navigator>
	);
};

export default BottomNavigator;
