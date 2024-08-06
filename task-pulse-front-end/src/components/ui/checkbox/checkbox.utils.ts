export const getCheckboxColor = (color?: string) => {
	if (!color) {
		return "checked:bg-brand-400 dark:checked:bg-brand-400";
	}

	return `checked:border-none checked:bg-${color}-500 dark:checked:bg-${color}-400`;
};
