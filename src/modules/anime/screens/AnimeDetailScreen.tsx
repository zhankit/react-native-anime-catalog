/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Title} from 'react-native-paper';
import {animeFetchDetailsAction} from '../src/animeAction';
import {connect} from 'react-redux';
import {NavigationContainerProps} from '@react-navigation/native';
import {useAppDispatch} from '../../store/src/mainStore';

interface AnimeDetailsDispatchProps {
	animeFetchDetails: typeof animeFetchDetailsAction;
}

const AnimeDetailScreen = (
	props: AnimeDetailsDispatchProps & NavigationContainerProps,
) => {
	const { route } = props;
	console.log('props', route.params.id);

	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(props.animeFetchDetails(route.params.id));
	}, []);

	return (
		<View style={styles.viewContainer}>
			<Title>test</Title>
		</View>
	);
};

const styles = StyleSheet.create({
	viewContainer: {
		margin: 10,
	},
});

export default connect<undefined, AnimeDetailsDispatchProps>(undefined, {
	animeFetchDetails: animeFetchDetailsAction,
})(AnimeDetailScreen);
