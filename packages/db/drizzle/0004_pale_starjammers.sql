CREATE TABLE IF NOT EXISTS "character_full_name" (
	"dict_key" text PRIMARY KEY NOT NULL,
	"content_fr" text NOT NULL,
	"content_ja" text NOT NULL,
	"content_en" text NOT NULL,
	"content_th" text NOT NULL,
	"content_ko" text NOT NULL,
	"content_sc" text NOT NULL,
	"content_tc" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "character" ALTER COLUMN "third_max_hp" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "character" ALTER COLUMN "third_max_sp" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "character" ALTER COLUMN "third_max_atk" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "character" ALTER COLUMN "third_max_def" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "character" ALTER COLUMN "third_max_crt" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "character" ALTER COLUMN "dash_type" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "character" ALTER COLUMN "speed" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "character" ALTER COLUMN "ex_atk_resource_3d_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "character" ALTER COLUMN "ex_cutin_resource_3d_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "character" ALTER COLUMN "character_shift_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "character" ALTER COLUMN "character_buddy_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "character" ALTER COLUMN "m_potential_material_pattern_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "character" ALTER COLUMN "m_passive_ability_group_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "character" ALTER COLUMN "m_arena_skill_group_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "character" ALTER COLUMN "m_arena_ability_group_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "character" ALTER COLUMN "profile" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "character" ALTER COLUMN "short_profile" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "character" ALTER COLUMN "ex_introduction_name" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "character" ALTER COLUMN "ex_introduction_description" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "character" ALTER COLUMN "book_order" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "character" ALTER COLUMN "stand_face" DROP NOT NULL;