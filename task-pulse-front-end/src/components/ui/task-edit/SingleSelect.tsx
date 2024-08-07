import { Badge } from "@/components/ui/Badge";
import { useOutside } from "@/hooks/useOutside";
import cn from "clsx";
import { X } from "lucide-react";

export interface IOption {
	label: string;
	value: string;
}

interface ISingleSelect {
	data: IOption[];
	onChange: (value: string) => void;
	value: string;
	isColorSelect?: boolean;
}

export function SingleSelect({ data, onChange, value, isColorSelect }: ISingleSelect) {
	const { isShow, setIsShow, ref } = useOutside(false);
	const getValue = () => data.find(item => item.value === value)?.value;

	return (
		<div ref={ref} className={cn("relative min-w-36", { "w-max": isColorSelect })}>
			<button
				type="button"
				onClick={() => {
					setIsShow(!isShow);
				}}
			>
				{getValue() ? (
					<Badge
						variant={value}
						className="capitalize"
						style={isColorSelect ? { backgroundColor: value } : {}}
					>
						{getValue()}
					</Badge>
				) : (
					<Badge>Click for select</Badge>
				)}
			</button>
			{value && (
				<button
					type="button"
					className="absolute bottom-3 right-22 opacity-40 hover:opacity-100"
					onClick={() => {
						onChange("");
					}}
				>
					<X size={14} />
				</button>
			)}
			{isShow && (
				<div
					className={cn("absolute w-full p-2.5 left-0 slide bg-sidebar z-10 shadow rounded-lg")}
					style={{
						top: "calc(100% + .5rem)",
					}}
				>
					{data.map(item => (
						<button
							type="button"
							key={item.value}
							onClick={() => {
								onChange(item.value);
								setIsShow(false);
							}}
							className="block mb-4 last:mb-0 capitalize rounded-lg"
							style={isColorSelect ? { backgroundColor: item.value } : {}}
						>
							<Badge variant={item.value}>{item.label}</Badge>
						</button>
					))}
				</div>
			)}
		</div>
	);
}
