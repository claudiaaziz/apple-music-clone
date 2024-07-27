import { playlistNameFilter } from '@/helpers/filter'
import { Playlist } from '@/helpers/types'
import useNavigationSearch from '@/hooks/useNavigationSearch'
import { utilsStyles } from '@/styles'
import React, { useMemo } from 'react'
import { FlatListProps, Text, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import PlaylistListItem from './PlaylistListItem'

type PlaylistListProps = {
	playlists: Playlist[]
	onPlaylistPress: (playlist: Playlist) => void
} & Partial<FlatListProps<Playlist>>

const ItemDivider = () => (
	<View style={{ ...utilsStyles.itemSeparator, marginVertical: 12, marginLeft: 80 }} />
)

export default function PlaylistList({
	playlists,
	onPlaylistPress: handlePlaylistPress,
	...flatListProps
}: PlaylistListProps) {
	const search = useNavigationSearch({
		searchBarOptions: { placeholder: 'Find in playlists' },
	})

	const filteredPlaylists = useMemo(() => {
		return playlists.filter(playlistNameFilter(search))
	}, [search, playlists])

	return (
		<FlatList
			data={filteredPlaylists}
			renderItem={({ item: playlist }) => (
				<PlaylistListItem playlist={playlist} onPress={() => handlePlaylistPress(playlist)} />
			)}
			contentContainerStyle={{ paddingTop: 10, paddingBottom: 128 }}
			ItemSeparatorComponent={ItemDivider}
			ListFooterComponent={ItemDivider}
			ListEmptyComponent={
				<View style={utilsStyles.emptyContentContainer}>
					<Text style={utilsStyles.emptyContentTextNoResults}>No Results</Text>
				</View>
			}
			{...flatListProps}
		/>
	)
}
