import AnimeListScreen from '../../anime/screens/AnimeListScreen';

import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
	createStackNavigator,
	StackNavigationOptions,
} from '@react-navigation/stack';
import IconButton from 'react-native-vector-icons/Feather';
import {AnimeStatus} from '../../anime/typings';
import AnimeDetailScreen from '../../anime/screens/AnimeDetailScreen';
import {Searchbar, Theme, useTheme} from 'react-native-paper';

const Stack = createStackNavigator();

interface StackContainerStateProps {
	status: AnimeStatus;
}

const AnimeStackContainer = (props: StackContainerStateProps) => {
	const types = props.status;
	const navigation = useNavigation();
	const theme: Theme = useTheme();

	const sideListMenu: StackNavigationOptions = {
		headerLeft: () => (
			<IconButton
				style={{marginLeft: 20}}
				name="menu"
				color={theme.colors.onSurface}
				size={24}
				onPress={() => {
					navigation.getParent('LeftDrawer')?.openDrawer();
				}}
			/>
		),
	};

	return (
		<Stack.Navigator
			screenOptions={{
				headerStyle: {
					backgroundColor: theme.colors.background,
				},
				headerTintColor: theme.colors.onSurface,
				headerTitleStyle: {
					fontWeight: 'bold',
				},
				// headerShown: false
			}}>
			<Stack.Screen name="Anime" options={sideListMenu}>
				{props => (
					<AnimeListScreen
						items={[]}
						{...props}
						status={types}
					/>
				)}
			</Stack.Screen>
			<Stack.Screen name="AnimeDetails" component={AnimeDetailScreen}/>
		</Stack.Navigator>
	);
};

export default AnimeStackContainer;
