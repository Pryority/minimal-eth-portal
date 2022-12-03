import React from "react";
import { TAutoConnect, useAutoConnect } from "~~/hooks/scaffold-eth";
import { ConnectButton } from "@rainbow-me/rainbowkit";

const tempAutoConnectConfig: TAutoConnect = {
  enableBurnerWallet: true,
  autoConnect: true,
};

export default function Footer() {
  useAutoConnect(tempAutoConnectConfig);

  return (
    <div className="fixed bottom-2 items-center w-full">
      <div className="flex w-full justify-between items-center px-4">
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
        <div className="flex text-blue-500">
          <a
            className="text-blue-600 hover:underline drop-shadow-lg"
            href="https://github.com/scaffold-eth/se-2"
            target="_blank"
            rel="noreferrer"
          >
            <p>Created with 🏗 scaffold-eth</p>
          </a>
        </div>
      </div>
    </div>
  );
}
