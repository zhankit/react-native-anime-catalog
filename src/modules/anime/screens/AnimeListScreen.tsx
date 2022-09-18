import React, { useEffect, useState } from 'react';
import { FlatList, Image, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { Button, Card, Searchbar, Text, Theme, useTheme } from 'react-native-paper';
import { animeOnPageLoadAction, animeStartLoadLatestAction, animeStartLoadPopularAction, animeStartLoadTopTenAction } from '../src/animeAction';
import { animeListSelector, animeSearchSelector } from '../src/animeSelectors';
import { connect } from 'react-redux';
import { useAppDispatch } from '../../store/src/mainStore';
import { useNavigation } from '@react-navigation/native';
import { Anime, AnimeList, AnimeStatus } from '../typings';
import { GlobalState } from '../../store/typings';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import AnimeTopTenScreen from './AnimeTopTenScreen';
import AnimeLatestScreen from './AnimeLatestScreen';
import AnimePopularScreen from './AnimePopularScreen';

interface AnimeStateProps {
	items: Anime[];
	status: AnimeStatus;
}

interface AnimeDispatchProps {
	animeRefresh: typeof animeOnPageLoadAction;
	animeFetchTop: typeof animeStartLoadTopTenAction;
	animeFetchLatest: typeof animeStartLoadLatestAction;
	animeFetchPopular: typeof animeStartLoadPopularAction;
}

type AnimeProps = AnimeStateProps & AnimeDispatchProps;

const AnimeListScreen = (props: AnimeProps) => {
	const [isFetching, setIsFetching] = useState(false);
	const [searchValue, setSearchValue] = useState('');

	const navigation = useNavigation();
	const dispatch = useAppDispatch();
	const theme: Theme = useTheme();

	let bottonTabHeight = 0
	try {
		bottonTabHeight = useBottomTabBarHeight();
	} catch (e) {}

	useEffect(() => {
		dispatch(
			props.animeRefresh({
				initialLoad: false,
				refreshCache: true,
				type: props.status,
				searchString: '',
			}),
		);
	}, []);

	const refreshList = () => {
		setIsFetching(true);
		dispatch(props.animeRefresh({ initialLoad: false, refreshCache: true, type: props.status, searchString: ''}));
		setIsFetching(false);
	};

	const onChangeSearch = (query: string) => {
		setSearchValue(query);
	};

	const onStartSearch = () => {
		// setSearchValue(query)
		dispatch(
			props.animeRefresh({
				initialLoad: false,
				refreshCache: true,
				type: props.status,
				searchString: searchValue,
			}),
		);
	};

	const renderHorizontalItem = ({ item }: {item: Anime}) => (
		<Card style={styles.cardContainer}>
			<Card.Title title={item.title} />
			<Card.Cover source={{ uri: item.images.jpg.large_image_url }} />
			<Card.Actions>
				<Button
					mode="contained"
					onPress={() => {
						navigation.navigate('AnimeDetails', { id: item.mal_id });
					}}
				>
				{'View'}
				</Button>
			</Card.Actions>
		</Card>
	);

	const renderComponentList = () => {

		// if (props.status !== 'favourite' && searchValue.length === 0) {
		// 	// TODO: Add component screen here
		// 	return (
		// 		<ScrollView>
		// 			<View>
		// 				<AnimeTopTenScreen status={props.status} />
		// 				<AnimeLatestScreen status={props.status} />
		// 				<AnimePopularScreen status={props.status} />
		// 			</View>
		// 		</ScrollView>
		// 	)
		// } else if (props.items.length === 0 && searchValue.length !== 0) {
		// 	// TODO: Add component screen here
		// 	return (
		// 		<ScrollView>
		// 			<View style={{alignItems: "center"}}>
		// 				<Text>{"Empty Result"}</Text>
		// 			</View>
		// 		</ScrollView>
		// 	)
		// } else {
			return (
				<View style={{ marginBottom: bottonTabHeight }}>
					<FlatList
						data={props.items}
						renderItem={renderHorizontalItem}
						alwaysBounceVertical={false}
						// keyExtractor={item => item.name}
						onEndReachedThreshold={0.3}
						onRefresh={refreshList}
						// refreshControl={<ActivityIndicator />}
						refreshing={isFetching}
						onEndReached={() => {
							dispatch(
								props.animeRefresh({
									initialLoad: false,
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
			}}>
			<StatusBar barStyle="light-content" backgroundColor="#6a51ae" />
			{props.status !== 'favourite' && (
				<Searchbar
					style={{ backgroundColor: theme.colors.backdrop, margin: 10 }}
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
		items: animeSearchSelector(state),
	}),
	{
		animeRefresh: animeOnPageLoadAction,
		animeFetchTop: animeStartLoadTopTenAction,
		animeFetchLatest: animeStartLoadLatestAction,
		animeFetchPopular: animeStartLoadPopularAction,
	},
)(AnimeListScreen);
