CREATE TABLE IF NOT EXISTS "character_unique" (
	"id" uuid PRIMARY KEY NOT NULL,
	"character_ids" integer[] NOT NULL
);
