"use client";

import Loader from "@/components/ui/Loader";

import { useProfile } from "@/hooks/useProfile";

export function Profile() {
	const { data, isLoading } = useProfile();

	if (isLoading) {
		return <Loader />;
	}

	return (
		<div className="absolute top-big-layout right-big-layout">
			<div className="flex items-center">
				<div className="text-right mr-3">
					<p className="font-bold -mb-1">{data?.user.name}</p>
					<p className="text-sm opacity-40">{data?.user.email}</p>
				</div>

				<div className="w-10 h-10 flex justify-center items-center text-2xl text-white bg-white/20 rounded uppercase">
					{data?.user.name?.charAt(0) || data?.user.email?.charAt(0)}
				</div>
			</div>
		</div>
	);
}
