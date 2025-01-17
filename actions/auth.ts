"use server"

import { signIn, signOut } from "@/auth"

interface SignInResponse {
    error?: string;
    url?: string;
    ok?: boolean;
}

export const login = async (credentials: any) => {
    try {
        const result = await signIn("credentials", {
            ...credentials,
            redirect: false,
        }) as SignInResponse;

        if (result?.error) {
            const errorMessage = result.error === "CredentialsSignin"
                ? "Invalid email or password"
                : result.error;
            throw new Error(errorMessage);
        }

        return result;
    } catch (error: any) {
        const errorMessage = error.message || 'An error occurred during login';
        throw new Error(errorMessage);
    }
}

export const loginWithGoogle = async () => {
    return await signIn("google")
}

export const logout = async () => {
    return await signOut()
}

export const signup = async (userData: any) => {
    try {
        const response = await fetch("http://localhost:5000/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            const error = await response.text();
            throw new Error(error || 'Signup failed');
        }

        const result = await login({
            email: userData.email,
            password: userData.password
        });

        if (!result) {
            throw new Error('Failed to login after signup');
        }

        return result;
    } catch (error: any) {
        throw new Error(error.message || 'Failed to create account');
    }
}
