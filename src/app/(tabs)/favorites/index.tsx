import library from '@/assets/data/library.json'
import TrackList from '@/components/TrackList'
import { screenPadding } from '@/constants/tokens'
import useNavigationSearch from '@/hooks/useNavigationSearch'
import { defaultStyles } from '@/styles'
import React, { useMemo } from 'react'
import { View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

export default function FavoritesScreen() {
	const search = useNavigationSearch({
		searchBarOptions: { placeholder: 'Find in songs' },
	})
    
	const favoriteTracks = useMemo(() => {
		return library.filter((track) => track.rating)
	}, [])

	return (
		<View style={defaultStyles.container}>
			<ScrollView
				style={{ paddingHorizontal: screenPadding.horizontal }}
				contentInsetAdjustmentBehavior="automatic"
			>
				<TrackList scrollEnabled={false} tracks={favoriteTracks} />
			</ScrollView>
		</View>
	)
}
