DROP INDEX "users_username_index";--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "username_normalized" varchar(32) NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_username_normalized_key" UNIQUE("username_normalized");--> statement-breakpoint
CREATE INDEX "posts_author_id_created_at_index" ON "posts" ("author_id","created_at" DESC NULLS LAST);--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "username_normalized_not_blank" CHECK (length(trim("username_normalized")) > 0);--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "username_normalized_lowercase" CHECK ("username_normalized" = lower("username_normalized"));