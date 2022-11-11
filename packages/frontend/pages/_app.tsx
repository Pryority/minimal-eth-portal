import "~~/styles/globals.css";
import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
// import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { Gnosis, Avalanche } from "../components/CustomChains";
import type { AppProps } from "next/app";
import Footer from "~~/components/Footer";
// import Header from "~~/components/Header";

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
      // alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
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
      <RainbowKitProvider chains={chains}>
        <div className="justify-center flex flex-col w-full items-center bg-gradient-to-bl from-stone-700 via-blue-900 to-slate-600 no-scroll">
          <div className="justify-center min-h-screen flex flex-col w-5/6 items-center">
            {/* <Header /> */}
            <Component {...pageProps} />
            <Footer />
          </div>
        </div>
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default ScaffoldEthApp;
