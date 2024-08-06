import { DASHBOARD_PAGES } from "@/config/pages-url.config";
import { authService } from "@/services/auth.service";
import type { AuthForm } from "@/types/auth.types";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import type { UseFormReset } from "react-hook-form";
import { toast } from "sonner";

export const useAuth = ({ resetForm, isLoading }: { resetForm: UseFormReset<AuthForm>; isLoading: boolean }) => {
	const { push } = useRouter();

	const { mutate: login } = useMutation({
		mutationKey: ["auth"],
		mutationFn: (data: AuthForm) => authService.main(isLoading ? "login" : "register", data),
		onSuccess() {
			toast.success("Successfully login!");
			resetForm();
			push(DASHBOARD_PAGES.HOME);
		},
		onError() {
			toast.error("Invalid credentials!");
		},
	});

	return { login };
};
