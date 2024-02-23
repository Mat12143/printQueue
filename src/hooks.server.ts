import { verifySession } from '$lib/db';

export const handle = async ({ event, resolve }) => {
	const session = event.cookies.get('session');

	if (!session) {
		event.locals.admin = false;
		return await resolve(event);
	}

	if (verifySession(session)) event.locals.admin = true;
	else event.locals.admin = false;

	const response = await resolve(event);

	return response;
};
