import TrackListItem from '@/components/TrackListItem'
import { useQueue } from '@/store/queue'
import { utilsStyles } from '@/styles'
import { useRef } from 'react'
import { FlatList, FlatListProps, Text, View } from 'react-native'
import TrackPlayer, { Track } from 'react-native-track-player'
import QueueControls from './QueueControls'

export type TrackListProps = Partial<FlatListProps<Track>> & {
	id: string
	tracks: Track[]
	hideQueueControls?: boolean
}

const ItemDivider = () => (
	<View style={{ ...utilsStyles.itemSeparator, marginVertical: 9, marginLeft: 60 }} />
)

export default function TrackList({
	id,
	tracks,
	hideQueueControls = false,
	...flatlistProps
}: TrackListProps) {
	const { activeQueueId, setActiveQueueId } = useQueue()

	const queueOffset = useRef(0)

	const handleTrackSelect = async (selectedTrack: Track) => {
		const trackIdx = tracks.findIndex((track) => track.url === selectedTrack.url)

		// if (trackIdx === -1) return

		const isChangingQueue = id !== activeQueueId

		if (isChangingQueue) {
			const beforeTrack = tracks.slice(0, trackIdx)
			const afterTrack = tracks.slice(trackIdx + 1)

			await TrackPlayer.reset()

			await TrackPlayer.add(selectedTrack)
			await TrackPlayer.add(afterTrack)
			await TrackPlayer.add(beforeTrack)

			await TrackPlayer.play()

			queueOffset.current = trackIdx
			setActiveQueueId(id)
		}
		const nextTrackIdx =
			trackIdx - queueOffset.current < 0
				? tracks.length + trackIdx - queueOffset.current
				: trackIdx - queueOffset.current

		await TrackPlayer.skip(nextTrackIdx)
		await TrackPlayer.play()
	}

	return (
		<FlatList
			data={tracks}
			contentContainerStyle={{ paddingTop: 10, paddingBottom: 128 }}
			ListHeaderComponent={
				!hideQueueControls ? (
					<QueueControls tracks={tracks} style={{ paddingBottom: 20 }} />
				) : undefined
			}
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
