import { useEffect, useRef } from 'react'
import TrackPlayer, { Capability, RatingType, RepeatMode } from 'react-native-track-player'

const setupPlayer = async () => {
	await TrackPlayer.setupPlayer({
		maxCacheSize: 1024 * 10,
	})

	await TrackPlayer.updateOptions({
		ratingType: RatingType.Heart,
		capabilities: [
			Capability.Play,
			Capability.Pause,
			Capability.SkipToNext,
			Capability.SkipToPrevious,
			Capability.Stop,
		],
	})

	await TrackPlayer.setVolume(0.5)
	await TrackPlayer.setRepeatMode(RepeatMode.Queue)
}

export default function useSetupTrackPlayer({ onload }: { onload?: () => void }) {
	const isInitialized = useRef(false)

	useEffect(() => {
		setupPlayer()
			.then(() => {
				isInitialized.current = true
				onload?.()
			})
			.catch((err) => {
				isInitialized.current = false
				console.error(err)
			})
	}, [onload])
}
