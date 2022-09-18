const LinkingConfiguration = {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
	// prefixes: [Linking.createURL('/')],
	config: {
		screens: {
			// This is the Root Directory
			Root: {
				screens: {
					Home: {
						screens: {
							HomeScreen: 'Home',
						},
					},
					AnimeList: {
						screens: {
							AnimeListScreen: 'AnimeList',
						},
					},
					AnimeDetail: {
						screens: {
							AnimeDetailScreen: 'AnimeDetail',
						},
					},
				},
			},
			NotFound: '*',
		},
	},
};

export default LinkingConfiguration;
