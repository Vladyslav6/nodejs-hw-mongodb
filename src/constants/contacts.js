import path from 'node:path';

const cwdProcces = process.cwd();
export const PATH_DB = path.join(cwdProcces, 'src', 'db', 'db.json');
