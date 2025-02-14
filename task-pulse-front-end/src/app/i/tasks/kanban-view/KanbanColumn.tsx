import { Draggable, Droppable } from "@hello-pangea/dnd";
import type { Dispatch, SetStateAction } from "react";
import type { TaskResponse } from "@/types/task.types";
import { FILTERS } from "../columns.consts";
import { filterTasks } from "../filter-tasks";
import { KanbanAddCardInput } from "./KanbanAddCardInput";
import { KanbanCard } from "./KanbanCard";
import styles from "./KanbanView.module.scss";

interface IKanbanColumn {
	value: string;
	label: string;
	items: TaskResponse[] | undefined;
	setItems: Dispatch<SetStateAction<TaskResponse[] | undefined>>;
}

export function KanbanColumn({ value, items, label, setItems }: IKanbanColumn) {
	return (
		<Droppable droppableId={value}>
			{provided => (
				<div ref={provided.innerRef} {...provided.droppableProps}>
					<div className={styles.column}>
						<div className={styles.columnHeading}>{label}</div>
						{filterTasks(items, value)?.map((item, index) => (
							<Draggable key={item.id} draggableId={item.id} index={index}>
								{p => (
									<div ref={p.innerRef} {...p.draggableProps} {...p.dragHandleProps}>
										<KanbanCard key={item.id} item={item} setItems={setItems} />
									</div>
								)}
							</Draggable>
						))}
						{provided.placeholder}
						{value !== "completed" && !items?.some(item => !item.id) && (
							<KanbanAddCardInput
								setItems={setItems}
								filterDate={FILTERS[value] ? FILTERS[value].format() : undefined}
							/>
						)}
					</div>
				</div>
			)}
		</Droppable>
	);
}
