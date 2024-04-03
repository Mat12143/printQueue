import { checkAdminPass, generateAdminCookie } from '$lib/db';
import { authLogger } from '$lib/logging';
import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
    if (locals.admin) throw redirect(303, '/');
};

export const actions = {
    login: async ({ request, cookies }) => {
        const ipv4Add = request.headers.get('x-forwarded-for');

        const formData = await request.formData();

        const password = formData.get('password');

        if (!checkAdminPass(password)) {
            authLogger.error(`${ipv4Add} failed to login with password "${password}"`);
            return {
                error: true,
                message: 'Password errata'
            };
        }

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
