import { redirect } from "react-router";
import { account } from "~/appwrite/client";
import { getExistingUser } from "~/appwrite/auth";

export async function clientLoader() {
    try {
        const user = await account.get();
        if (!user || !user.$id) {
            return redirect("/sign-in");
        }

        const existingUser = await getExistingUser(user.$id);
        console.log("Home loader - existingUser:", existingUser);

        if (existingUser?.status === "admin") {
            return redirect("/dashboard");
        }

        // If the user's status is not set to admin, deny access immediately
        console.log("Access Denied: status is not admin. Logging out.");
        await account.deleteSession("current");
        return redirect("/sign-in?error=unauthorized");
    } catch (e) {
        console.log("Guest or error in home loader, redirecting to sign-in:", e);
        try {
            await account.deleteSession("current");
        } catch (logoutErr) {
            // Already logged out or session expired
        }
        return redirect("/sign-in");
    }
}

export default function Home() {
    return null;
}
