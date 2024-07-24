import { useEffect, useRef } from 'react'
import TrackPlayer, { RepeatMode } from 'react-native-track-player'

const setupPlayer = async () => {
	await TrackPlayer.setupPlayer({
		maxCacheSize: 1024 * 10,
	})

	await TrackPlayer.setVolume(0.03)
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
