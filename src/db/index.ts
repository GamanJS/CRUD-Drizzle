import { drizzle } from 'drizzle-orm/mysql2';

const db = drizzle({ connection: { uri: process.env.DATABASE_URL } });

export default db;
