// import React, { useEffect, useState } from 'react';
// import { FlatList, Image, StatusBar, StyleSheet, View } from 'react-native';
// import { Button, Card, Divider, Text, Theme, Title, useTheme } from 'react-native-paper';
// import { animeLoadTopTenAction } from '../src/animeAction';
// import { animeListSelector, animeTopTenSelector } from '../src/animeSelectors';
// import { connect } from 'react-redux';
// import { useAppDispatch } from '../../store/src/mainStore';
// import { useNavigation } from '@react-navigation/native';
// import { Anime, AnimeList, AnimeStatus } from '../typings';
// import { GlobalState } from '../../store/typings';

// interface AnimeComponentStateProps {
// 	items?: AnimeList,
// 	status: AnimeStatus,
// }

// interface AnimeComponentDispatchProps {
// 	animeLoadTopTen?: typeof animeLoadTopTenAction
// }

// type AnimeProps = AnimeComponentStateProps & AnimeComponentDispatchProps;

// const AnimeTopTenComponentScreen = (props: AnimeProps) => {

// 	const [ isFetching, setIsFetching ] = useState(false)
// 	const [ data, setData ] = useState<Anime[]>([])

// 	const navigation = useNavigation();
// 	const dispatch = useAppDispatch();
// 	const theme: Theme = useTheme();

// 	useEffect(() => {
// 		// dispatch(props.animeLoadTopTen(props.status));
// 	}, [])

// 	const renderVerticalItem = ({ item }: { item: Anime }) => (
// 		<View style={styles.verticalContainer}>
// 			<Image style={{width: 200, height: 300, alignItems: 'center'}} source={{ uri: item.images.jpg.image_url }} />
// 			<Text style={styles.text} variant="titleSmall">{item.title}</Text>
// 		</View>
// 	);

// 	return (
// 		<View style={styles.sessionContainer}>
// 			<Text style={{marginLeft: 10}} variant="headlineSmall">{props.title}</Text>
// 			<FlatList
// 				data={data}
// 				renderItem={renderVerticalItem}
// 				horizontal={true}
// 				alwaysBounceVertical={false}
// 				directionalLockEnabled={true}
// 				// keyExtractor={item => item.name}
// 				onEndReachedThreshold={0.2}
// 				refreshing={isFetching}
// 				onEndReached={() => {
// 					// dispatch(props.animeLoadTopTen({ refresh: false, type: props.status }));
// 				}}
// 			/>
// 		</View>
// 	);
// }

// const styles = StyleSheet.create({
// 	verticalContainer: {
// 		borderRadius: 10,
// 		margin: 10,
// 		flex: 1,
// 		flexDirection: 'column',
// 		width: 200,
// 		backgroundColor: 'black',
// 		alignItems: 'center'
// 	},
// 	sessionContainer: {
// 		height: 400,
// 		marginVertical: 10,
// 	},
// 	text: {
// 		marginTop: 10,
// 	},
// 	cardContainer: {
// 		marginVertical: 20,
// 	},
// });

// export default connect<AnimeComponentStateProps, AnimeComponentDispatchProps>(
// 	(state: GlobalState) => ({
// 		items: animeTopTenSelector(state),
// 	}),
// 	{
// 		animeLoadTopTen: animeLoadTopTenAction
// 	},
// )(AnimeTopTenComponentScreen);

