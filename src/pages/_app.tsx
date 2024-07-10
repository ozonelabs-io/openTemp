import { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  RainbowKitProvider,
  getDefaultConfig,
  getDefaultWallets,
} from "@rainbow-me/rainbowkit";
import { SolanaTimeContextProvider } from "../utils/solanaTimeContext";
import WalletContextProvider from "@/utils/walletProvider";
import { bsc, mainnet } from "viem/chains";
import { publicKey } from "@metaplex-foundation/umi";
import { DataProvider, useData } from "@/utils/context";
import "@/styles/globals.css"
require("@solana/wallet-adapter-react-ui/styles.css");

interface AppContentProps {
  Component: any;
  pageProps: any;
}

export const WalletMultiButton = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

export const dummyPublicKey = publicKey("11111111111111111111111111111111");
export const API_ENDPOINT = "https://testing.ozonelabs.cloud"
const queryClient = new QueryClient();

function AppContent({ Component, pageProps }: AppContentProps) {
  let { selectedChain } = useData();

  if (!selectedChain) {
    selectedChain == "ETH";
  }
  const config = getDefaultConfig({
    appName: "My RainbowKit App",
    projectId: "5df5bf3968f5e66c1b8ca2da42fa9abf",
    chains: [selectedChain === "ETH" ? mainnet : bsc],
    ssr: true,
  });

  return (
    <WalletContextProvider>
      <WagmiProvider config={config}>
        <SolanaTimeContextProvider>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider>
              <Component {...pageProps} />
            </RainbowKitProvider>
          </QueryClientProvider>
        </SolanaTimeContextProvider>
      </WagmiProvider>
    </WalletContextProvider>
  );
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <DataProvider>
      <AppContent Component={Component} pageProps={pageProps} />
    </DataProvider>
  );
}
