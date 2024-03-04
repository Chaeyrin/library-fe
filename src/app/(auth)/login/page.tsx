import Link from "next/link";
import { FormLogin } from "./components/form-login";

export default function LoginPage() {
  return (
    <>
      <div className="h-screen lg:flex">
        <div className="w-full h-full bg-zinc-900 hidden relative lg:block lg:w-[50%] text-white">
          <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
            <div className="absolute inset-0 bg-zinc-900" />
            <div className="relative z-20 flex items-center text-lg font-medium">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-6 w-6"
              >
                <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
              </svg>
              Acme Inc
            </div>
            <div className="relative z-20 mt-auto">
              <blockquote className="space-y-2">
                <p className="text-lg">
                  &ldquo;This library has saved me countless hours of work and
                  helped me deliver stunning designs to my clients faster than
                  ever before.&rdquo;
                </p>
                <footer className="text-sm">Sofia Davis</footer>
              </blockquote>
            </div>
          </div>
        </div>
        <div className="flex w-full lg:w-[50%] h-full flex-col justify-evenly space-y-2 items-center">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Login to Dashboard
            </h1>
            <p className="text-sm text-muted-foreground">
              Please enter your account information
            </p>
          </div>
          <FormLogin />
          <div className="px-12 md:px-8 text-center text-xs md:text-sm text-muted-foreground">
            if you already have an account, please&nbsp;
            <Link className="text-blue-500 hover:underline" href="/register">
              Register
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
