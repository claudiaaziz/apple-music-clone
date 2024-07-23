import TrackList from '@/components/TrackList'
import { defaultStyles } from '@/styles'
import React from 'react'
import { ScrollView, View } from 'react-native'

export default function SongsScreen() {
	return (
		<View style={defaultStyles.container}>
			<ScrollView>
				<TrackList />
			</ScrollView>
		</View>
	)
}
