// import type { NextAuthConfig } from 'next-auth'

// export const authConfig = {
//     pages: {
//         signIn: '/login',
//     },
//     providers: [], // This is required by NextAuthConfig
//     callbacks: {
//         authorized({ auth, request: { nextUrl } }) {
//             const isLoggedIn = !!auth?.user
//             const isOnDashboard = nextUrl.pathname.startsWith('/dashboard')

//             if (isOnDashboard) {
//                 if (isLoggedIn) return true
//                 return false
//             } else if (isLoggedIn) {
//                 return Response.redirect(new URL('/dashboard', nextUrl))
//             }
//             return true
//         },

//         async jwt({ token, user, account, profile, isNewUser }) {
//             // Persist the OAuth access_token to the token right after signin
//             if (account && account.provider === 'oauth') {
//                 token.oauthAccessToken = account.access_token
//             }
//             return token
//         },
//         async session({ session, token }) {
//             // Send properties to the client, like an access_token from a provider.
//             session.oauthAccessToken = token.oauthAccessToken
//             return session
//         },
//     },
//     jwt: {
//         maxAge: 15 * 24 * 30 * 60, // 15 days
//     },
//     session: {
//         strategy: 'jwt',
//     },
// } satisfies NextAuthConfig

// export const authUrl = process.env.AUTH_URL || 'http://localhost:5000'