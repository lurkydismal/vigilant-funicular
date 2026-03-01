CREATE TYPE "post_visibility" AS ENUM('public', 'unlisted', 'private');--> statement-breakpoint
ALTER TABLE "posts" ALTER COLUMN "visibility" SET DEFAULT 'public'::"post_visibility";
