import { redirect } from "react-router";
import { account } from "~/appwrite/client";
import { storeUserData } from "~/appwrite/auth";
export async function clientLoader({ request }: { request: Request }) {
    try {
        const url = new URL(request.url);
        const userId = url.searchParams.get("userId");
        const secret = url.searchParams.get("secret");

        if (!userId || !secret) {
            console.error("Missing userId or secret in callback URL");
            return redirect("/sign-in");
        }

        console.log("Creating session for user:", userId);
        // Create the session using the OAuth2 token
        await account.createSession({ userId, secret });

        console.log("Storing or retrieving user data...");
        const dbUser = await storeUserData();
        console.log("User data stored/retrieved:", dbUser);

        if (dbUser && dbUser.status === "admin") {
            return redirect("/dashboard");
        }

        // If the user's status is not admin, deny access immediately
        console.log("Access Denied: status is not admin. Logging out.");
        await account.deleteSession("current");
        return redirect("/sign-in?error=unauthorized");
    } catch (error) {
        console.error("Error during authentication callback:", error);
        try {
            await account.deleteSession("current");
        } catch (logoutErr) {
            // Already logged out or session expired
        }
        return redirect("/sign-in");
    }
}

export default function AuthCallback() {
    return (
        <main className="auth">
            <section className="size-full glassmorphism flex-center px-6">
                <div className="sign-in-card flex flex-col items-center justify-center gap-4 text-center">
                    <div className="relative flex items-center justify-center">
                        <div className="absolute animate-ping size-16 rounded-full bg-primary-100 opacity-20"></div>
                        <img
                            src="/assets/icons/logo.svg"
                            alt="logo"
                            className="size-14 relative z-10 animate-pulse"
                        />
                    </div>
                    <h2 className="p-28-bold text-dark-100 mt-4">Tourvisto</h2>
                    <h3 className="p-18-semibold text-primary-100">Securing your session...</h3>
                    <p className="p-14-medium text-center text-gray-100 !leading-6 max-w-sm mt-2">
                        We are verifying your credentials and redirecting you to your account.
                    </p>
                </div>
            </section>
        </main>
    );
}
