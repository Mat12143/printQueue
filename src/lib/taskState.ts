import type { PrintTask } from '@prisma/client';

export const getTaskStateString = (task: PrintTask) => {
    const status = {
        0: 'In Attesa',
        1: 'Stampato',
        2: 'Rifiutato'
    };

    if (Object.keys(status).indexOf(task.status.toString()) < 0) {
        console.log(task);
        return 'Non trovato';
    }

    // @ts-ignore
    return status[task.status];
};
