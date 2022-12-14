import { connectorsForWallets, wallet } from "@rainbow-me/rainbowkit";
import { configureChains, chain } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

/**
 * chains for the app
 */
export const appChains = configureChains(
  [
    chain.mainnet,
    chain.polygon,
    chain.optimism,
    chain.arbitrum,
    chain.hardhat,
    chain.localhost,
    chain.polygon,
    // todo replace with config instead of env
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true"
      ? [chain.goerli, chain.kovan, chain.rinkeby, chain.ropsten, chain.polygonMumbai]
      : []),
  ],
  [
    alchemyProvider({
      // ToDo. Move to .env || scaffold config
      // This is ours Alchemy's default API key.
      // You can get your own at https://dashboard.alchemyapi.io
      apiKey: process.env.ALCHEMY_ID,
    }),
    publicProvider(),
  ],
);

/**
 * list of burner wallet compatable chains
 */
export const burnerChains = configureChains(
  [chain.localhost, chain.hardhat],
  [
    alchemyProvider({
      // ToDo. Move to .env || scaffold config
      // This is ours Alchemy's default API key.
      // You can get your own at https://dashboard.alchemyapi.io
      apiKey: process.env.ALCHEMY_ID,
    }),
    publicProvider(),
  ],
);

/**
 * wagmi connectors for the wagmi context
 */
export const wagmiConnectors = connectorsForWallets([
  {
    groupName: "Supported Wallets",
    wallets: [
      wallet.metaMask({ chains: appChains.chains, shimDisconnect: true }),
      wallet.walletConnect({ chains: appChains.chains }),
      wallet.ledger({ chains: appChains.chains }),
      wallet.brave({ chains: appChains.chains }),
      wallet.coinbase({ appName: "scaffold-eth", chains: appChains.chains }),
      wallet.rainbow({ chains: appChains.chains }),
    ],
  },
]);
