ALTER TABLE "posts" DROP CONSTRAINT "preview_url_not_blank";--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "content_warning" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "visibility" "post_visibility" DEFAULT 'Public'::"post_visibility" NOT NULL;--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "scheduled_at" timestamp(0) with time zone DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "published_at" timestamp(0) with time zone DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "posts" ADD COLUMN "reading_time" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "posts" DROP COLUMN "preview_url";--> statement-breakpoint
ALTER TABLE "posts" ADD CONSTRAINT "scheduled_at_not_in_past" CHECK ("scheduled_at" >= NOW());--> statement-breakpoint
ALTER TABLE "posts" ADD CONSTRAINT "published_at_not_in_past" CHECK ("published_at" >= NOW());--> statement-breakpoint
ALTER TABLE "posts" ADD CONSTRAINT "published_after_scheduled" CHECK ("published_at" >= "scheduled_at");--> statement-breakpoint
ALTER TABLE "posts" ADD CONSTRAINT "reading_time_not_blank" CHECK ("reading_time" > 0);