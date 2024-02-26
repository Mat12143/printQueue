import { isIstanceNew, setAdminPassword } from '$lib/db';
import { fail, redirect } from '@sveltejs/kit';

export const load = async () => {
	if (!isIstanceNew()) return { istanceNew: false };
	return { istanceNew: true };
};

export const actions = {
	setup: async ({ request }) => {
		if (!isIstanceNew())
			return fail(400, {
				error: true,
				message: 'Not permitted'
			});

		const data = await request.formData();
		const password = await data.get('password');

		if (!password || typeof password != 'string')
			return fail(400, {
				error: true,
				message: 'Password mancante'
			});

		setAdminPassword(password);

		throw redirect(303, '/');
	}
};
