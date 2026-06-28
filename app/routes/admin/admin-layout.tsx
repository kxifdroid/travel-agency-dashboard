import {Outlet, redirect} from "react-router";
import {SidebarComponent} from "@syncfusion/ej2-react-navigations";
import {MobileSidebar, NavItems} from "../../../components";
import {account} from "~/appwrite/client";
import {getExistingUser, storeUserData} from "~/appwrite/auth";

export async function clientLoader() {
    try {
        const user = await account.get();
        console.log("user from account.get():", user);

        if(!user.$id) return redirect('/sign-in');

        const existingUser = await getExistingUser(user.$id);
        console.log("existingUser:", existingUser);

        // Retrieve existing user or store new user data if they don't exist yet
        const dbUser = existingUser?.$id ? existingUser : await storeUserData();
        console.log("Database user info:", dbUser);

        // If the user's status is not set to admin, deny access
        if (dbUser?.status !== 'admin') {
            console.log("Access Denied: status is not admin. Logging out.");
            await account.deleteSession("current");
            return redirect('/sign-in?error=unauthorized');
        }

        return dbUser;
    } catch (e) {
        console.log('Error in clientLoader', e);
        try {
            await account.deleteSession("current");
        } catch (logoutErr) {
            // Already logged out or session expired
        }
        return redirect('/sign-in');
    }
}

const AdminLayout = () => {
    return (
        <div className="admin-layout">
            <MobileSidebar />

            <aside className="w-full max-w-[270px] hidden lg:block">
                <SidebarComponent width={270} enableGestures={false}>
                    <NavItems />
                </SidebarComponent>
            </aside>

            <aside className="children">
                <Outlet />
            </aside>
        </div>
    )
}
export default AdminLayout