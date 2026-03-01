"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { UsersRowPublic } from "@/db/types";
import log from "@/utils/stdlog";
import { isServer, storageKeys } from "@/utils/stdvar";

type AuthContextType = {
    user: UsersRowPublic | null;
    setUser: (u: UsersRowPublic | null) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<UsersRowPublic | null>(() => {
        if (isServer || !storageKeys.client) return null;

        const storageKey = storageKeys.client.authStorageKey;

        const stored = localStorage.getItem(storageKey);

        return stored ? JSON.parse(stored) : null;
    });
    const [version, setVersion] = useState(0);

    const _setUser = (u: UsersRowPublic | null) => {
        log.debug(`User before: ${user}`);

        log.debug(`Passed user: ${u}`);

        if (isServer || !storageKeys.client) return;

        const storageKey = storageKeys.client.authStorageKey;

        setUser(u);

        if (u) localStorage.setItem(storageKey, JSON.stringify(u));
        else localStorage.removeItem(storageKey);

        setVersion(v => v + 1);
    };

    useEffect(() => {
        log.debug(`User now: ${user}, version: ${version}`);
    }, [user]);

    return (
        <AuthContext.Provider value={{ user, setUser: _setUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);

    if (!ctx) throw new Error("useAuth must be used within AuthProvider");

    return ctx;
}
