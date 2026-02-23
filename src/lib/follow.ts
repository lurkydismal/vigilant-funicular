"use server";

import log from "@/utils/stdlog";

export async function follow(username: string) {
    log.debug(`Follow: ${username}`);
}
