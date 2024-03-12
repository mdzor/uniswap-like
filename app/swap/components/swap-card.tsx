"use client";
import { useEthersSigner } from '@/lib/ethers';
import { JsonRpcProvider, SwapWidget, Theme, darkTheme, lightTheme } from '@uniswap/widgets'
import '@uniswap/widgets/fonts.css'
import { useState } from 'react';
import './swap-card.css';
import { useTheme } from 'next-themes';

export default function SwapCard() {

  const {  theme } = useTheme()
console.log('them global  ', theme)
  const hideConnectionUI = true;

  const [provider, setProvider] = useState<JsonRpcProvider>();
  const themeDark: Theme = {
    ...darkTheme,
  }
  const themeLight: Theme = {
    ...lightTheme,
    accent: '#161e31',
   
  }
  useEthersSigner().then((signer) => {
    setProvider(signer?.provider as JsonRpcProvider);
  });



  return (
    <>
      {provider ? (
        <SwapWidget provider={provider} disableBranding={true} theme={theme == 'light' ? themeLight : themeDark} hideConnectionUI={hideConnectionUI} />
      ) : (
        <div className="flex flex-col items-center justify-center gap-2 p-5 w-fit shadow-lg rounded-lg">
          <h1 className="text-2xl font-bold">Connect your wallet</h1>
          <p className="flex gap-2">
            You must connect a wallet to start swapping tokens
          </p>

        </div>
      )}
    </>
  );
}