import library from '@/assets/data/library.json'
import { FlatList, FlatListProps, View } from 'react-native'
import TrackListItem from './TrackListItem'
import { utilsStyles } from '@/styles'

export type TrackListProps = Partial<FlatListProps<unknown>>

const ItemDivider = () => (
	<View style={{ ...utilsStyles.itemSeparator, marginVertical: 9, marginLeft: 60 }} />
)

export default function TrackList({ ...flatlistProps }: TrackListProps) {
	return (
		<FlatList
			data={library}
			ItemSeparatorComponent={ItemDivider}
			renderItem={({ item: track }) => <TrackListItem track={{ ...track, image: track.artwork }} />}
		/>
	)
}
