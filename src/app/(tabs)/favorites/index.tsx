import TrackList from '@/components/TrackList'
import { screenPadding } from '@/constants/tokens'
import { trackTitleFilter } from '@/helpers/filter'
import { generateTrackListId } from '@/helpers/miscellaneous'
import useNavigationSearch from '@/hooks/useNavigationSearch'
import { useFavorites } from '@/store/library'
import { defaultStyles } from '@/styles'
import { useMemo } from 'react'
import { View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

export default function FavoritesScreen() {
	const search = useNavigationSearch({
		searchBarOptions: { placeholder: 'Find in songs' },
	})

	const favoriteTracks = useFavorites()?.favorites

	const filteredFavoriteTracks = useMemo(() => {
		if (!search) return favoriteTracks

		return favoriteTracks.filter(trackTitleFilter(search))
	}, [search, favoriteTracks])

	return (
		<View style={defaultStyles.container}>
			<ScrollView
				style={{ paddingHorizontal: screenPadding.horizontal }}
				contentInsetAdjustmentBehavior="automatic"
			>
				<TrackList
					id={generateTrackListId('favorites', search)}
					tracks={filteredFavoriteTracks}
					scrollEnabled={false}
				/>
			</ScrollView>
		</View>
	)
}
