import { getCheckboxColor } from "./checkbox.utils";

// @FIXME: Refactor!!! :(
export const Checkbox = (props: {
	id?: string;
	extra?: string;
	color?:
		| "red"
		| "blue"
		| "green"
		| "yellow"
		| "orange"
		| "teal"
		| "navy"
		| "lime"
		| "cyan"
		| "pink"
		| "purple"
		| "amber"
		| "indigo"
		| "gray";
	[x: string]: any;
}) => {
	const { extra, color, id, ...rest } = props;

	return (
		<input
			id={id}
			type="checkbox"
			className={`defaultCheckbox relative inline-flex h-[20px] min-h-[20px] w-[20px] min-w-[20px] appearance-none items-center
      justify-center rounded-md border border-gray-300 text-white/0 outline-none transition ease-linear
      checked:border-none checked:text-white hover:cursor-pointer dark:border-white/10 ${getCheckboxColor(
			color,
		)} ${extra}`}
			name="weekly"
			{...rest}
		/>
	);
};
