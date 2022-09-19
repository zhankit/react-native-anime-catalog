import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, StatusBar, StyleSheet, View } from 'react-native';
import { Button, Card, Searchbar, Text, Theme, useTheme } from 'react-native-paper';
import { animeOnPageLoadAction} from '../src/animeAction';
import { animeFavouriteselector, animeSearchSelector } from '../src/animeSelectors';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Anime, AnimeStatus } from '../typings';
import { GlobalState } from '../../store/typings';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

interface AnimeStateProps {
	items: Anime[];
	fav: Anime[];
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
	const theme: Theme = useTheme();

	let bottonTabHeight = 0
	try {
		bottonTabHeight = useBottomTabBarHeight();
	} catch (e) {}

	useEffect(() => {
		props.animeRefresh({
			initialLoad: false,
			refreshCache: true,
			type: props.status,
			searchString: ''
		})
	}, []);

	const wait = (timeout: number) => {
		return new Promise(resolve => setTimeout(resolve, timeout));
	  }

	const refreshList = () => {
		setIsFetching(true);
		setSearchValue('');
		props.animeRefresh({ initialLoad: false, refreshCache: true, type: props.status, searchString: ''});
		wait(2000).then(() => setIsFetching(false));
	};

	const onChangeSearch = (query: string) => {
		setSearchValue(query);
	};

	const onStartSearch = () => {
		props.animeRefresh({
			initialLoad: false,
			refreshCache: true,
			type: props.status,
			searchString: searchValue,
		})
	}

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
		if (props.status === 'favourite' && props.fav.length === 0) {
			return (
			<View style={{ alignItems: "center", flex: 1}}>
				<View style={{flex:1,alignItems:'center',justifyContent:'center',alignSelf:'stretch'}}>
				  <Text variant='bodyMedium' >{'No favourite anime in your list. :( '}</Text>
  				</View>
			</View>)
		}

		if (props.status !== 'favourite' && props.items.length === 0) {
			return (
			<View style={{ alignItems: "center", flex: 1}}>
				<View style={{flex:1,alignItems:'center',justifyContent:'center',alignSelf:'stretch'}}>
				  <Text variant='bodyMedium' >{'Where is the anime, Kanji?!  :( '}</Text>
  				</View>
			</View>)
		}

		return (
			<View style={{ flex: 1, marginBottom: bottonTabHeight }}>
				<FlatList
					data={props.status === 'favourite' ? props.fav : props.items}
					renderItem={renderHorizontalItem}
					alwaysBounceVertical={false}
					// keyExtractor={item => item.name}
					onEndReachedThreshold={0.3}
					onRefresh={props.status === 'favourite' ? null : refreshList}
					refreshControl={<RefreshControl
						size="large"
						tintColor={theme.colors.onSurface}
						refreshing={isFetching}
						onRefresh={refreshList}
					  />}
					refreshing={isFetching}
					onEndReached={ () => {
						console.log("This is reach");
						props.animeRefresh({
							initialLoad: false,
							refreshCache: false,
							type: props.status,
							searchString: searchValue,
						})
					}}
				/>
			</View>
		);
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
					placeholder="Jujutsu kaisen..."
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
	viewContainer: {},
	verticalContainer: {
		marginVertical: 10,
		flex: 1,
		flexDirection: 'column',
		height: 400,
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
		fav: animeFavouriteselector(state),
	}),
	{
		animeRefresh: animeOnPageLoadAction
	},
)(AnimeListScreen);
