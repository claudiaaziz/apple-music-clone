import { PropsWithChildren } from 'react'
import { View } from 'react-native'

export default function StopPropogation({ children }: PropsWithChildren) {
	return (
		<View onStartShouldSetResponder={() => true} onTouchEnd={(e) => e.stopPropagation}>
			{children}
		</View>
	)
}
