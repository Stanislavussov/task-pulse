"use client";

import Loader from "@/components/ui/Loader";
import { useProfile } from "@/hooks/useProfile";

export function Statistics() {
	const { data, isLoading } = useProfile();

	if (isLoading) {
		return <Loader />;
	}

	if(!data?.statistics.length) {
		return null
	}

	return (
		<div className="grid grid-cols-4 gap-12 mt-7">
			{data.statistics.map(statistic => (
					<div
						className="bg-border/5 rounded p-layout text-center hover:-translate-y-3 transition-transform duration-500"
						key={statistic.label}
					>
						<div className="text-xl">{statistic.label}</div>
						<div className="text-3xl font-semibold">{statistic.value}</div>
					</div>
				))}
		</div>
	);
}
