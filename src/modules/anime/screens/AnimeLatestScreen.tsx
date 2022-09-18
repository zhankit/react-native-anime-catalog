import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text, Theme, useTheme } from 'react-native-paper';
import { animeStartLoadLatestAction, animeStartLoadTopTenAction } from '../src/animeAction';
import { animeLatestSelector, animeTopListSelector } from '../src/animeSelectors';
import { connect } from 'react-redux';
import { useAppDispatch } from '../../store/src/mainStore';
import { useNavigation } from '@react-navigation/native';
import { Anime, AnimeStatus } from '../typings';
import { GlobalState } from '../../store/typings';

interface AnimeComponentStateProps {
	items?: Anime[],
	status: AnimeStatus,
}

interface AnimeComponentDispatchProps {
	animeFetchTop: typeof animeStartLoadLatestAction
}

type AnimeProps = AnimeComponentStateProps & AnimeComponentDispatchProps;

const AnimeLatestScreen = (props: AnimeProps) => {

	const [ isFetching, setIsFetching ] = useState(false)

	const navigation = useNavigation();
	const dispatch = useAppDispatch();
	const theme: Theme = useTheme();

	useEffect(() => {
		dispatch(props.animeFetchTop(props.status));
	}, [])

	const renderVerticalItem = ({ item }: { item: Anime }) => (
		<TouchableOpacity onPress={() => navigation.navigate('AnimeDetails', { id: item.mal_id })}>
			<View style={styles.verticalContainer}>
				<Image style={{width: 200, height: 300, alignItems: 'center'}} source={{ uri: item.images.jpg.image_url }} />
				<Text style={styles.text} variant="titleSmall">{item.title}</Text>
			</View>
		</TouchableOpacity>
	);

	return (
		<View style={styles.sessionContainer}>
			<Text style={{marginLeft: 10}} variant="headlineSmall">{"Latest"}</Text>
			<FlatList
				data={props.items}
				renderItem={renderVerticalItem}
				horizontal={true}
				alwaysBounceVertical={false}
				directionalLockEnabled={true}
				refreshing={isFetching}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	verticalContainer: {
		borderRadius: 10,
		margin: 10,
		flex: 1,
		flexDirection: 'column',
		width: 200,
		backgroundColor: 'black',
		alignItems: 'center'
	},
	sessionContainer: {
		height: 400,
		marginVertical: 10,
	},
	text: {
		marginTop: 10,
	},
	cardContainer: {
		marginVertical: 20,
	},
});

export default connect<AnimeComponentStateProps, AnimeComponentDispatchProps>(
	(state: GlobalState) => ({
		items: animeLatestSelector(state),
	}),
	{
		animeFetchTop: animeStartLoadLatestAction
	},
)(AnimeLatestScreen);

