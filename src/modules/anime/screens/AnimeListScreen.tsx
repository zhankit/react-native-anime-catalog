import React, {useEffect, useState} from 'react';
import {FlatList, StatusBar, StyleSheet, View} from 'react-native';
import {Button, Card, Searchbar, Theme, useTheme} from 'react-native-paper';
import {animeOnPageLoadAction} from '../src/animeAction';
import {animeListSelector} from '../src/animeSelectors';
import {connect} from 'react-redux';
import {useAppDispatch} from '../../store/src/mainStore';
import {useNavigation} from '@react-navigation/native';
import {Anime, AnimeList, AnimeStatus} from '../typings';
import {GlobalState} from '../../store/typings';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';

interface AnimeStateProps {
	items: AnimeList;
	status: AnimeStatus;
}

interface AnimeDispatchProps {
	animeRefresh: typeof animeOnPageLoadAction;
}

type AnimeProps = AnimeStateProps & AnimeDispatchProps;

const AnimeListScreen = (props: AnimeProps) => {
	const [isFetching, setIsFetching] = useState(false);
	const [searchValue, setSearchValue] = useState('');

	const navigation = useNavigation();
	const dispatch = useAppDispatch();
	const theme: Theme = useTheme();

	const bottonTabHeight = useBottomTabBarHeight();

	useEffect(() => {
		console.log('useEffect')
		dispatch(
			props.animeRefresh({
				refreshCache: true,
				type: props.status,
				searchString: '',
			}),
		);
	}, []);

	const refreshList = () => {
		console.log('refreshList')
		setIsFetching(true);
		dispatch(props.animeRefresh({refreshCache: true, type: props.status}));
		setIsFetching(false);
	};

	const onChangeSearch = (query: string) => {
		setSearchValue(query);
		// dispatch(props.animeRefresh({ refreshCache: true, type: props.status, searchString: query}));
	};

	const onStartSearch = () => {
		// setSearchValue(query)
		dispatch(
			props.animeRefresh({
				refreshCache: true,
				type: props.status,
				searchString: searchValue,
			}),
		);
	};

	const renderHorizontalItem = ({item}: {item: Anime}) => (
		// <View style={styles.verticalContainer}>
		// 	<ImageBackground style={{width: '100%', height: 300, alignItems: 'center'}} source={{ uri: item.images.jpg.large_image_url }} >
		// 		<View style={{ opacity: 0.6,  backgroundColor:'transparent'}}>

		// 		</View>
		// 	</ImageBackground>
		// 	<Text style={styles.text} variant="titleSmall">{item.title}</Text>
		// </View>
		<Card style={styles.cardContainer}>
			<Card.Title title={item.title} />
			<Card.Cover source={{uri: item.images.jpg.large_image_url}} />
			<Card.Actions>
				<Button
					mode="contained"
					onPress={() => {
						navigation.navigate('AnimeDetails', {id: item.mal_id});
					}}
				>
					{'View'}
				</Button>
			</Card.Actions>
		</Card>
	);

	const renderComponentList = () => {
		console.log(
			'props.status',
			props.status !== 'favourite' && searchValue.length === 0,
		);

		// if (props.status !== 'favourite' && searchValue.length === 0) {
		// 	// TODO: Add component screen here
		// 	return (
		// 		<ScrollView>
		// 			<View>
		// 			</View>
		// 		</ScrollView>
		// 	)
		// } else {
		return (
			<View style={{marginBottom: bottonTabHeight}}>
				<FlatList
					data={props.items.search}
					renderItem={renderHorizontalItem}
					alwaysBounceVertical={false}
					// keyExtractor={item => item.name}
					onEndReachedThreshold={0.2}
					// onRefresh={refreshList}
					// refreshControl={<ActivityIndicator />}
					refreshing={isFetching}
					onEndReached={() => {
						dispatch(
							props.animeRefresh({
								refreshCache: false,
								type: props.status,
								searchString: searchValue,
							}),
						);
					}}
				/>
			</View>
		);
		// }
	};

	return (
		<View
			style={{
				...styles.viewContainer,
				backgroundColor: theme.colors.background,
				flex: 1,
			}}
		>
			<StatusBar barStyle="light-content" backgroundColor="#6a51ae" />
			{props.status !== 'favourite' && (
				<Searchbar
					style={{backgroundColor: theme.colors.backdrop, margin: 10}}
					placeholder="Jijitsu"
					onChangeText={onChangeSearch}
					onEndEditing={() => {
						onStartSearch();
					}}
					value={searchValue}
				/>
			)}
			{renderComponentList()}
		</View>
	);
};

const styles = StyleSheet.create({
	viewContainer: {
		// marginBottom: bottonTabHeight
	},
	verticalContainer: {
		// borderRadius: 10,
		marginVertical: 10,
		flex: 1,
		flexDirection: 'column',
		height: 400,
		// width: 200,
		backgroundColor: 'black',
		alignItems: 'center',
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

export default connect<AnimeStateProps, AnimeDispatchProps>(
	(state: GlobalState) => ({
		items: animeListSelector(state),
	}),
	{
		animeRefresh: animeOnPageLoadAction,
	},
)(AnimeListScreen);
