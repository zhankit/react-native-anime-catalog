import React from 'react';
import {StyleSheet} from 'react-native';

import {Provider} from 'react-redux';
import NavigatorContainer from './src/modules/navigators/screens/MainNavigator';
import store from './src/modules/store/src/mainStore';
import {
	MD3DarkTheme as DefaultTheme,
	Provider as PaperProvider,
} from 'react-native-paper';

const theme = {
	...DefaultTheme,
	roundness: 2,
	version: 3,
	colors: {
		...DefaultTheme.colors,
		primary: '#77d1ff',
		onPrimary: '#003549',
		primaryContainer: '#004d68',
		onPrimaryContainer: '#c2e8ff',
		secondary: '#b5c9d7',
		onSecondary: '#20333d',
		secondaryContainer: '#364954',
		onSecondaryContainer: '#d1e5f3',
		tertiary: '#efbd94',
		onTertiary: '#48290c',
		tertiaryContainer: '#623f20',
		onTertiaryContainer: '#ffdcc1',
		background: '#1b1b1f',
		onBackground: '#e1e2e5',
		surface: '#1b1b1f',
		onSurface: '#ebe0e1',
		outline: '#9e8c90',
		surfaceVariant: '#514347',
		onSurfaceVariant: '#d5c2c6',
	},
};

const App = () => {
	return (
		<Provider store={store}>
			<PaperProvider theme={theme}>
				<NavigatorContainer />
			</PaperProvider>
		</Provider>
	);
};

const styles = StyleSheet.create({
	sectionContainer: {
		marginTop: 32,
		paddingHorizontal: 24,
	},
	sectionTitle: {
		fontSize: 24,
		fontWeight: '600',
	},
	sectionDescription: {
		marginTop: 8,
		fontSize: 18,
		fontWeight: '400',
	},
	highlight: {
		fontWeight: '700',
	},
});

export default App;
