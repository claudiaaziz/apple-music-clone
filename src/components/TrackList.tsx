import { utilsStyles } from '@/styles'
import { FlatList, FlatListProps, View } from 'react-native'
import TrackListItem from './TrackListItem'

export type TrackListProps = Partial<FlatListProps<unknown>> & {
	tracks: any[] //temp
}

const ItemDivider = () => (
	<View style={{ ...utilsStyles.itemSeparator, marginVertical: 9, marginLeft: 60 }} />
)

export default function TrackList({ tracks, ...flatlistProps }: TrackListProps) {
	return (
		<FlatList
			data={tracks}
			contentContainerStyle={{ paddingTop: 10, paddingBottom: 128 }}
			ListFooterComponent={ItemDivider}
			ItemSeparatorComponent={ItemDivider}
			renderItem={({ item: track }) => <TrackListItem track={{ ...track, image: track.artwork }} />}
		/>
	)
}
