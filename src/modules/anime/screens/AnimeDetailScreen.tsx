/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Dimensions } from 'react-native';
import { animeFetchDetailsAction } from '../src/animeAction';
import { connect } from 'react-redux';
import { NavigationContainerProps } from '@react-navigation/native';
import { useAppDispatch } from '../../store/src/mainStore';
import { Anime } from '../typings';
import { GlobalState } from '../../store/typings';
import { animeDetailselector } from '../src/animeSelectors';
import { ScreenContext } from 'react-native-screens';
import { ScrollView } from 'react-native-gesture-handler';
import { Text, Theme, Title, useTheme } from 'react-native-paper';
import Video from 'react-native-video';

interface AnimeDetailsStateProps {
	animeFetchDetails: typeof animeFetchDetailsAction;
}
interface AnimeDetailsDispatchProps {
	details: Anime;
}

const AnimeDetailScreen = (
	props: AnimeDetailsDispatchProps & AnimeDetailsStateProps & NavigationContainerProps,
) => {
	const { route } = props;

	const dispatch = useAppDispatch();
	const theme: Theme = useTheme();

	useEffect(() => {
		dispatch(props.animeFetchDetails(route.params.id));
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

					{(props.details.trailer.url || props.details.trailer.embed_url) &&
					<View style={styles.videoContainer}>
						<Video
							source={{
								uri: props.details.trailer.url ?? props.details.trailer.embed_url,
							}}
							style={styles.video}
							controls={true}
							resizeMode="cover"
							hideShutterView={true}
							paused={true}
						/>
					</View>}


				</ScrollView>

			}
			{
				!props.details &&
				<View>
					<Text>{"Loading"}</Text>
				</View>
			}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	viewContainer: {
		flex: 1,
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
	}), {
	animeFetchDetails: animeFetchDetailsAction,
})(AnimeDetailScreen);
