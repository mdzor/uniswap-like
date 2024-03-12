

"use client";
import { useEthersSigner } from '@/lib/ethers';
import { JsonRpcProvider, SwapWidget, Theme } from '@uniswap/widgets'
import '@uniswap/widgets/fonts.css'
import { useState } from 'react';
import './swap-card.css';

if (typeof window !== "undefined") {
  // @ts-ignore
  window.Browser = {
    T: () => {
    }
  };
}

export default function SwapCard() {

  const hideConnectionUI = true;

  const [provider, setProvider] = useState<JsonRpcProvider>();
  const theme: Theme = {
    primary: '#000',
    secondary: '#666',
    interactive: '#0089EC',
    container: '#FFF',
    module: '#E7E7E7',
    accent: '#3D3B31',
    outline: '#343D3A',
    dialog: '#FFF',
    fontFamily: 'Verdana',
    borderRadius: 0.8,
  }

  useEthersSigner().then((signer) => {
    setProvider(signer?.provider as JsonRpcProvider);
  });



  return (
    <>
      {provider ? (
        <SwapWidget provider={provider} disableBranding={true} theme={theme} hideConnectionUI={hideConnectionUI} />
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