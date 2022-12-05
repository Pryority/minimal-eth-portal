import type { NextPage } from "next";
import Head from "next/head";
import { Address, Balance } from "../components/scaffold-eth";
import { useEffect, useState } from "react";
import { darkTheme, lightTheme, SwapWidget } from "@uniswap/widgets";
import "@uniswap/widgets/fonts.css";
import { useAccount } from "wagmi";
import Transak from "@biconomy/transak";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const darkMode = true;

const Home: NextPage = () => {
  const [showSwap, setShowSwap] = useState(false);
  const { address, isDisconnected } = useAccount();
  const [addr, setAddr] = useState<string>();

  const openTransakModule = async () => {
    const transak = new Transak("STAGING");
    transak.init();
  };

  useEffect(() => {
    const getProvider = async () => {
      setAddr(address);
    };
    getProvider();
  }, []);

  return (
    <div className="justify-center flex flex-col w-full h-screen items-center bg-gradient-to-bl from-teal-900 via-blue-900 to-slate-600 no-scroll">
      <Head>
        <title>trade-crypto.eth</title>
        <meta name="description" content="A minimalist portal to trade crypto using Ethereum" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full h-full relative">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-center md:my-4 text-4xl bg-gradient-to-br bg-clip-text text-transparent from-blue-500 via-blue-600 to-teal-600">
            trade-crypto.eth
          </h1>
          <p className="text-center text-slate-900/80 text-xl drop-shadow-lg cursor-default">
            A minimalist crypto trading site.
          </p>
        </div>

        <div className="grid grid-cols-1 items-center justify-center md:justify-center">
          <div className="flex flex-row space-x-4 items-center justify-end">
            <div className="flex flex-col items-end drop-shadow-lg">
              <Balance address={`${addr}`} />
            </div>
            <div className="flex flex-col">
              <div className="flex space-x-2 items-center">
                <h3 className="font-light cursor-default text-sm text-blue-200 drop-shadow-lg">Your Address</h3>
                <div className="h-2 w-2 rounded-full bg-green-500 mb-1 animate-pulse" />
              </div>
              <Address address={`${addr}`} />
            </div>
          </div>
          <div className="flex flex-col pt-6 justify-center w-full items-center">
            <div className="buy-btn drop-shadow-lg" onClick={openTransakModule}>
              Buy Crypto
            </div>
          </div>
        </div>

        {isDisconnected ? (
          <div className="flex flex-col items-center py-8">
            <ConnectButton
              accountStatus={{
                smallScreen: "avatar",
                largeScreen: "full",
              }}
              showBalance={true}
              chainStatus={{
                smallScreen: "icon",
                largeScreen: "icon",
              }}
            />
          </div>
        ) : (
          <>
            <div
              className={
                showSwap
                  ? "flex flex-col w-full h-full justify-center items-center absolute space-y-4 bg-black/80 z-20"
                  : "hidden"
              }
            >
              <div className="flex items-center justify-center max-w-xs">
                <SwapWidget theme={darkMode ? darkTheme : lightTheme} />
              </div>
              <div
                className="btn bg-gradient-to-br text-yellow-400 border-slate-50/20 from-yellow-900 via-orange-900 to-yellow-800 drop-shadow-lg hover:border-orange-300 hover:from-yellow-700 hover:via-yellow-700 hover:to-orange-800 hover:text-yellow-200 mb-16"
                onClick={() => setShowSwap(!showSwap)}
              >
                Cancel Swap
              </div>
            </div>
            <div className={!showSwap ? "flex flex-col items-center py-8" : "hidden"}>
              <div
                className="btn bg-gradient-to-br border-slate-50/20 from-sky-900 via-blue-900 to-sky-800 drop-shadow-lg hover:border-blue-300 hover:from-sky-700 hover:via-sky-700 hover:to-blue-800 hover:text-sky-200"
                onClick={() => setShowSwap(!showSwap)}
              >
                Swap
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Home;
