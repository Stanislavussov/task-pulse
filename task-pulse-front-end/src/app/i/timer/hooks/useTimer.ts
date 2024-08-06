import { useEffect, useState } from "react";

import type { IPomodoroRoundResponse } from "@/types/pomodoro.types";

import type { ITimerState } from "../timer.types";

import { useLoadSettings } from "./useLoadSettings";

export function useTimer(): ITimerState {
	const { breakInterval, workInterval } = useLoadSettings();

	const [isRunning, setIsRunning] = useState(false);
	const [isBreakTime, setIsBreakTime] = useState(false);

	const [secondsLeft, setSecondsLeft] = useState(workInterval * 60);
	const [activeRound, setActiveRound] = useState<IPomodoroRoundResponse>();

	useEffect(() => {
		let interval: NodeJS.Timeout | null = null;

		if (isRunning) {
			interval = setInterval(() => {
				setSecondsLeft(secLeft => secLeft - 1);
			}, 1000);
		} else if (!isRunning && secondsLeft !== 0 && interval) {
			clearInterval(interval);
		}

		return () => {
			if (interval) clearInterval(interval);
		};
	}, [isRunning, secondsLeft, workInterval, activeRound]);

	useEffect(() => {
		if (secondsLeft > 0) return;

		// Switching the mode and setting a new time in one operation
		setIsBreakTime(!isBreakTime);
		setSecondsLeft((isBreakTime ? workInterval : breakInterval) * 60);
	}, [secondsLeft, isBreakTime, workInterval, breakInterval]);

	return {
		activeRound,
		secondsLeft,
		setActiveRound,
		setIsRunning,
		setSecondsLeft,
		isRunning,
	};
}
