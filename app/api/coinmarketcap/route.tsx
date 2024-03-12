import axios from 'axios';
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { options } from '../auth/[...nextauth]/options';

export async function GET(request: Request) {



  try {

    const cmcApiKey = process.env.CMC_API_KEY;
    const headers = {
      'X-CMC_PRO_API_KEY': cmcApiKey
    };

    const response = await axios('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=1000', { headers });
    const data = await response.data;

    // TODO: Save data somewhere for future caching
    // TODO: Add caching policy - this endpoint data can likely be cached 30m to 1h
    // TODO: Add retry mechanism

    return new NextResponse(JSON.stringify(data), {
      status: 200
    })
    return;
  } catch (error) {
    console.error('Error querying CoinMarketCap:', error);
    await new Promise(resolve => setTimeout(resolve, 200));
  }


  return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), {
    status: 500
  })
}
