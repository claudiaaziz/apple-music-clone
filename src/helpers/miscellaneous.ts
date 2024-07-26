export const generateTrackListId = (trackListName: string, search?: string) =>
	`${trackListName}${`-${search}` || ''}`
