import pkg from 'log4js';
const { configure, getLogger } = pkg;

configure({
    appenders: {
        auth: { type: 'file', filename: 'logs/errors.log' }
    },
    categories: { default: { appenders: ['auth'], level: 'error' } }
});

export const authLogger = getLogger('auth');
