const Gnosis = {
  id: 100,
  name: "Gnosis",
  network: "Gnosis",
  nativeCurrency: {
    decimals: 18,
    name: "xDai",
    symbol: "xDai",
  },
  rpcUrls: {
    default: "https://rpc.ankr.com/gnosis",
  },
  blockExplorers: {
    default: { name: "Blockscout", url: "https://blockscout.com/xdai/mainnet" },
  },
  iconUrl: "https://images.prismic.io/koinly-marketing/16d1deb7-e71f-48a5-9ee7-83eb0f7038e4_Gnosis+Chain+Logo.png",
  testnet: false,
};

const Avalanche = {
  id: 43_114,
  name: "Avalanche",
  network: "avalanche",
  nativeCurrency: {
    decimals: 18,
    name: "Avalanche",
    symbol: "AVAX",
  },
  rpcUrls: {
    default: "https://api.avax.network/ext/bc/C/rpc",
  },
  blockExplorers: {
    default: { name: "SnowTrace", url: "https://snowtrace.io" },
  },
  testnet: false,
};

module.exports = { Gnosis, Avalanche };
