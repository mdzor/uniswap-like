import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import SwapCard from "./components/swap-card";


export default async function SwapPage() {
  const session = await getServerSession(options);

  return (

    <div className="container relative  h-[600px] flex-col md:grid ">
      <div className="mx-auto flex w-full flex-col  space-y-2 ">
        <h1 className="text-center text-3xl font-bold p-4"> Swap</h1>

        {session && session.user &&
          <div className='flex items-center justify-center'>
            <div className='flex items-center py-4'>
              <div className="grid gap-2">
                <div className="grid">
                  <SwapCard/>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </div>


  )
}