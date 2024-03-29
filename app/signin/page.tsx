import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import LoginForm from "./components/login-form";
import { options } from "../api/auth/[...nextauth]/options";


type Props = {
  searchParams?: Record<"callbackUrl" | "error", string>;
};

export default async function SignIn(props: Props) {
  const session = await getServerSession(options);

  if (session && session.user?.address) {
    return redirect("/explorer");
  }



  return (

    <div className="container relative  h-[600px] flex-col   md:grid ">
      <div className="mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[350px]">
      <h1 className="text-center text-3xl font-bold p-4"> Login</h1>
        <h2 className="p4 font-medium text-center"> Login with your email and password</h2>
        <LoginForm error={props.searchParams?.error}
          callbackUrl={props.searchParams?.callbackUrl} />

      </div>
    </div>

  )
}
