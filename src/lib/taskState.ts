import type { Task } from './zod/types';

export const getTaskStateString = (task: Task) => {
	const status = {
		0: 'In Attesa',
		1: 'Stampato',
		2: 'Rifiutato'
	};

	if (Object.keys(status).indexOf(task.status.toString()) < 0) {
		console.log(task);
		return 'Non trovato';
	}

	// @ts-ignore
	return status[task.status];
};
