import React from "react";

import { DataTable } from "@/components/data-table";
import { TokenData, columns } from "./columns";


async function getTokensList(): Promise<TokenData[]> {

   const res = await fetch(process.env.NEXTAUTH_URL + '/api/coinmarketcap', {
      next: { revalidate: 3600 }
   })
   .then((res) => {
      return res;
   });
   const response = await res.json()
   const tokensList = response.data.map((r: any) => {
      return {
         id: r.id,
         name: r.name,
         symbol: r.symbol,
         price: r.quote['USD'].price,
         priceChange1: r.quote['USD'].percent_change_1h,
         priceChange24:r.quote['USD'].percent_change_24h,
         volume: r.quote['USD'].volume_24h
      }
   })
   return tokensList;
}

const TokensList = async () => {
   const data = await getTokensList()


   return (

      <DataTable columns={columns} data={data} />


   );
};

export default TokensList;