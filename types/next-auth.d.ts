// import "next-auth";
// import { JWT } from "next-auth/jwt";

// declare module "next-auth" {
//     interface User {
//         token?: string;
//         accessToken?: string;
//     }

//     interface Session {
//         user: {
//             id?: string;
//             accessToken?: string;
//         } & DefaultSession["user"];
//         oauthAccessToken?: string;
//     }
// }

// declare module "next-auth/jwt" {
//     interface JWT {
//         oauthAccessToken?: string;
//     }
// }