CREATE TABLE IF NOT EXISTS "character_special_description" (
	"dict_key" text PRIMARY KEY NOT NULL,
	"content_ja" text,
	"content_en" text,
	"content_fr" text,
	"content_th" text,
	"content_ko" text,
	"content_sc" text,
	"content_tc" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "character_special_name" (
	"dict_key" text PRIMARY KEY NOT NULL,
	"content_ja" text,
	"content_en" text,
	"content_fr" text,
	"content_th" text,
	"content_ko" text,
	"content_sc" text,
	"content_tc" text
);
