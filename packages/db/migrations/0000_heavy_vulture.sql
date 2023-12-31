CREATE TABLE IF NOT EXISTS "character" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"full_name" text NOT NULL,
	"name_phonetic" text NOT NULL,
	"variation" text,
	"chara_identity_id" text NOT NULL,
	"resource_2d_id" text NOT NULL,
	"resource_3d_id" text NOT NULL,
	"disable_chara_image_drop_shadow" integer NOT NULL,
	"rarity" integer NOT NULL,
	"character_category" text NOT NULL,
	"character_element" integer NOT NULL,
	"is_resurrect" integer NOT NULL,
	"init_hp" integer NOT NULL,
	"init_sp" integer NOT NULL,
	"init_atk" integer NOT NULL,
	"init_def" integer NOT NULL,
	"init_crt" integer NOT NULL,
	"first_max_hp" integer NOT NULL,
	"first_max_sp" integer NOT NULL,
	"first_max_atk" integer NOT NULL,
	"first_max_def" integer NOT NULL,
	"first_max_crt" integer NOT NULL,
	"second_max_hp" integer NOT NULL,
	"second_max_sp" integer NOT NULL,
	"second_max_atk" integer NOT NULL,
	"second_max_def" integer NOT NULL,
	"second_max_crt" integer NOT NULL,
	"third_max_hp" integer,
	"third_max_sp" integer,
	"third_max_atk" integer,
	"third_max_def" integer,
	"third_max_crt" integer,
	"dash_type" text,
	"speed" integer,
	"character_attack_group_id_normal" integer NOT NULL,
	"character_attack_group_id_heavy1" integer NOT NULL,
	"character_attack_group_id_heavy2" integer NOT NULL,
	"character_attack_group_id_heavy3" integer NOT NULL,
	"character_attack_group_id_ex" integer NOT NULL,
	"ex_atk_resource_3d_id" text,
	"ex_cutin_resource_3d_id" text,
	"character_shift_id" integer,
	"character_buddy_id" integer,
	"killer_type1" text,
	"killer_type2" text,
	"max_ex_gauge" integer NOT NULL,
	"m_soul_piece_pattern_id" integer NOT NULL,
	"m_potential_material_pattern_id" integer,
	"m_passive_ability_group_id" integer,
	"m_arena_skill_group_id" integer,
	"m_arena_ability_group_id" integer,
	"profile" text,
	"short_profile" text,
	"ex_introduction_name" text,
	"ex_introduction_description" text,
	"book_order" integer,
	"start_date" timestamp DEFAULT to_timestamp('2015-01-01', 'YYYY-MM-DD') NOT NULL,
	"stand_animation_state" text,
	"quest_start_voice_event" text,
	"stand_face" integer,
	"image_scale" integer NOT NULL,
	"gacha_message_bank_event" text,
	"gacha_message_direction" text,
	"gacha_message_dict_key" text,
	"gacha_particle_pattern" text,
	"background_image_path" text,
	"disable_unlock_item" integer,
	"potential_point" integer,
	"boost_gauge_trigger" text,
	"m_boost_gauge_ability_group_id" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "character_full_name" (
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
CREATE TABLE IF NOT EXISTS "character_unique" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"character_ids" integer[] NOT NULL,
	"rarities" integer[] NOT NULL,
	"rarities_resurrect" integer[],
	CONSTRAINT "character_unique_character_ids_unique" UNIQUE("character_ids")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "character_variation" (
	"dict_key" text PRIMARY KEY NOT NULL,
	"content_ja" text,
	"content_en" text,
	"content_fr" text,
	"content_th" text,
	"content_ko" text,
	"content_sc" text,
	"content_tc" text
);
