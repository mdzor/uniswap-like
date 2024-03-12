'use client'

import { SessionProvider } from 'next-auth/react'
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { mainnet,polygon, optimism, arbitrum } from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";

const config = getDefaultConfig({
  appName: 'Uniswap Like',
  projectId: 'ee006708c0297ca8fe4a35f70a7262d7',
  chains: [mainnet, polygon, optimism, arbitrum],
  ssr: true, // If your dApp uses server side rendering (SSR)
});


const queryClient = new QueryClient();

type Props = {
  children?: React.ReactNode
}



export const Providers = ({ children }: Props) => {

  return (
    <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <RainbowKitProvider>
       <SessionProvider>{children}</SessionProvider>
      </RainbowKitProvider>
    </QueryClientProvider>
  </WagmiProvider>
  )

}


