import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    const isPublicPath = path === "/login" || path === "/signup";

    const token = request.cookies.get("token")?.value || "";

    // If logged in and trying to access login/signup, redirect to profile
    if (isPublicPath && token) {
        return NextResponse.redirect(new URL("/profile", request.url));
    }

    // If not logged in and trying to access a protected route, redirect to login
    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // Otherwise, allow request to continue
    return NextResponse.next();
}

export const config = {
    matcher: ["/", "/profile", "/login", "/signup"],
};
