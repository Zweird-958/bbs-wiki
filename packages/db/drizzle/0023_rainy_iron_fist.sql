ALTER TABLE "character" ALTER COLUMN "start_date" SET DEFAULT to_timestamp('2015-01-01', 'YYYY-MM-DD');--> statement-breakpoint
ALTER TABLE "character" ALTER COLUMN "start_date" SET NOT NULL;