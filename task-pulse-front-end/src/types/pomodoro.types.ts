import type { EntityBase } from "./root.types";

export interface PomodoroRoundResponse extends EntityBase {
	isCompleted?: boolean;
	totalSeconds: number;
}

export interface PomodoroSessionResponse extends EntityBase {
	isCompleted?: boolean;
	rounds?: PomodoroRoundResponse[];
}

export type TypePomodoroSessionState = Partial<Omit<PomodoroSessionResponse, "id" | "createdAt" | "updatedAt">>;

export type TypePomodoroRoundState = Partial<Omit<PomodoroRoundResponse, "id" | "createdAt" | "updatedAt">>;
