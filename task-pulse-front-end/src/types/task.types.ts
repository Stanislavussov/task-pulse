import type { EntityBase } from "./root.types";

// @FIXME: fuj ENUMs
export enum EnumTaskPriority {
	low = "low",
	medium = "medium",
	high = "high",
}

export interface TaskResponse extends EntityBase {
	name: string;
	isCompleted: boolean;
	priority?: EnumTaskPriority;
}

export type TypeTaskFormState = Partial<Omit<TaskResponse, "id" | "updatedAt">>;
