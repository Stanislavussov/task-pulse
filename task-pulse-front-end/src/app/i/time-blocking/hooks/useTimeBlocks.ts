import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import type { TimeBlockResponse } from "@/types/time-block.types";

import { timeBlockService } from "@/services/time-block.service";

export const useTimeBlocks = () => {
	const { data, isLoading } = useQuery({
		queryKey: ["time-blocks"],
		queryFn: () => timeBlockService.getTimeBlocks(),
	});

	const [items, setItems] = useState<TimeBlockResponse[] | undefined>(data?.data);

	useEffect(() => {
		setItems(data?.data);
	}, [data?.data]);

	return { items, setItems, isLoading };
};
