import { isIstanceNew } from '$lib/db';
import { fail, redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	if (!locals.admin) return redirect(303, '/');
	if (!isIstanceNew()) return redirect(303, '/');
};

export const actions = {
	default: async ({ locals, request }) => {
		if (!locals.admin)
			return fail(400, {
				error: true,
				message: 'Not permitted'
			});
		if (!isIstanceNew())
			return fail(400, {
				error: true,
				message: 'Not permitted'
			});

		const data = await request.formData();
		const password = await data.get('password');
	}
};
