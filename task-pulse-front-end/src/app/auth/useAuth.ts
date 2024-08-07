import { DASHBOARD_PAGES } from "@/config/pages-url.config";
import { authService } from "@/services/auth.service";
import type { AuthForm } from "@/types/auth.types";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import type { UseFormReset } from "react-hook-form";
import { toast } from "sonner";
import type { AxiosError } from "axios";
import { THEME_COLORS } from "@/constants/color.constants";

export const useAuth = ({ resetForm, isLoading }: { resetForm: UseFormReset<AuthForm>; isLoading: boolean }) => {
	const { push } = useRouter();

	const { mutate: login } = useMutation({
		mutationKey: ["auth"],
		mutationFn: (data: AuthForm) => authService.main(isLoading ? "login" : "register", data),
		onSuccess() {
			toast.success("Successfully login!", {
				style: {
					backgroundColor: THEME_COLORS.success,
				},
			});
			resetForm();
			push(DASHBOARD_PAGES.HOME);
		},
		onError(error: AxiosError<{ message: string }>) {
			toast.error(error.response?.data?.message, {
				style: {
					backgroundColor: THEME_COLORS.error,
				},
			});
		},
	});

	return { login };
};
