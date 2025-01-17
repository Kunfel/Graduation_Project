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
                let response = await fetch("http://localhost:5000/auth/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(credentials),
                });
                let token = await response.text();
                try {
                    let user: any = {
                        email: credentials?.email,
                        token,
                    };
                    // return user object with their profile data
                    return user
                } catch (error) {
                    throw new Error("Invalid credentials.");
                }
            },
        }),
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            async profile(profile, tokens) {
                let response = await fetch("http://localhost:5000/auth/loginWithGoogle", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        accessToken: tokens?.access_token,
                    }),
                });
                let token = await response.text();
                let user: any = {
                    email: profile?.email,
                    token,
                };
                return user;
            }
        }),
    ],
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard')
            if (isOnDashboard) {
                if (isLoggedIn) return true
                return false // Redirect unauthenticated users to login page
            } else if (isLoggedIn) {
                return Response.redirect(new URL('/dashboard', nextUrl))
            }
            return true
        },

        async jwt({ token, user }: any) {
            if (user)
                return {
                    ...token,
                    accessToken: user.token,
                };
            else return token;
        },
        async session({ session, token }) {
            return {
                ...session,
                token: JSON.parse(token.accessToken as string).access_token,
            }
        },
    },
})