import { type Dispatch, type SetStateAction } from "react";

import type { TaskResponse } from "@/types/task.types";

interface IKanbanAddCardInput {
	filterDate?: string;
	setItems: Dispatch<SetStateAction<TaskResponse[] | undefined>>;
}

export function KanbanAddCardInput({ setItems, filterDate }: IKanbanAddCardInput) {
	const addCard = () => {
		setItems(prev => {
			if (!prev) {
				return [];
			}

			return [
				...prev,
				{
					id: "",
					name: "",
					isCompleted: false,
					createdAt: filterDate,
				},
			];
		});
	};

	return (
		<div className="mt-5">
			<button type="button" onClick={addCard} className="italic opacity-40 text-sm">
				Add task...
			</button>
		</div>
	);
}
