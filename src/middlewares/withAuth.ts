import { getToken } from "next-auth/jwt";
import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";

// const onlyAdminPage = ["/dashboard"];
const authPage = ["/login", "/register"];

export default function withAuth(
  middleware: NextMiddleware,
  requireAuth: string[] = []
) {
  return async (req: NextRequest, next: NextFetchEvent) => {
    const pathname = req.nextUrl.pathname;

    if (requireAuth.includes(pathname)) {
      const token = await getToken({
        req,
        secret: process.env.NEXT_AUTH_SECRET,
      });

      console.log("token: ", token);

      if (!token && !authPage.includes(pathname)) {
        const url = new URL("/login", req.url);
        url.searchParams.set("callbackUrl", encodeURI(req.url));
        return NextResponse.redirect(url);
      }

      if (token) {
        if (authPage.includes(pathname)) {
          return NextResponse.redirect(new URL("/", req.url));
        }

        const logoutUrl = new URL("/login", req.url);
        return NextResponse.redirect(logoutUrl);

        // if (token.role !== "admin" && onlyAdminPage.includes(pathname)) {
        //   return NextResponse.redirect(new URL("/", req.url));
        // }
      }
    }
    return middleware(req, next);
  };
}
