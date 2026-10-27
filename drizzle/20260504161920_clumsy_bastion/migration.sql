ALTER TABLE "posts" DROP CONSTRAINT "description_not_blank";--> statement-breakpoint
ALTER TABLE "posts" DROP CONSTRAINT "content_not_blank";--> statement-breakpoint
ALTER TABLE "posts" DROP CONSTRAINT "title_not_blank";--> statement-breakpoint
ALTER TABLE "posts" ADD CONSTRAINT "title_longer_than_10" CHECK (length(trim("title")) > 10);--> statement-breakpoint
ALTER TABLE "posts" ADD CONSTRAINT "description_longer_than_10" CHECK ("description" IS NULL OR length(trim("description")) > 10);--> statement-breakpoint
ALTER TABLE "posts" ADD CONSTRAINT "content_longer_than_100" CHECK (length(trim("content")) > 100);