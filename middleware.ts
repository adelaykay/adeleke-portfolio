import { NextRequest, NextResponse } from "next/server";

/**
 * Middleware for /admin routes.
 *
 * Firebase uses client-side auth (IndexedDB persistence) — there is no
 * server-readable session cookie by default. We cannot verify auth here
 * without implementing Firebase session cookies (firebase-admin on every
 * request), which adds latency.
 *
 * Strategy: Let the middleware pass all /admin requests through.
 * The AdminLayout client component handles the auth check and redirect
 * via onAuthStateChanged — this is the correct pattern for Firebase Auth
 * with Next.js App Router.
 *
 * If you later want server-side protection, implement:
 * 1. auth.currentUser.getIdToken() on the client after login
 * 2. POST it to /api/auth/session to set an httpOnly cookie via firebase-admin
 * 3. Then check that cookie here in middleware
 */
export function middleware(_req: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
