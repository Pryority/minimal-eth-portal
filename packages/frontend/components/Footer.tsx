import React from "react";
import { TAutoConnect, useAutoConnect } from "~~/hooks/scaffold-eth";
import { ConnectButton } from "@rainbow-me/rainbowkit";
// import { Faucet } from "~~/components/scaffold-eth";

// todo: move this later scaffold config.  See TAutoConnect for comments on each prop
const tempAutoConnectConfig: TAutoConnect = {
  enableBurnerWallet: true,
  autoConnect: true,
};

/**
 * Site header
 */
export default function Footer() {
  useAutoConnect(tempAutoConnectConfig);

  return (
    <div className="md:py-8 pb-8 flex items-center">
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
      {/* <Faucet /> */}
    </div>
  );
}
