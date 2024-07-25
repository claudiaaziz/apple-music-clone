import MovingText from '@/components/MovingText'
import { unknownTrackImageUri } from '@/constants/images'
import { colors, screenPadding } from '@/constants/tokens'
import { defaultStyles } from '@/styles'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useActiveTrack } from 'react-native-track-player'

export default function PlayerScreen() {
	const activeTrack = useActiveTrack()
	const { top, bottom } = useSafeAreaInsets()

	if (!activeTrack) {
		return (
			<View style={[defaultStyles.container, { justifyContent: 'center' }]}>
				<ActivityIndicator color={colors.icon} />
			</View>
		)
	}

	return (
		<View style={styles.overlayContainer}>
			<DismissPlayerSymbol />

			<View style={{ flex: 1, marginTop: top + 70, marginBottom: bottom }}>
				<View style={styles.artworkImageContainer}>
					<FastImage
						source={{
							uri: activeTrack.artwork ?? unknownTrackImageUri,
							priority: FastImage.priority.high,
						}}
						resizeMode="cover"
						style={styles.artworkImage}
					/>
				</View>

				<View style={{ flex: 1 }}>
					<View style={{ marginTop: 'auto' }}>
						<View style={{ height: 60 }}>
							<View
								style={{
									flexDirection: 'row',
									justifyContent: 'space-between',
									alignItems: 'center',
								}}
							>
								<View style={styles.trackTitleContainer}>
									<MovingText
										text={activeTrack.title ?? ''}
										animationThreshold={30}
										style={styles.trackTitleText}
									/>
								</View>
							</View>
						</View>
					</View>
				</View>
			</View>
		</View>
	)
}

const DismissPlayerSymbol = () => {
	const { top } = useSafeAreaInsets()

	return (
		<View
			style={{
				position: 'absolute',
				top: top + 8,
				left: 0,
				right: 0,
				flexDirection: 'row',
				justifyContent: 'center',
			}}
		>
			<View accessible={false} style={styles.dismissPlayerSymbol} />
		</View>
	)
}

const styles = StyleSheet.create({
	overlayContainer: {
		...defaultStyles.container,
		paddingHorizontal: screenPadding.horizontal,
		backgroundColor: 'rgba(0,0,0,0.5)',
	},
	dismissPlayerSymbol: {
		width: 50,
		height: 8,
		borderRadius: 8,
		backgroundColor: 'white',
		opacity: 0.7,
	},
	artworkImageContainer: {
		shadowOffset: {
			width: 0,
			height: 8,
		},
		shadowOpacity: 0.44,
		shadowRadius: 11.0,
		flexDirection: 'row',
		justifyContent: 'center',
		height: '45%',
	},
	artworkImage: {
		width: '100%',
		height: '100%',
		resizeMode: 'cover',
		borderRadius: 12,
	},
	trackTitleContainer: {
		flex: 1,
		overflow: 'hidden',
	},
	trackTitleText: {
		...defaultStyles.text,
		fontSize: 22,
		fontWeight: '700',
	},
})
