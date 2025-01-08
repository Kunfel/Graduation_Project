import NextAuth from "next-auth"
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                let user: any = {
                    id: "jksehdfhisd23",
                    email: credentials.email,
                }

                if (!user) {
                    // No user found, so this is their first attempt to login
                    // Optionally, this is also the place you could do a user registration
                    throw new Error("Invalid credentials.")
                }

                // return user object with their profile data
                return user
            },
        }),
        Google
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            let domain = user?.email?.split("@")[1]
            if (domain === "gmail.com") return true
            return false
        },
        async jwt({ token, user, account, profile, isNewUser }) {
            return {
                ...token,
                id: "11",
                accessToken: "passkey",
            };
        },
        async session({ session, token, user }) {
            return {
                ...session,
                id: token.id,
                token: token.accessToken,
            }
        },
    },
})