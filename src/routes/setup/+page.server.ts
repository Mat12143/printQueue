import { isIstanceNew, setAdminPassword } from '$lib/db';
import { fail, redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	if (!isIstanceNew()) return { istanceNew: false };
	return { istanceNew: true };
};

export const actions = {
	setup: async ({ locals, request }) => {
		if (!isIstanceNew())
			return fail(400, {
				error: true,
				message: 'Not permitted'
			});

		const data = await request.formData();
		const password = await data.get('password');

		setAdminPassword(password);

		throw redirect(303, '/');
	}
};
