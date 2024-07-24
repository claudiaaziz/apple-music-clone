import { screenPadding } from '@/constants/tokens'
import { utilsStyles } from '@/styles'
import { FlatList, FlatListProps, View } from 'react-native'
import TrackPlayer, { Track } from 'react-native-track-player'
import TrackListItem from './TrackListItem'

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
			style={{ paddingHorizontal: screenPadding.horizontal }}
			data={tracks}
			contentContainerStyle={{ paddingTop: 10, paddingBottom: 128 }}
			ListFooterComponent={ItemDivider}
			ItemSeparatorComponent={ItemDivider}
			renderItem={({ item: track }) => (
				<TrackListItem track={track} handleTrackSelect={handleTrackSelect} />
			)}
			{...flatlistProps}
		/>
	)
}
