import cn from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";

import type { IPomodoroRoundResponse } from "@/types/pomodoro.types";

import styles from "./PomodoroRounds.module.scss";

interface IPomodoroRounds {
	rounds: IPomodoroRoundResponse[] | undefined;
	nextRoundHandler: () => void;
	prevRoundHandler: () => void;
	activeRound: IPomodoroRoundResponse | undefined;
}

export function PomodoroRounds({ rounds, nextRoundHandler, prevRoundHandler, activeRound }: IPomodoroRounds) {
	const isCanPrevRound = rounds ? rounds.some(round => round.isCompleted) : false;
	const isCanNextRound = rounds ? !rounds[rounds.length - 1].isCompleted : false;

	return (
		<div className={styles.container}>
			<button
				type="button"
				className={styles.button}
				disabled={!isCanPrevRound}
				onClick={() => (isCanPrevRound ? prevRoundHandler() : false)}
			>
				<ChevronLeft size={23} />
			</button>
			<div className={styles.roundsContainer}>
				{rounds &&
					rounds.map(round => (
						<div
							key={round.id}
							className={cn(styles.round, {
								[styles.completed]: round.isCompleted,
								[styles.active]: round.id === activeRound?.id && !round.isCompleted,
							})}
						/>
					))}
			</div>
			<button
				type="button"
				className={styles.button}
				disabled={!isCanNextRound}
				onClick={() => (isCanNextRound ? nextRoundHandler() : false)}
			>
				<ChevronRight size={23} />
			</button>
		</div>
	);
}
