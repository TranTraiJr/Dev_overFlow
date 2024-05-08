import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/"],
});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
  unstable_allowDynamic: [
    // allows a single file
    "/lib/utils.js",
    // use a glob to allow anything in the function-bind 3rd party module
    "/node_modules/function-bind/**",
  ],
};
