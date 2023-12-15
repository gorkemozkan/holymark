export function formatDate(date: string) {
	return new Intl.DateTimeFormat("en-GB", {
		dateStyle: "medium"
	}).format(new Date(date));
}

export function dateDiffInDays(date1: Date, date2: Date): number {
	const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
	const diffInMilliseconds = Math.abs(date1.getTime() - date2.getTime());
	return Math.round(diffInMilliseconds / oneDay);
}
