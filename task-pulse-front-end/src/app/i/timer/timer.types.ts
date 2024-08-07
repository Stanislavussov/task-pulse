import type { Dispatch, SetStateAction } from "react";

import type { PomodoroRoundResponse } from "@/types/pomodoro.types";

export interface TimerState {
	isRunning: boolean;
	secondsLeft: number;
	activeRound: PomodoroRoundResponse | undefined;

	setIsRunning: Dispatch<SetStateAction<boolean>>;
	setSecondsLeft: Dispatch<SetStateAction<number>>;
	setActiveRound: Dispatch<SetStateAction<PomodoroRoundResponse | undefined>>;
}
