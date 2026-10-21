CREATE TABLE `marco_cache` (
	`id` text PRIMARY KEY NOT NULL,
	`lang` text NOT NULL,
	`question` text NOT NULL,
	`reply` text NOT NULL,
	`model` text DEFAULT '' NOT NULL,
	`hits` integer DEFAULT 0 NOT NULL,
	`created_at` text NOT NULL
);
