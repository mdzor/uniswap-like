import { DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
    username: string,
    address?: string,
}

/* extend the detailsls of Session if needed */
declare module "next-auth" {
    interface Session {
        user: ExtendedUser
    }
}

/* extend the detials of JWT if needed */
declare module "@auth/core/jwt" {
    interface JWT {
        username: string,
        address?: string,
    }
}

/* extend the detials of JWT if needed */
declare module "@uniswap/sdk-core" {
    interface Token {
        logoURI?: string
    }
}