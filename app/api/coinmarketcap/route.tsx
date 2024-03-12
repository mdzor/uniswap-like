import axios from 'axios';
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { options } from '../auth/[...nextauth]/options';

export async function GET(request: Request) {


  const session = await getServerSession(options);
  if (!session) { 
    return new NextResponse(JSON.stringify({error: 'Unauthorized'}), {  
      status: 401
    });
  }

  try {

    const cmcApiKey = process.env.CMC_API_KEY;
    const headers = {
      'X-CMC_PRO_API_KEY': cmcApiKey
    };

    const response = await axios('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=1000', { headers });
    const data = await response.data;

    return new NextResponse(JSON.stringify(data), {
      status: 200
    })
  } catch (error) {
    return new NextResponse(JSON.stringify({error: error}), {
      status: 500
    })
  }


 
}
