import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import { pomodoroService } from "@/services/pomodoro.service";
import type { TimerState } from "../timer.types";

import { useLoadSettings } from "./useLoadSettings";

export function useTodaySession({ setActiveRound, setSecondsLeft }: TimerState) {
	const { workInterval } = useLoadSettings();

	const {
		data: session,
		isLoading,
		isSuccess,
	} = useQuery({
		queryKey: ["get today session"],
		queryFn: () => pomodoroService.getTodaySession(),
	});

	const rounds = session?.data.rounds;

	useEffect(() => {
		if (isSuccess && rounds) {
			const activeRound = rounds.find(round => !round.isCompleted);

			setActiveRound(activeRound);

			if (activeRound && activeRound?.totalSeconds !== 0) {
				setSecondsLeft(activeRound.totalSeconds);
			}
		}
	}, [isSuccess, rounds, setActiveRound, setSecondsLeft]);

	return { session: session?.data, isLoading, workInterval };
}
