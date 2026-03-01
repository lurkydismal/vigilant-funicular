DROP INDEX "categories_name_index";--> statement-breakpoint
ALTER TABLE "posts" ALTER COLUMN "description" SET DATA TYPE varchar(100) USING "description"::varchar(100);