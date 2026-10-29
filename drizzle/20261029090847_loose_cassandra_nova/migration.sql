ALTER TABLE "posts" DROP CONSTRAINT "scheduled_at_not_in_past";--> statement-breakpoint
ALTER TABLE "posts" DROP COLUMN "scheduled_at";