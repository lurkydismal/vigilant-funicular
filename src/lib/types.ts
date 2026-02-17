import z from "zod";
import { table } from "@/db/schema";

export const TABLES = {
    table: table,
} as const;

export type DbTarget = keyof typeof TABLES;

export const DbTargetSchema = z.enum(
    Object.keys(TABLES) as [DbTarget, ...DbTarget[]],
);

export function parseRawTarget(rawTarget: DbTarget) {
    const target = DbTargetSchema.parse(rawTarget);
    const table = TABLES[target];
    if (!table) {
        throw new Error("Invalid db target in get");
    }

    return table;
}

type SuccessResult<T> = { ok: true; data: T };
type FailureResult = { ok: false; error: string };

export type ActionResult<T> = SuccessResult<T> | FailureResult;
