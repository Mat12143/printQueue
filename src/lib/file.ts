import { writeFileSync } from 'fs';

export const generateUnique = (author: string, fileExt: string) => {
    return `${author.replaceAll(' ', '_')}_${Date.now().toString()}.${fileExt}`;
};

export const uploadFile = async (file: File, author: string) => {
    const fileExtension = file.name.split('.')[file.name.split('.').length - 1];
    const fileName = generateUnique(author, fileExtension);

    try {
        writeFileSync(`files/${fileName}`, Buffer.from(await file.arrayBuffer()));
    } catch (err) {
        console.log(err);
        return { error: true, name: null };
    }

    return { error: false, name: fileName };
};
