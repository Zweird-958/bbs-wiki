DO $$ BEGIN
 CREATE TYPE "format" AS ENUM('plus', 'none', 'interval', 'percent');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "character_passive_ability" ALTER COLUMN "format" SET DATA TYPE format;