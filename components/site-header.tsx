"use client";
import Link from "next/link"

import { siteConfig } from "@/configs/site"
import { Button } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { signOut, useSession } from "next-auth/react"
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect } from "react";
import { useAccount } from "wagmi";


export  function SiteHeader() {
  const { isConnected, address } = useAccount();
  const { data: session } = useSession();
  const user = session?.user || null;

  useEffect(() => {
    if(isConnected){
      if (session?.user?.email && session.user?.address !== address) {
        try {
          // Check if user session contains an address
          if (!session.user.address) {
            // Extend user using Prisma
            fetch('/api/user', {
              method: 'POST',
              body: JSON.stringify({  email: session.user.email, address: address }),
          }).then((res) => {
            if (res.status === 200) {
              console.log("User address updated successfully");
            } else {
              console.error("Failed to update user address: ", res.statusText);
            }

          });
          }
        } catch (error) {
          console.error("Failed to update user address: ", error);
        }
      }
    }

  }, [ isConnected])
 

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-8">
          <nav className="flex items-center space-x-1">
            {user && user.email &&
              <>

                <ConnectButton chainStatus="icon" />

                  <Button onClick={() => signOut({callbackUrl: '/'})} >
                    Sign Out
                  </Button>



              </>}
            {!user &&
              <>
                <Button variant="outline" asChild>
                  <Link href="/signin" >Sign In</Link>
                </Button>
              </>}
            <ThemeToggle />

          </nav>
        </div>
      </div>
    </header>
  )
}