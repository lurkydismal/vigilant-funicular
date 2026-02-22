"use client";

import { createContext, useContext, useState } from "react";
import type { UsersRowPublic } from "@/db/types";

type AuthContextType = {
    user: UsersRowPublic | null;
    setUser: (u: UsersRowPublic | null) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<UsersRowPublic | null>(null);

    return <AuthContext.Provider value={{ user, setUser }}> {children} </AuthContext.Provider>;
}

export function useAuth() {
    const ctx = useContext(AuthContext);

    if (!ctx) throw new Error("useAuth must be used within AuthProvider");

    return ctx;
}
