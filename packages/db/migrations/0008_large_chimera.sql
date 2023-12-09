ALTER TYPE "format" ADD VALUE 'plus_sec';--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "character_ability_priority" (
	"id" integer PRIMARY KEY NOT NULL,
	"priority" integer,
	"sort_order" integer,
	"sort_order_link_skill_filter" integer,
	"sort_order_evolve_skill_type" integer,
	"sort_order_ability_filter" integer,
	"ability_filter_release_date" timestamp,
	"type" text,
	"description" text,
	"description2" text,
	"format" "format"
);
