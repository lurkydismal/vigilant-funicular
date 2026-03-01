C-- 1. Rename old type
ALTER TYPE post_visibility RENAME TO post_visibility_old;

-- 2. Create new type
CREATE TYPE post_visibility AS ENUM ('public', 'hidden', 'private');

-- 3. Update all columns using it
ALTER TABLE 'posts'
ALTER COLUMN visibility
TYPE post_visibility
USING visibility::text::post_visibility;

-- 4. Drop old type
DROP TYPE post_visibility_old;REATE TYPE "post_visibility" AS ENUM('public', 'unlisted', 'private');--> statement-breakpoint
