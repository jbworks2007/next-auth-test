//Without a defined matcher, this one line applies next auth to the entire project
// export { default } from "next-auth/middleware";

//Applies next-auth  only to matching routes - can be regex
// Ref: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
// export const config = { matcher: ['/user'] }
// export const config = { matcher: ["/user/:path*", "/admin/:path*"] };

// but we are using withAuth so that The pages configuration should match the same
// configuration in [...nextauth].ts. This is so that the next-auth Middleware is aware
// of your custom pages, so it won't end up redirecting to itself when an unauthenticated condition is met.
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default withAuth(
  function middleware(req: NextRequest) {
    console.log("inside middleware");
    console.log("middleware req : ", req);
    //return NextResponse
    if (
      req.nextauth.token?.role === "admin" &&
      req.nextUrl.pathname.startsWith("/admin")
    )
      return NextResponse.rewrite(new URL(req.nextUrl.pathname, req.url));
    else if (
      req.nextauth.token?.role === "user" &&
      req.nextUrl.pathname.startsWith("/user")
    )
      return NextResponse.rewrite(new URL(req.nextUrl.pathname, req.url));
    else return NextResponse.rewrite(new URL("/", req.url));
  },
  {
    callbacks: {
      authorized({ token }) {
        console.log("inside middleware callback ", token);
        return token?.role;
      },
    },
  }
);

export const config = { matcher: ["/user/:path*", "/admin/:path*"] };
