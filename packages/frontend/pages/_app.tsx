import "~~/styles/globals.css";
import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider, midnightTheme } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { Gnosis, Avalanche } from "../components/CustomChains";
import type { AppProps } from "next/app";
import Footer from "~~/components/Footer";

const ScaffoldEthApp = ({ Component, pageProps }: AppProps) => {
  const { chains, provider } = configureChains(
    [
      chain.mainnet,
      chain.polygon,
      chain.optimism,
      chain.arbitrum,
      Gnosis,
      Avalanche,
      chain.goerli,
      chain.polygonMumbai,
    ],
    [
      alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID }),
      jsonRpcProvider({ rpc: () => ({ http: "https://rpc.ankr.com/gnosis" }) }),
      publicProvider(),
    ],
  );

  const { connectors } = getDefaultWallets({
    appName: "Uniswap Crypto Trade Dapp",
    chains,
  });

  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
  });

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} theme={midnightTheme()}>
        {/* <Header /> */}
        <Component {...pageProps} />
        <Footer />
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default ScaffoldEthApp;
