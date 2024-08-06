import debounce from "lodash.debounce";
import { useCallback, useEffect } from "react";
import type { UseFormWatch } from "react-hook-form";

import type { TypeTaskFormState } from "@/types/task.types";

import { useCreateTask } from "./useCreateTask";
import { useUpdateTask } from "./useUpdateTask";

interface IUseTaskDebounce {
	watch: UseFormWatch<TypeTaskFormState>;
	itemId: string;
}

export function useTaskDebounce({ watch, itemId }: IUseTaskDebounce) {
	const { createTask } = useCreateTask();
	const { updateTask } = useUpdateTask();

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const debouncedCreateTask = useCallback(
		debounce((formData: TypeTaskFormState) => {
			createTask(formData);
		}, 444),
		[],
	);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const debouncedUpdateTask = useCallback(
		debounce((formData: TypeTaskFormState) => {
			updateTask({ id: itemId, data: formData });
		}, 444),
		[],
	);

	useEffect(() => {
		const { unsubscribe } = watch(formData => {
			if (itemId) {
				debouncedUpdateTask({
					...formData,
					priority: formData.priority || undefined,
				});
			} else {
				debouncedCreateTask(formData);
			}
		});

		return () => {
			unsubscribe();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [watch(), debouncedUpdateTask, debouncedCreateTask]);
}
