import { checkAdminPass, generateAdminCookie } from '$lib/db';
import { fail, redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	if (locals.admin) throw redirect(303, '/');
};

export const actions = {
	login: async ({ request, cookies }) => {
		const formData = await request.formData();

		const password = formData.get('password');

		if (!password || typeof password != 'string')
			return {
				error: true,
				message: 'Password errata'
			};

		if (!checkAdminPass(password))
			return {
				error: true,
				message: 'Password errata'
			};

		const resp = generateAdminCookie();
		if (resp.err || !resp.cookie)
			return {
				error: true,
				message: 'Errore nel login'
			};

		cookies.set('session', resp.cookie, {
			path: '/',
			sameSite: 'strict',
			httpOnly: true,
			maxAge: 60 * 60 * 24,
			secure: false
		});

		throw redirect(303, '/');
	}
};
