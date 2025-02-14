import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import type { TypeUserForm } from "@/types/auth.types";

import { userService } from "@/services/user.service";

export function useUpdateSettings() {
	const queryClient = useQueryClient();

	const { mutate: updateSettings, isPending } = useMutation({
		mutationKey: ["update profile"],
		mutationFn: (data: TypeUserForm) => userService.update(data),
		onSuccess() {
			toast.success("Successfully update profile!");
			queryClient.invalidateQueries({ queryKey: ["profile"] }).catch(console.error);
		},
	});

	return { updateSettings, isPending };
}
