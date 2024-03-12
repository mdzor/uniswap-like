import React from "react";

import { DataTable } from "@/components/data-table";
import { TokenData, columns } from "./columns";
import { fetchTokens } from "../services/fetchTokens";



const TokensList = async () => {
   let error;
   const data = await fetchTokens().catch((e) => {
      error = e;
      console.log('Error', e );
   });

   return (

      <>
         {error &&
            <div className="text-red-500 text-center">Failed to retrieve data</div>}
         {!error && data &&
            <DataTable columns={columns} data={data} />

         }

      </>


   );
};

export default TokensList;