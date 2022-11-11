import type { NextPage } from "next";
import Head from "next/head";
import { Address, Balance } from "../components/scaffold-eth";
import { useEffect, useState } from "react";
import { darkTheme, lightTheme, SwapWidget } from "@uniswap/widgets";
import "@uniswap/widgets/fonts.css";
import { useAccount } from "wagmi";

const darkMode = true;

const Home: NextPage = () => {
  const [showSwap, setShowSwap] = useState(false);
  const { address, isDisconnected } = useAccount();
  const [addr, setAddr] = useState<string>();

  const getProvider = async () => {
    setAddr(address);
  };

  // const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    getProvider();
    // const interval = setInterval(() => {
    //   setSeconds(seconds => seconds + 1);
    //   // getProvider();
    //   // console.log("f");
    // }, 120000);
    // return () => clearInterval(interval);
  }, []);

  return (
    <div className="">
      <Head>
        <title>Scaffold-eth App</title>
        <meta name="description" content="Created with 🏗 scaffold-eth" />
      </Head>

      <main className="flex items-center justify-center flex-col md:py-16 space-y-4 md:space-y-8 w-full">
        <div className="flex flex-col w-full md:space-y-0 items-center justify-center mx-8">
          {/* <div className="hidden md:flex md:flex-col w-full justify-center items-center">
            <div className="flex space-x-2 items-center">
              <h3 className="font-bold">Your Address</h3>
              <div className="h-2 w-2 rounded-full bg-green-500 mb-1 animate-pulse" />
            </div>
            <Address address={`${addr}`} />
          </div> */}

          {/* <div className="flex flex-col">
            <h3 className="font-bold">Address Search</h3>
            <AddressInput placeholder="Enter any address" />
          </div> */}
        </div>

        <div className="flex flex-col items-center justify-center">
          <h1 className="text-center md:my-4 text-4xl">
            <a
              className="text-blue-600 hover:underline drop-shadow-lg"
              href="https://github.com/scaffold-eth/se-2"
              target="_blank"
              rel="noreferrer"
            >
              trade-crypto.eth
            </a>
          </h1>
          <p className="text-center text-xl drop-shadow-lg cursor-default">A minimalist crypto trading site.</p>
        </div>

        <div className="grid grid-cols-1 items-center justify-center w-full md:justify-center">
          <div className="flex flex-row space-x-4 items-center">
            <div className="flex flex-col items-end w-full drop-shadow-lg">
              <h3 className="font-bold drop-shadow-lg cursor-default text-zinc-500/80">Balance</h3>
              <Balance address={`${addr}`} />
            </div>
            <div className="flex flex-col">
              <div className="flex space-x-2 items-center">
                <h3 className="font-bold drop-shadow-lg">Your Address</h3>
                <div className="h-2 w-2 rounded-full bg-green-500 mb-1 animate-pulse" />
              </div>
              <Address address={`${addr}`} />
            </div>
          </div>
          <div className="flex flex-col pt-6 justify-center w-full items-center">
            <a href={`https://buy.ramp.network/swapAsset?ARBITRUM_ETH`} target="_blank" rel="noreferrer">
              <button className="buy-btn drop-shadow-lg">Buy Ether</button>
            </a>
          </div>
        </div>

        {isDisconnected ? (
          <div className="flex flex-col items-center py-8">
            <div className="" onClick={() => setShowSwap(!showSwap)}>
              Connect Wallet to Interact
            </div>
            <p>↓</p>
          </div>
        ) : (
          <>
            <div className={showSwap ? "flex flex-col items-center my-8" : "hidden"}>
              <SwapWidget width={"300px"} className={"my-8"} theme={darkMode ? darkTheme : lightTheme} />
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
