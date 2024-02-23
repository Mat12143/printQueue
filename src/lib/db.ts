import { parseTask } from '$lib/zod/types';
import bcrypt from 'bcrypt';
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
    cookieAuth TEXT,
    cookieCreated INTEGER
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
	const hashedPassword = bcrypt.hashSync(password, 10);
	const resp = db.prepare(`INSERT INTO Admin (password) VALUES (?)`).run(hashedPassword);

	if (resp?.changes) return true;
	else return false;
};

export const verifySession = (cookie: string) => {
	const admin: any = db.prepare('SELECT cookieCreated FROM Admin WHERE cookieAuth = ?').get(cookie);

	if (admin == undefined) return false;

	if (Object.keys(admin).includes('cookieCreated') == false) return false;

	const nowTime = Date.now();

	const diff = nowTime - admin['cookieCreated'];

	console.log(diff);

	if (diff > 3600000 * 24) return false;

	return true;
};

export const checkAdminPass = (password: string) => {
	const resp: any = db.prepare('SELECT password FROM Admin LIMIT 1').get();

	if (resp == undefined) return false;

	if (Object.keys(resp).includes('password') == false) return false;

	const adminPwd = resp['password'];

	if (!bcrypt.compareSync(password, adminPwd)) return false;

	return true;
};

export const generateAdminCookie = () => {
	const cookie = crypto.randomUUID();

	const resp = db
		.prepare('UPDATE Admin SET cookieAuth = ?, cookieCreated = ? WHERE 1 = 1')
		.run(cookie, Date.now());

	if (resp.changes == 0) return { err: true, cookie: null };
	return { err: false, cookie: cookie };
};
