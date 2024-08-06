import type { TimeBlockResponse } from "@/types/time-block.types";

export function calcHoursLeft(items: TimeBlockResponse[] | undefined) {
	const totalMinutes = items?.reduce((acc, item) => acc + item.duration, 0) || 0;
	const totalHours = Math.floor(totalMinutes / 60); // @FIXME: Check if dividing is correct
	const hoursLeft = 24 - totalHours; // Count left hours

	return { hoursLeft };
}
