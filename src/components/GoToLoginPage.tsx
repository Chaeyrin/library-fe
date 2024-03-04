import { signIn } from "next-auth/react";

export default function GoToLoginPage() {
  return (
    <div className="text-center fixed top-1/3 left-1/3">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        <div className="flex flex-r">
          <button onClick={() => signIn()}>
            You need to Login, go to login page
          </button>
        </div>
      </h2>
    </div>
  );
}
