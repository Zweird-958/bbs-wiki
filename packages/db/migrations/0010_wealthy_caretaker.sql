CREATE TABLE IF NOT EXISTS "character_gauge_ability" (
	"id" integer PRIMARY KEY NOT NULL,
	"group_id" integer,
	"priority" integer,
	"type" text,
	"description" text,
	"parameter" integer,
	"format" "format",
	"start_date" timestamp,
	"end_date" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "character_gauge_ability_name" (
	"dict_key" text PRIMARY KEY NOT NULL,
	"content_ja" text,
	"content_en" text,
	"content_fr" text,
	"content_th" text,
	"content_ko" text,
	"content_sc" text,
	"content_tc" text
);
