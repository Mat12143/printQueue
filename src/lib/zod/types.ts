import z from 'zod';

const TaskSchema = z.object({
	id: z.number(),
	author: z.string(),
	createdAt: z.number(),
	notes: z.string().nullable(),
	fileName: z.string(),
	status: z.number(),
	printedAt: z.number().nullable()
});

export type Task = z.infer<typeof TaskSchema>;

export const parseTask = (task: unknown): { err: boolean; task: Task | null } => {
	const resp = TaskSchema.safeParse(task);

	if (!resp.success) return { err: true, task: null };
	return { err: false, task: resp.data };
};
