import axios from 'axios';
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { options } from '../auth/[...nextauth]/options';

const getToken = async () => {
  const session: any = await getServerSession(options)
  let token
  if (session && session.jwt) {
    token = session.jwt
  }
  return token
}

export async function GET(request: Request) {

  const token = await getToken()
  if (!token) {
    return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
      status: 403
    });
  }

  try {

    const cmcApiKey = process.env.CMC_API_KEY;
    const headers = {
      'X-CMC_PRO_API_KEY': cmcApiKey
    };

    const response = await axios('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', { headers, params: {limit: 2000, aux: 'platform'} });
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
