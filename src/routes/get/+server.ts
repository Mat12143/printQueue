import { error } from '@sveltejs/kit';
import { existsSync, readFileSync } from 'fs';

export async function GET({ url }) {
	let fileName = url.searchParams.get('file');

	const path = `./files/${fileName}`;
	if (!existsSync(path)) return error(404);

	const data = readFileSync(path);

	const fileExtension = fileName.split('.')[fileName.split('.').length - 1];

	return new Response(data, {
		status: 200,
		headers: {
			'Content-Type': `application/${fileExtension}`,
			'Content-Disposition': 'attachment; filename=' + fileName,
			'Content-Length': data.length.toString()
		}
	});
}
