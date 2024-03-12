import { headers } from "next/headers";
import { TokenData } from "../components/columns";

export async function fetchTokens(): Promise<TokenData[]> {
  let response;
  try {
    response = await fetch(process.env.NEXTAUTH_URL + '/api/coinmarketcap', { next: { revalidate: 3600 } });
  } catch (error) {
    throw new Error('Failed to fetch data: ' + error);
  }

  const data = await response.json();

  if (data.error) {
    throw new Error('Failed to retrieve data ' + data.error);
  }

  const tokensList: TokenData[] = data.data.map((r: any) => {
    return {
      id: r.id,
      name: r.name,
      symbol: r.symbol,
      price: r.quote['USD'].price,
      priceChange1: r.quote['USD'].percent_change_1h,
      priceChange24:r.quote['USD'].percent_change_24h,
      volume: r.quote['USD'].volume_24h
    }
  });


  return tokensList;
}
