import { colors, fontSize } from '@/constants/tokens'
import { StyleSheet } from 'react-native'

export const defaultStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background,
	},
	text: {
		fontSize: fontSize.base,
		color: colors.text,
	},
})

export const utilsStyles = StyleSheet.create({
	centeredRow: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	itemSeparator: {
		borderColor: colors.textMuted,
		borderWidth: StyleSheet.hairlineWidth,
		opacity: 0.3,
	},
	emptyContentContainer: {
		marginTop: 200,
	},
	emptyContentTextNoResults: {
		...defaultStyles.text,
		textAlign: 'center',
		fontWeight: 'bold',
		fontSize: 26,
		marginBottom: 10,
	},
	emptyContentTextTryANewSearch: {
		...defaultStyles.text,
		fontSize: 20,
		color: colors.textMuted,
		textAlign: 'center',
	},
})
