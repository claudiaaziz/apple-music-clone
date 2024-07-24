import { unknownArtistImageUri } from '@/constants/images'
import { colors, fontSize } from '@/constants/tokens'
import { defaultStyles } from '@/styles'
import { Entypo, Ionicons } from '@expo/vector-icons'
import React from 'react'
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import LoaderKit from 'react-native-loader-kit'
import { Track, useActiveTrack, useIsPlaying } from 'react-native-track-player'

export type TrackListItemProps = {
	track: Track
	handleTrackSelect: (track: Track) => void
}

export default function TrackListItem({ track, handleTrackSelect }: TrackListItemProps) {
	const { playing } = useIsPlaying()
	const isActiveTrack = useActiveTrack()?.url === track.url

	return (
		<TouchableHighlight onPress={() => handleTrackSelect(track)}>
			<View style={{ ...styles.trackItemContainer }}>
				<View>
					<FastImage
						source={{
							uri: track.artwork ?? unknownArtistImageUri,
							priority: FastImage.priority.normal,
						}}
						style={{ ...styles.trackArtworkImage, opacity: isActiveTrack ? 0.6 : 1 }}
					/>

					{isActiveTrack &&
						(playing ? (
							<LoaderKit
								name="LineScaleParty"
								color={colors.icon}
								style={styles.trackPlayingIconIndicator}
							/>
						) : (
							<Ionicons
								name="play"
								size={24}
								color={colors.icon}
								style={styles.trackPausedIndicator}
							/>
						))}
				</View>

				<View style={{ ...styles.trackItemBottom }}>
					<View style={{ width: '100%' }}>
						<Text
							numberOfLines={1}
							style={{
								...styles.trackTitleText,
								color: isActiveTrack ? colors.primary : colors.text,
							}}
						>
							{track.title}
						</Text>

						{track.artist && (
							<Text numberOfLines={1} style={{ ...styles.trackArtistText }}>
								{track.artist}
							</Text>
						)}
					</View>

					<Entypo name="dots-three-horizontal" size={18} color={colors.icon} />
				</View>
			</View>
		</TouchableHighlight>
	)
}

const styles = StyleSheet.create({
	trackItemContainer: {
		flexDirection: 'row',
		columnGap: 14,
		alignItems: 'center',
		paddingRight: 20,
	},
	trackArtworkImage: {
		borderRadius: 8,
		width: 50,
		height: 50,
	},
	trackPlayingIconIndicator: {
		position: 'absolute',
		top: 18,
		left: 16,
		width: 16,
		height: 16,
	},
	trackPausedIndicator: {
		position: 'absolute',
		top: 14,
		left: 14,
	},
	trackItemBottom: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	trackTitleText: {
		...defaultStyles.text,
		fontSize: fontSize.sm,
		fontWeight: '600',
		maxWidth: '90%',
	},
	trackArtistText: {
		...defaultStyles.text,
		color: colors.textMuted,
		fontSize: 14,
		marginTop: 4,
	},
})
