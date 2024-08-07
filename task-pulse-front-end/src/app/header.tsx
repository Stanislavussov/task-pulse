"use client";

import { useRouter } from "next/navigation";

export default function HomeHeader() {
	const { push } = useRouter();

	const onLogin = () => {
		push("/auth");
	};

	return (
		<button type="button" onClick={onLogin}>
			Login
		</button>
	);
}
