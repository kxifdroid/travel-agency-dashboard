import {type RouteConfig, route, layout, index} from "@react-router/dev/routes";

export default [
    index("routes/root/home.tsx"),
    route("auth-callback", "routes/root/auth-callback.tsx"),
    route("sign-in", 'routes/root/sign-in.tsx'),
    layout("routes/admin/admin-layout.tsx", [
        route('dashboard', 'routes/admin/dashboard.tsx'),
        route('all-users', 'routes/admin/all-users.tsx'),
    ])
]satisfies RouteConfig