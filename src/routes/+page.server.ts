import { allowedExtensions } from '$lib/const';
import { createTask, getAllCompletedTasks, getAllWaitingTasks, isIstanceNew } from '$lib/db';
import { uploadFile } from '$lib/file';
import { fail, redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	if (isIstanceNew()) throw redirect(303, '/setup');
	const waiting = await getAllWaitingTasks();
	const completed = await getAllCompletedTasks();

	return {
		completed: completed,
		waiting: waiting,
		admin: locals.admin
	};
};

export const actions = {
	create: async ({ request }) => {
		const data = await request.formData();

		const author = data.get('author');
		const note = data.get('note');
		const file = data.get('file');

		if (!author || !file || file.name == undefined) {
			return fail(400, {
				error: true,
				message: 'Controlla di aver inserito tutti i dati'
			});
		}

		const fileExtension = file.name.split('.')[file.name.split('.').length - 1];

		if (!allowedExtensions.includes(fileExtension))
			return fail(400, {
				error: true,
				message: 'File non supportato'
			});

		const fileUploadResp = await uploadFile(file, author);
		if (fileUploadResp.error || fileUploadResp.name == null)
			return fail(400, {
				error: true,
				message: 'Errore nel caricamento del file. Riprovare'
			});

		await createTask(author, fileUploadResp.name, note);

		return {
			error: false,
			message: null
		};
	}
};
