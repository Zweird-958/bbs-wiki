CREATE TABLE IF NOT EXISTS "character_passive_ability" (
	"id" integer PRIMARY KEY NOT NULL,
	"group_id" integer,
	"priority" integer,
	"sort_order_passive_ability_filter" integer,
	"passive_ability_filter_release_date" timestamp,
	"type" text,
	"view_parameter" numeric,
	"format" text,
	"description" text,
	"parameter_name1" text,
	"parameter1" numeric,
	"parameter_name2" text,
	"parameter2" numeric,
	"parameter_name3" text,
	"parameter3" numeric
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "character_passive_ability_description" (
	"dict_key" text PRIMARY KEY NOT NULL,
	"content_ja" text,
	"content_en" text,
	"content_fr" text,
	"content_th" text,
	"content_ko" text,
	"content_sc" text,
	"content_tc" text
);
