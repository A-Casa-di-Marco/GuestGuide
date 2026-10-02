CREATE TABLE `guide_stays` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`checkin` text DEFAULT '' NOT NULL,
	`checkout` text DEFAULT '' NOT NULL,
	`updated_at` text NOT NULL
);
