export const handle = async ({ event, resolve }) => {
	event.locals.admin = true;
	const response = await resolve(event);

	return response;
};
