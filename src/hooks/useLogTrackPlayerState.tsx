import { Event, useTrackPlayerEvents } from 'react-native-track-player'

const events = [Event.PlaybackState, Event.PlaybackError, Event.PlaybackActiveTrackChanged]

export default function useLogTrackPlayerState() {
	useTrackPlayerEvents(events, async (event) => {
		if (event.type === Event.PlaybackError) {
			console.warn('An error occured: ', event)
		} else if (event.type === Event.PlaybackState) {
			console.log('Playback state: ', event.state)
		} else if (event.type === Event.PlaybackActiveTrackChanged) {
			console.log('Track changed: ', event.index)
		}
	})
}
