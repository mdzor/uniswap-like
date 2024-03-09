import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import LoginForm from "./components/login-form";
import { authOptions } from "../api/auth/[...nextauth]/route";


type Props = {
  searchParams?: Record<"callbackUrl" | "error", string>;
};

export default async function SignIn(props: Props) {
  const session = await getServerSession(authOptions);

  if (session && session.user?.address) {
    return redirect("/explorer");
  }



  return (

    <div className="container relative  h-[600px] flex-col items-center justify-center md:grid ">
      <div className="mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[350px]">
        <h1 className="p4 font-bold text-center"> Login with your email and password</h1>
        <LoginForm error={props.searchParams?.error}
          callbackUrl={props.searchParams?.callbackUrl} />

      </div>
    </div>

  )
}
