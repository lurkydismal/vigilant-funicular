"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { UsersRowPublic } from "@/db/types";
import log from "@/utils/stdlog";

type AuthContextType = {
    user: UsersRowPublic | null;
    setUser: (u: UsersRowPublic | null) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<UsersRowPublic | null>(null);
    const [version, setVersion] = useState(0);

    const _setUser = (u: UsersRowPublic | null) => {
        log.debug(`User before: ${user}`);

        log.debug(`Passed user: ${u}`);

        setUser(u);

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
