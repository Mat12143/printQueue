import { PrismaClient } from '@prisma/client';
import type { PrintTask } from '@prisma/client';

const prisma = new PrismaClient();

export const createTask = async (author: string, file: string, note: string) => {
    await prisma.printTask.create({
        // @ts-ignore
        data: {
            author: author,
            file: file,
            note: note
        }
    });
};

export const getAllWaitingTasks = async () => {
    const query: PrintTask[] = await prisma.printTask.findMany({
        where: {
            status: {
                equals: 0
            }
        },
        orderBy: [{ createdAt: 'asc' }],
        take: 10
    });

    return query;
};

export const getAllCompletedTasks = async () => {
    const query: PrintTask[] = await prisma.printTask.findMany({
        where: {
            status: {
                not: 0
            }
        },
        orderBy: [{ createdAt: 'asc' }],
        take: 4
    });

    return query;
};
