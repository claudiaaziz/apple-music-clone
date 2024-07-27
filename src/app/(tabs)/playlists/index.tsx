import { screenPadding } from '@/constants/tokens'
import { playlistNameFilter } from '@/helpers/filter'
import { Playlist } from '@/helpers/types'
import useNavigationSearch from '@/hooks/useNavigationSearch'
import { usePlaylists } from '@/store/library'
import { defaultStyles } from '@/styles'
import { useRouter } from 'expo-router'
import React, { useMemo } from 'react'
import { ScrollView, View } from 'react-native'

export default function PlaylistsScreen() {
	const router = useRouter()

	const search = useNavigationSearch({
		searchBarOptions: {
			placeholder: 'Find in playlists',
		},
	})

	const { playlists } = usePlaylists()
	console.log('PlaylistsScreen 🩷 playlists:', playlists)

	const filteredPlaylists = useMemo(() => {
		return playlists.filter(playlistNameFilter(search))
	}, [search, playlists])

	const handlePlaylistPress = (playlist: Playlist) => {
		router.navigate(`/(tabs)/playlists/${playlist.name}`)
	}

	return (
		<View style={defaultStyles.container}>
			<ScrollView
				contentInsetAdjustmentBehavior="automatic"
				style={{ paddingHorizontal: screenPadding.horizontal }}
			>
				<PlaylistList
					scrollEnabled={false}
					playlists={filteredPlaylists}
					onPlaylistPress={handlePlaylistPress}
				/>
			</ScrollView>
		</View>
	)
}
