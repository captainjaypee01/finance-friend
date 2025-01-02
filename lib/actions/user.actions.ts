'use server'

import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../server/appwrite";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { APPWRITE_SESSION_KEY } from "@/constants";
import { parseStringify } from "../utils";

export const signIn = async ({ email, password }: signInProps) => {
    try {
        // Mutation, Database, fetch
        const { account } = await createAdminClient();

        const session = await account.createEmailPasswordSession(email, password);

        (await cookies()).set(APPWRITE_SESSION_KEY, session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });

        return parseStringify(session)
    } catch (error) {
        console.error('Error', error);

    }
}

export const signUp = async (userData: SignUpParams) => {
    try {
        const { email, password, firstName, lastName } = userData;
        const name = `${firstName} ${lastName}`;

        const { account } = await createAdminClient();

        const newUserAccount = await account.create(ID.unique(), email, password, name);

        const session = await account.createEmailPasswordSession(email, password);

        (await cookies()).set(APPWRITE_SESSION_KEY, session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });

        return parseStringify(newUserAccount)
    } catch (error) {
        console.error("Error", error)
    }
}

export async function getLoggedInUser() {
    try {
        const { account } = await createSessionClient();

        const user = await account.get();
        return parseStringify(user);
    } catch (error) {
        console.error("Error", error)
        return null;
    }
}

export const logoutAccount = async () => {
    try {
        const { account } = await createSessionClient();

        (await cookies()).delete(APPWRITE_SESSION_KEY);

        await account.deleteSession('current');
    } catch (error) {
        console.error('Error', error)
        return null;
    }
}