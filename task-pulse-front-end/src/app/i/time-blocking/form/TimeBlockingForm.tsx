import { Button } from "@/components/ui/buttons/Button";
import { Field } from "@/components/ui/fields/Field";
import { SingleSelect } from "@/components/ui/task-edit/SingleSelect";
import type { TypeTimeBlockFormState } from "@/types/time-block.types";
import type { SubmitHandler } from "react-hook-form";
import { Controller, useFormContext } from "react-hook-form";
import { TIME_BLOCKING_COLORS } from "./colors.data";
import { useCreateTimeBlock } from "./useCreateTimeBlock";
import { useUpdateTimeBlock } from "./useUpdateTimBlock";

export function TimeBlockingForm() {
	const { register, control, watch, reset, handleSubmit } = useFormContext<TypeTimeBlockFormState>();
	const existsId = watch("id");
	const { updateTimeBlock } = useUpdateTimeBlock(existsId);
	const { createTimeBlock, isPending } = useCreateTimeBlock();

	const onSubmit: SubmitHandler<TypeTimeBlockFormState> = data => {
		const { color, id, ...rest } = data;
		const dto = { ...rest, color: color || undefined };

		if (id) {
			updateTimeBlock({
				id,
				data: dto,
			});
		} else {
			createTimeBlock(dto);
		}

		reset({
			color: TIME_BLOCKING_COLORS[TIME_BLOCKING_COLORS.length - 1],
			duration: 0,
			name: "",
			id: undefined,
			order: 1,
		});
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="w-3/5">
			<Field
				{...register("name", {
					required: true,
				})}
				id="name"
				label="Enter name:"
				placeholder="Enter name:"
				extra="mb-4"
			/>
			<Field
				{...register("duration", {
					required: true,
					valueAsNumber: true,
				})}
				id="duration"
				label="Enter duration (min.):"
				placeholder="Enter duration (min.):"
				isNumber
				extra="mb-4"
			/>
			<div>
				<span className="inline-block mb-1.5">Color:</span>
				<Controller
					control={control}
					name="color"
					render={({ field: { value, onChange } }) => (
						<SingleSelect
							data={TIME_BLOCKING_COLORS.map(item => ({
								value: item,
								label: item,
							}))}
							onChange={onChange}
							value={value || TIME_BLOCKING_COLORS[TIME_BLOCKING_COLORS.length - 1]}
							isColorSelect
						/>
					)}
				/>
			</div>
			<Button type="submit" disabled={isPending} className="mt-6">
				{existsId ? "Update" : "Create"}
			</Button>
		</form>
	);
}
