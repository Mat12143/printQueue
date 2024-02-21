import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
    if (!locals.admin) throw redirect(303, '/');

    return {
        admin: locals.admin
    };
};
