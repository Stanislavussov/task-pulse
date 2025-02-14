import { timeBlockService } from "@/services/time-block.service";
import type { TimeBlockResponse } from "@/types/time-block.types";
import type { DragEndEvent } from "@dnd-kit/core";
import { KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Dispatch, SetStateAction } from "react";

export function useTimeBlockDnd(
	items: TimeBlockResponse[] | undefined,
	setItems: Dispatch<SetStateAction<TimeBlockResponse[] | undefined>>,
) {
	const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor));

	const queryClient = useQueryClient();

	const { mutate } = useMutation({
		mutationKey: ["update order time block"],
		mutationFn: (ids: string[]) => timeBlockService.updateOrderTimeBlock(ids),
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ["time-blocks"] }).catch(console.error);
		},
	});

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;

		if (active.id !== over?.id && items) {
			const oldIndex = items.findIndex(item => item.id === active.id);
			const newIndex = items.findIndex(item => item.id === (over?.id || ""));

			if (oldIndex !== -1 && newIndex !== -1) {
				const newItems = arrayMove(items, oldIndex, newIndex);

				setItems(newItems);
				// Update the order on the server
				mutate(newItems.map(item => item.id));
			}
		}
	};

	return { handleDragEnd, sensors };
}
