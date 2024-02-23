import { redirect } from '@sveltejs/kit';

export const load = async ({ locals, cookies }) => {
	if (!locals.admin) throw redirect(303, '/');

	cookies.delete('session', {
		path: '/',
		secure: false
	});

	throw redirect(303, '/');
};
