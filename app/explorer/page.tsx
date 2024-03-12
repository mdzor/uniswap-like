
import TokenList from "./components/tokens-list";
import { options } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export default async function Explorer() {
  const session = await getServerSession(options);


  return (

    <div className="container relative  h-[600px] flex-col md:grid ">
    <div className="mx-auto flex w-full flex-col  space-y-2 ">
      <h1 className="text-center text-3xl font-bold p-4"> Token Explorer</h1>

        <div className='mx-auto w-full relative '>
       
                {session &&
                  <TokenList />

                }
             
        </div>

        </div>
    </div>

  )
}
