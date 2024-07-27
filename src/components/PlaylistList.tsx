import { Playlist } from '@/helpers/types'
import useNavigationSearch from '@/hooks/useNavigationSearch'
import React from 'react'
import { FlatListProps, Text, View } from 'react-native'

type PlaylistListProps = {
	playlists: Playlist[]
	onPlaylistPress: (playlist: Playlist) => void
} & Partial<FlatListProps<Playlist>>

export default function PlaylistList({
	playlists,
	onPlaylistPress: handlePlaylistPress,
	...flatListProps
}: PlaylistListProps) {
	const search = useNavigationSearch({
		searchBarOptions: { placeholder: 'Find in playlists' },
	})
    
	return (
		<View>
			<Text>PlaylistList</Text>
		</View>
	)
}
