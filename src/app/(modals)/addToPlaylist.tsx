import PlaylistList from '@/components/PlaylistList'
import { screenPadding } from '@/constants/tokens'
import { Playlist } from '@/helpers/types'
import { usePlaylists, useTracks } from '@/store/library'
import { useQueue } from '@/store/queue'
import { defaultStyles } from '@/styles'
import { useHeaderHeight } from '@react-navigation/elements'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import TrackPlayer, { Track } from 'react-native-track-player'

export default function AddToPlaylistModal() {
	const router = useRouter()
	const headerHeight = useHeaderHeight()

	const trackUrl = useLocalSearchParams<{ trackUrl: Track['url'] }>()
	const tracks = useTracks()
	const { playlists, addToPlaylist } = usePlaylists()
	const track = tracks.find((currTrack) => currTrack.url === trackUrl)
	const { activeQueueId } = useQueue()

	if (!track) return null

	const availablePlaylists = playlists.filter((playlist) =>
		playlist.tracks.some((playlistTrack) => playlistTrack.url === track.url),
	)

	const handlePlaylistPress = async (playlist: Playlist) => {
		addToPlaylist(track, playlist.name)
		router.dismiss()

		if (activeQueueId?.startsWith(playlist.name)) {
			await TrackPlayer.add(track)
		}
	}

	return (
		<SafeAreaView style={[styles.modalContainer, { paddingTop: headerHeight }]}>
			<PlaylistList playlists={availablePlaylists} onPlaylistPress={handlePlaylistPress} />
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	modalContainer: {
		...defaultStyles.container,
		paddingHorizontal: screenPadding.horizontal,
	},
})
