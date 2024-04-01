import { auth } from "@/src/auth/auth"
export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const apiAuthPrefix = "/api/auth";

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);

  if (isApiAuthRoute) {
    return;
  }

  if (isLoggedIn && nextUrl.pathname === '/') {
    return Response.redirect(new URL('/dashboard', nextUrl));
  }

  if (!isLoggedIn &&  nextUrl.pathname !== '/') {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return Response.redirect(new URL(
      `/?callbackUrl=${encodedCallbackUrl}`,
      nextUrl
    ));
  }
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}