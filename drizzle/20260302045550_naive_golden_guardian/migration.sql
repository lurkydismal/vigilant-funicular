ALTER TABLE "posts" DROP CONSTRAINT "published_at_not_in_past";--> statement-breakpoint
ALTER TABLE "posts" DROP CONSTRAINT "published_after_scheduled";--> statement-breakpoint
ALTER TABLE "posts" DROP COLUMN "published_at";--> statement-breakpoint
ALTER TABLE "posts" ALTER COLUMN "reading_time" SET DATA TYPE smallint USING "reading_time"::smallint;