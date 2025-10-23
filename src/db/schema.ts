import { relations, sql } from 'drizzle-orm';
import {  datetime, mysqlTable,  text,  timestamp,  varchar } from 'drizzle-orm/mysql-core';

export const usersTable = mysqlTable('user', {
  id: varchar({length: 36}).primaryKey().$defaultFn(()=> crypto.randomUUID()),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({length:255}).notNull().unique(),
  password: varchar({length:255}),
    createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at")
    .default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`)
    .notNull(),
});

export const userRelations = relations(usersTable,({many}) => ({
  blogs: many(blogTable)
}))

export const blogTable = mysqlTable('blog',{
  id: varchar({length: 255}).primaryKey().$defaultFn(()=> crypto.randomUUID()),
  name : varchar({length:255}).notNull(),
  content: text().notNull(),
  authorId:varchar("user_id", {length:36}).notNull().references(()=> usersTable.id, {onDelete:"cascade"})
})

export const blogRelations = relations(blogTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [blogTable.authorId],
    references: [usersTable.id],
  }),
}));