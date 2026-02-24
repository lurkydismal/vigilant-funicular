import db from "@/db";
import { users } from "@/db/schema";
import { normalizeArrayOrValue } from "@/utils/stdfunc";
import { eq } from 'drizzle-orm';

export async function requestUserId(usernameNormalized: string) {
    "use cache";

    return (
        db
            .select({ id: users.id })
            .from(users)
            .where(eq(users.username_normalized, usernameNormalized))
            .limit(1)
            .execute()
    );
}

export async function getUserId(request: ReturnType<typeof requestUserId>) {
    const userId = normalizeArrayOrValue(await request);
    if (userId && userId.id) return userId.id;

    return null;
}

export async function requestUser(uid: string | number) {
    "use cache";

    const field = typeof uid === 'string' ? users.username_normalized : users.id;

    return (
        db
            .select({ id: users.id })
            .from(users)
            .where(eq(field, uid))
            .limit(1)
            .execute()
    );
}
