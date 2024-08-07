import type { EntityBase } from "./root.types";

export interface TimeBlockResponse extends EntityBase {
	name: string;
	color?: string;
	duration: number;
	order: number;
}

export type TypeTimeBlockFormState = Partial<Omit<TimeBlockResponse, "createdAt" | "updatedAt">>;
