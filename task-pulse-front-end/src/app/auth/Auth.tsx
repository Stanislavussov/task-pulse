"use client";

import { Heading } from "@/components/ui/Heading";
import { Button } from "@/components/ui/buttons/Button";
import { Field } from "@/components/ui/fields/Field";
import type { AuthForm } from "@/types/auth.types";
import { useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { useAuth } from "./useAuth";

export function Auth() {
	const { register, handleSubmit, reset } = useForm<AuthForm>({
		mode: "onChange",
	});

	const [isLoading, setIsLoading] = useState(false);

	const { login } = useAuth({ resetForm: reset, isLoading });


	const onSubmit: SubmitHandler<AuthForm> = data => {
		login(data);
	};

	return (
		<div className="flex min-h-screen">
			<form className="w-1/4 m-auto shadow bg-sidebar rounded-xl p-layout" onSubmit={handleSubmit(onSubmit)}>
				<Heading title="Auth" />
				<Field
					id="email"
					label="Email:"
					placeholder="Enter email:"
					type="email"
					extra="mb-4"
					{...register("email", {
						required: "Email is required!",
					})}
				/>
				<Field
					id="password"
					label="Password: "
					placeholder="Enter password: "
					type="password"
					{...register("password", {
						required: "Password is required!",
					})}
					extra="mb-6"
				/>
				<div className="flex items-center gap-5 justify-center">
					<Button onClick={() => setIsLoading(true)}>Login</Button>
					<Button onClick={() => setIsLoading(false)}>Register</Button>
				</div>
			</form>
		</div>
	);
}
