"use server"

import { signIn, signOut } from "@/auth"

export const login = async (credentials: any) => {
    return (await signIn("credentials", credentials))
}

export const loginWithGoogle = async () => {
    return await signIn("google")
}

export const logout = async () => {
    return await signOut()
}
