/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Dimensions } from 'react-native';
import { animeFavouriteAction, animeFetchDetailsAction, animeunFavouriteAction } from '../src/animeAction';
import { connect, useDispatch } from 'react-redux';
import { NavigationContainerProps } from '@react-navigation/native';
import { Anime } from '../typings';
import { GlobalState } from '../../store/typings';
import { animeDetailselector, animeFavouriteselector } from '../src/animeSelectors';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, Dialog, Portal, Text, Theme, useTheme } from 'react-native-paper';
import IconButton from 'react-native-vector-icons/AntDesign';
import Video from 'react-native-video';

interface AnimeDetailsStateProps {
	details: Anime;
	favourite: Anime[];
}
interface AnimeDetailsDispatchProps {
	animeFetchDetails: typeof animeFetchDetailsAction;
	animeFav: typeof animeFavouriteAction;
	animeunFav: typeof animeunFavouriteAction;
}

const AnimeDetailScreen = (
	props:  AnimeDetailsStateProps & AnimeDetailsDispatchProps & NavigationContainerProps,
) => {
	const { route } = props;

	const theme: Theme = useTheme();

	const [isFav, setIsFav] = React.useState<boolean>(props.favourite.findIndex( (list: Anime) => {return list.mal_id === route.params.id}) >= 0)
	const [visible, setVisible] = React.useState<boolean>(false);

	props.navigation.setOptions({
		headerTitle: '',
		tabBarStyle: {
		display: "none"
		},
		headerRight: () => (
			<IconButton
				style={{marginRight: 10}}
				name={isFav ? 'star' : 'staro'}
				color={isFav ? theme.colors.primary : theme.colors.onSurface}
				size={24}
				onPress={() => {
					if (isFav) {
						props.animeunFav(route.params.id);
						setIsFav(false)
						setVisible(true)
					} else {
						props.animeFav(props.details);
						setIsFav(true)
						setVisible(true)
					}
				}}
			/>
		),
	})

	useEffect(() => {
		props.animeFetchDetails(route.params.id);
	}, []);

	return (
		<ScrollView
			style={{...styles.viewContainer, backgroundColor: theme.colors.background}}
			bounces={false}>
			{ props.details &&
				<ScrollView
					style={{...styles.viewContainer, backgroundColor: theme.colors.background}}
					bounces={false}

				>
					<Image style={styles.bannerContainer} source={{ uri: props.details.images.jpg.image_url ?? null }} />
					<Text
						style={styles.text}
						variant="titleLarge">
					{props.details.title}
					</Text>
					<View>
						<Text
							style={{...styles.titleText, color: theme.colors.primary}}
							variant="titleMedium">
						{"Sypnosis"}
						</Text>
						<Text
							style={styles.text}
							variant="bodySmall">
							{props.details.synopsis ?? 'N/A'}
						</Text>
					</View>
					<View>
						<Text
							style={{...styles.titleText, color: theme.colors.primary}}
							variant="titleMedium"
						>
						{"Background"}
						</Text>
						<Text
							style={styles.text}
							variant="bodySmall">
							{props.details.background ?? 'N/A'}
						</Text>
					</View>
					<View>
						<Text
							style={{...styles.titleText, color: theme.colors.primary}}
							variant="titleMedium"
						>
						{"Score"}
						</Text>
						<Text
							style={styles.text}
							variant="bodySmall">
							{`${props.details.score ?? '-'} / 10`}
						</Text>
					</View>
					<View>
						<Text
							style={{...styles.titleText, color: theme.colors.primary}}
							variant="titleMedium"
						>
						{"Rating"}
						</Text>
						<Text
							style={styles.text}
							variant="bodySmall">
							{props.details.rating ?? 'N/A'}
						</Text>
					</View>
					<View>
						<Text
							style={{...styles.titleText, color: theme.colors.primary}}
							variant="titleMedium"
						>
						{"Year"}
						</Text>
						<Text
							style={styles.text}
							variant="bodySmall">
							{props.details.year ?? 'N/A'}
						</Text>
					</View>
					<View>
						<Text
							style={{...styles.titleText, color: theme.colors.primary}}
							variant="titleMedium"
						>
						{"Episodes"}
						</Text>
						<Text
							style={styles.text}
							variant="bodySmall">
							{props.details.episodes ?? 'N/A'}
						</Text>
					</View>
					{	props.details.trailer.embed_url &&
						<Video
							source={{ uri: props.details.trailer.embed_url }}
							style={{ width: 300, height: 300, backgroundColor: theme.colors.background }}
							controls={true}
					/>}
					<Portal>
						<Dialog visible={visible} onDismiss={() => setVisible(false)}>
							<Dialog.Title>{isFav ? 'You have favourited!' : 'Sorry to see you unfavourite...'}</Dialog.Title>
							<Dialog.Content>
							<Text
								variant="bodyMedium">
								{isFav ? 'You may check me out at favourite tab!' : 'Get lucky next time 😃'}
							</Text>
							</Dialog.Content>
							<Dialog.Actions>
							<Button onPress={() => setVisible(false)}>{'Done'}</Button>
							</Dialog.Actions>
						</Dialog>
					</Portal>
				</ScrollView>
			}
			{
				!props.details &&
				<View style={{flex: 1}}>
					<View style={{flex:1, alignItems:'center',justifyContent:'center',alignSelf:'stretch'}}>
						<Text>{"Loading..."}</Text>
					</View>
				</View>
			}
		</ScrollView>
	);
};


const styles = StyleSheet.create({
	viewContainer: {
		flex: 1,
		paddingBottom: 20,
	},
	bannerContainer: {
		width: '100%',
		height: 300,
		alignItems: 'center',
		borderBottomRightRadius: Dimensions.get('window').width / 4,
	},
	videoContainer:{
		height: 250,
	},
	video: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
		height: 250,
	},
	titleText: {
		marginTop: 5,
		marginHorizontal: 20,
	},
	text :{
		marginTop: 5,
		marginHorizontal: 20
	}
});

export default connect<AnimeDetailsStateProps, AnimeDetailsDispatchProps>(
	(state: GlobalState) => ({
		details: animeDetailselector(state),
		favourite: animeFavouriteselector(state)
	}),
	{
		animeFetchDetails: animeFetchDetailsAction,
		animeFav: animeFavouriteAction,
		animeunFav: animeunFavouriteAction,
	}
)(AnimeDetailScreen);
