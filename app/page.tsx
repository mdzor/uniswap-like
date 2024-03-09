
import { Button } from "@/components/ui/button";
import { signIn, signOut } from 'next-auth/react'
import Link from "next/link";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";


export default async function Home() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  return (
    <main className="flex min-h-screen items-center justify-center">
      {user ? (
        <div className="flex flex-col ">
           <h2 className="text-xl m-4 font-bold">Welcome to Uniswap Like</h2>
          <p>You are logged in as <b>{user.email}</b></p>
        </div>
       
      ) : (
        <div className="flex flex-col items-center justify-center gap-2 p-5 w-fit shadow-lg rounded-lg">
          <h1 className="text-2xl font-bold">Welcome</h1>
          <p className="flex gap-2">
            You must be signed in to view explorer
            
          </p>
          <p className="flex">
          <Link href="/signin">
              <span className="text-bold cursor-pointer hover:underline">
                Sign In
              </span>
            </Link>
          </p>
        </div>
      )}
    </main>
  );
}