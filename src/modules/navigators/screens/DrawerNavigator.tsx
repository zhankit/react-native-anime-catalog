import { createDrawerNavigator } from '@react-navigation/drawer';
import { Theme, useTheme } from 'react-native-paper';
import BottomNavigator from './BottomNavigator';
import AnimeStackContainer from './StackNavigator';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
	const theme: Theme = useTheme();

	return (
		<Drawer.Navigator
			initialRouteName="Home"
			id="LeftDrawer"
			screenOptions={{
				drawerPosition: 'left',
				headerShown: false,
				drawerActiveBackgroundColor: theme.colors.surface,
				drawerActiveTintColor: theme.colors.primary,
				drawerInactiveTintColor: theme.colors.onSurface,
				drawerStyle: {
					backgroundColor: theme.colors.background,
				},
			}}>
			<Drawer.Screen name="Home" component={BottomNavigator} />
			<Drawer.Screen name="Favourite">
				{props => (
					<AnimeStackContainer {...props} status={'favourite'} />
				)}
			</Drawer.Screen>
		</Drawer.Navigator>
	);
};

export default DrawerNavigator;
