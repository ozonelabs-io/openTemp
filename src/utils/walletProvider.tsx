import {
  ConnectionProvider,
  WalletProvider,
  useWallet,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import * as web3 from "@solana/web3.js";
import {
  MathWalletAdapter,
  PhantomWalletAdapter,
  SafePalWalletAdapter,
  SolflareWalletAdapter,
  TrustWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { Connection, clusterApiUrl } from "@solana/web3.js";
import { useMemo } from "react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { UmiProvider } from "./UmiProvider";
import { DataProvider } from "./context";

//user defined rpc and mainnet-beta
let network = WalletAdapterNetwork.Devnet;
if (
  process.env.NEXT_PUBLIC_ENVIRONMENT === "mainnet-beta" ||
  process.env.NEXT_PUBLIC_ENVIRONMENT === "mainnet"
) {
  network = WalletAdapterNetwork.Mainnet;
}

let RPC_URL =
  "https://mainnet.helius-rpc.com/?api-key=c7cb47d4-2d54-4651-889c-f57e47450023";

let CONNRPC =
  "https://mainnet.helius-rpc.com/?api-key=c7cb47d4-2d54-4651-889c-f57e47450023";

if (process.env.NEXT_PUBLIC_RPC) {
  RPC_URL = process.env.NEXT_PUBLIC_RPC;
  CONNRPC = RPC_URL;
}

if (process.env.NEXT_CONNECTION_PUBLIC_RPC) {
  CONNRPC = process.env.NEXT_CONNECTION_PUBLIC_RPC;
}

export const connection = new Connection(CONNRPC);

const WalletContextProvider = ({ children }: { children: React.ReactNode }) => {
  const endpoint = RPC_URL;

  const wallets = useMemo(
    () => [
      new SafePalWalletAdapter(),
      new SolflareWalletAdapter(),
      new MathWalletAdapter(),
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [network]
  );

  return (
    <WalletProvider wallets={wallets} autoConnect>
      <UmiProvider endpoint={endpoint}>
        <WalletModalProvider>{children}</WalletModalProvider>
      </UmiProvider>
    </WalletProvider>
  );
};

export default WalletContextProvider;
