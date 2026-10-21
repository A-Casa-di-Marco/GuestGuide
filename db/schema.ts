import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
export const stays = sqliteTable('guide_stays', {
 id: text('id').primaryKey(), name: text('name').notNull(),
 checkin: text('checkin').notNull().default(''), checkout: text('checkout').notNull().default(''),
 updatedAt: text('updated_at').notNull()
});
export const marcoCache = sqliteTable('marco_cache', {
 id: text('id').primaryKey(),
 lang: text('lang').notNull(),
 question: text('question').notNull(),
 reply: text('reply').notNull(),
 model: text('model').notNull().default(''),
 hits: integer('hits').notNull().default(0),
 createdAt: text('created_at').notNull()
});
