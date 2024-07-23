import TrackList from '@/components/TrackList'
import { screenPadding } from '@/constants/tokens'
import { defaultStyles } from '@/styles'
import React from 'react'
import { ScrollView, View } from 'react-native'

export default function SongsScreen() {
	return (
		<View style={defaultStyles.container}>
			<ScrollView
				contentInsetAdjustmentBehavior="automatic"
				style={{ paddingHorizontal: screenPadding.horizontal }}
			>
				<TrackList scrollEnabled={false} />
			</ScrollView>
		</View>
	)
}
