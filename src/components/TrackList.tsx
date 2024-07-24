import { screenPadding } from '@/constants/tokens'
import { utilsStyles } from '@/styles'
import { FlatList, FlatListProps, Text, View } from 'react-native'
import TrackPlayer, { Track } from 'react-native-track-player'
import TrackListItem from '@/components/TrackListItem'

export type TrackListProps = Partial<FlatListProps<Track>> & {
	tracks: Track[]
}

const ItemDivider = () => (
	<View style={{ ...utilsStyles.itemSeparator, marginVertical: 9, marginLeft: 60 }} />
)

export default function TrackList({ tracks, ...flatlistProps }: TrackListProps) {
	const handleTrackSelect = async (track: Track) => {
		await TrackPlayer.load(track)
		await TrackPlayer.play()
	}

	return (
		<FlatList
			data={tracks}
			contentContainerStyle={{ paddingTop: 10, paddingBottom: 128 }}
			ListEmptyComponent={
				<View style={utilsStyles.emptyContentContainer}>
					<Text style={utilsStyles.emptyContentTextNoResults}>No Results</Text>
					<Text style={utilsStyles.emptyContentTextTryANewSearch}>Try a new search.</Text>
				</View>
			}
			ListFooterComponent={tracks.length > 0 ? ItemDivider : null}
			ItemSeparatorComponent={ItemDivider}
			renderItem={({ item: track }) => (
				<TrackListItem track={track} handleTrackSelect={handleTrackSelect} />
			)}
			{...flatlistProps}
		/>
	)
}
