import { sql } from 'drizzle-orm';
import { mysqlTable, text, timestamp, varchar } from 'drizzle-orm/mysql-core';

export const blogTable = mysqlTable('blog', {
	id: varchar('id', { length: 36 })
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	title: varchar({ length: 255 }).notNull(),
	content: text().notNull(),
	createdAt: timestamp('created_at')
		.default(sql`CURRENT_TIMESTAMP`)
		.notNull(),
	updatedAt: timestamp('updated_at')
		.default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`)
		.notNull(),
});
