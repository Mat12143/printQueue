import { parseTask } from '$lib/zod/types';
import Database from 'better-sqlite3';
import type { Task } from '$lib/zod/types';

const db = new Database('./database.db');

const TableSchema = `
CREATE TABLE IF NOT EXISTS Tasks(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    author TEXT,
    createdAt INTEGER,
    notes TEXT,
    fileName TEXT,
    status INTEGER,
    printedAt INTEGER
);

CREATE TABLE IF NOT EXISTS Admin (
    password TEXT,
    cookieAuth TEXT
)
`;

db.exec(TableSchema);

export const createTask = async (author: string, file: string, note: string) => {
    const nowTime = Date.now();

    const resp = db
        .prepare(
            `INSERT INTO Tasks (author, fileName, notes, createdAt, status) VALUES (?, ?, ?, ?, ?)`
        )
        .run(author, file, note, nowTime, 0);

    if (resp?.changes) return true;
    else return false;
};

export const getAllWaitingTasks = async () => {
    const tasks: Task[] = new Array<Task>();

    const data = db
        .prepare('SELECT * FROM Tasks WHERE Tasks.status = 0 ORDER BY Tasks.createdAt ASC')
        .all();

    data.forEach((d) => {
        const resp = parseTask(d);
        if (!resp.err && resp.task != null) tasks.push(resp.task);
    });

    return tasks;
};

export const getAllCompletedTasks = async () => {
    const tasks: Task[] = new Array<Task>();

    const data = db
        .prepare('SELECT * FROM Tasks WHERE Tasks.status != 0 ORDER BY Tasks.printedAt ASC')
        .all();

    data.forEach((d) => {
        const resp = parseTask(d);

        if (!resp.err && resp.task != null) tasks.push(resp.task);
    });

    return tasks;
};

export const isIstanceNew = () => {
    const data = db.prepare('SELECT * FROM Admin').all();

    if (data.length == 0) return true;
    else return false;
};

export const setAdminPassword = (password: string) => {
    const resp = db.prepare(`INSERT INTO Admin (password) VALUES (?)`).run(password);

    if (resp?.changes) return true;
    else return false;
};
