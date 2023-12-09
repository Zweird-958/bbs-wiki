CREATE TABLE IF NOT EXISTS "character_ability_status" (
	"id" integer PRIMARY KEY NOT NULL,
	"group_id" integer,
	"priority" integer,
	"status_up_type" text,
	"effect_amount" integer,
	"effect_time" integer,
	"description" text
);
