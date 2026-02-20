CREATE TABLE "categories" (
	"id" serial PRIMARY KEY,
	"name" varchar(50) NOT NULL UNIQUE,
	"updated_at" timestamp(0) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(0) with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "name_not_blank" CHECK (length(trim("name")) > 0)
);
--> statement-breakpoint
CREATE TABLE "follows" (
	"followerId" integer,
	"followingId" integer,
	"created_at" timestamp(0) with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "follows_pkey" PRIMARY KEY("followerId","followingId")
);
--> statement-breakpoint
CREATE TABLE "posts" (
	"id" serial PRIMARY KEY,
	"authorId" integer,
	"coAuthorId" integer,
	"categoryId" integer,
	"description" varchar(200),
	"content" text NOT NULL,
	"updated_at" timestamp(0) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(0) with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "description_not_blank" CHECK ("description" IS NULL OR length(trim("description")) > 0),
	CONSTRAINT "content_not_blank" CHECK (length(trim("content")) > 0)
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY,
	"username" varchar(32) NOT NULL UNIQUE,
	"passwordHash" text NOT NULL,
	"avatarUrl" varchar(255),
	"updated_at" timestamp(0) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(0) with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "username_not_blank" CHECK (length(trim("username")) > 0),
	CONSTRAINT "avatar_url_not_blank" CHECK ("avatarUrl" IS NULL OR length(trim("avatarUrl")) > 0)
);
--> statement-breakpoint
CREATE UNIQUE INDEX "categories_name_index" ON "categories" ("name");--> statement-breakpoint
CREATE INDEX "follows_followerId_index" ON "follows" ("followerId");--> statement-breakpoint
CREATE INDEX "follows_followingId_index" ON "follows" ("followingId");--> statement-breakpoint
CREATE INDEX "posts_authorId_index" ON "posts" ("authorId");--> statement-breakpoint
CREATE INDEX "posts_coAuthorId_index" ON "posts" ("coAuthorId");--> statement-breakpoint
CREATE INDEX "posts_categoryId_index" ON "posts" ("categoryId");--> statement-breakpoint
CREATE UNIQUE INDEX "users_username_index" ON "users" ("username");--> statement-breakpoint
ALTER TABLE "follows" ADD CONSTRAINT "follows_followerId_users_id_fkey" FOREIGN KEY ("followerId") REFERENCES "users"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "follows" ADD CONSTRAINT "follows_followingId_users_id_fkey" FOREIGN KEY ("followingId") REFERENCES "users"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "posts" ADD CONSTRAINT "posts_authorId_users_id_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE SET NULL;--> statement-breakpoint
ALTER TABLE "posts" ADD CONSTRAINT "posts_coAuthorId_users_id_fkey" FOREIGN KEY ("coAuthorId") REFERENCES "users"("id") ON DELETE SET NULL;--> statement-breakpoint
ALTER TABLE "posts" ADD CONSTRAINT "posts_categoryId_categories_id_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE SET NULL;

-- Functions
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Register triggers
CREATE TRIGGER update_categories_updated_at
BEFORE UPDATE ON "categories"
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_follows_updated_at
BEFORE UPDATE ON "follows"
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_posts_updated_at
BEFORE UPDATE ON "posts"
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at
BEFORE UPDATE ON "users"
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
