"use client";

import { Button } from "@/components/ui/buttons/Button";
import { Loader, Pause, Play, RefreshCcw } from "lucide-react";
import { formatTime } from "../format-time";
import { useCreateSession } from "../hooks/useCreateSession";
import { useDeleteSession } from "../hooks/useDeleteSession";
import { useTimer } from "../hooks/useTimer";
import { useTimerActions } from "../hooks/useTimerActions";
import { useTodaySession } from "../hooks/useTodaySession";
import { PomodoroRounds } from "../rounds/PomodoroRounds";

export function Pomodoro() {
	const timerState = useTimer();
	const { isLoading, session, workInterval } = useTodaySession(timerState);

	const rounds = session?.rounds;
	const actions = useTimerActions({ ...timerState, rounds });

	const { isPending, mutate } = useCreateSession();
	const { deleteSession, isDeletePending } = useDeleteSession(() => timerState.setSecondsLeft(workInterval * 60));

	if (isLoading) {
		return (
			<div className="relative w-80 text-center">
				<Loader />
			</div>
		);
	}

	if (session) {
		return (
			<div className="relative w-80 text-center">
				<div className="text-7xl font-semibold">{formatTime(timerState.secondsLeft)}</div>
				<PomodoroRounds
					rounds={rounds}
					nextRoundHandler={actions.nextRoundHandler}
					prevRoundHandler={actions.prevRoundHandler}
					activeRound={timerState.activeRound}
				/>
				<button
					type="button"
					className="mt-6 opacity-80 hover:opacity-100 transition-opacity"
					onClick={timerState.isRunning ? actions.pauseHandler : actions.playHandler}
					disabled={actions.isUpdateRoundPending}
				>
					{timerState.isRunning ? <Pause size={30} /> : <Play size={30} />}
				</button>
				<button
					type="button"
					onClick={() => {
						timerState.setIsRunning(false);
						deleteSession(session.id);
					}}
					className="absolute top-0 right-0 opacity-40 hover:opacity-90 transition-opacity"
					disabled={isDeletePending}
				>
					<RefreshCcw size={19} />
				</button>
			</div>
		);
	}

	return (
		<div className="relative w-80 text-center">
			<Button onClick={() => mutate()} className="mt-1" disabled={isPending}>
				Create session
			</Button>
		</div>
	);
}
