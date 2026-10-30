import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import auth from "@/lib/auth";

export async function proxy(request: NextRequest) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        return NextResponse.redirect(new URL("/landing", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|auth|landing).*)"], // Specify the routes the middleware applies to
};
