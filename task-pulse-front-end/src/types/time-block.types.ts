import type { IBase } from "./root.types";

export interface TimeBlockResponse extends IBase {
	name: string;
	color?: string;
	duration: number;
	order: number;
}

export type TypeTimeBlockFormState = Partial<Omit<TimeBlockResponse, "createdAt" | "updatedAt">>;
