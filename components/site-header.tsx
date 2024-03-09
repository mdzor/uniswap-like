"use client";
import Link from "next/link"

import { siteConfig } from "@/configs/site"
import { Button, buttonVariants } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import { signOut, useSession } from "next-auth/react"


export  function SiteHeader() {


  const { data: session } = useSession();
  const user = session?.user || null;


 

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            {user && user.email &&
              <>
                  <Button onClick={() => signOut({callbackUrl: '/'})} >
                    Sign Out
                  </Button>

                  {!user.address && 
                    <Button  variant="outline">Connect wallet first</Button>
                  }

              </>}
            {!user &&
              <>
                <Button  variant="outline" asChild>
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