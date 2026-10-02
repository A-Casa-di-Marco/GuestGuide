import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
export const stays = sqliteTable('guide_stays', {
 id: text('id').primaryKey(), name: text('name').notNull(),
 checkin: text('checkin').notNull().default(''), checkout: text('checkout').notNull().default(''),
 updatedAt: text('updated_at').notNull()
});
