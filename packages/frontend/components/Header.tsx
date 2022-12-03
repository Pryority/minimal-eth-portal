import React from "react";
import { TAutoConnect, useAutoConnect } from "~~/hooks/scaffold-eth";
import { Address, AddressInput } from "~~/components/scaffold-eth";

// todo: move this later scaffold config.  See TAutoConnect for comments on each prop
const tempAutoConnectConfig: TAutoConnect = {
  enableBurnerWallet: true,
  autoConnect: true,
};

/**
 * Site header
 */

export default function Header() {
  useAutoConnect(tempAutoConnectConfig);

  return (
    <div className="mt-16 grid md:grid-cols-2 space-y-4 md:flex-row md:space-x-4 md:space-y-0 items-center justify-center mx-8">
      <div className="hidden md:flex md:flex-col">
        <div className="flex space-x-2 items-center">
          <h3 className="font-bold cursor-default">Your Address</h3>
          <div className="h-2 w-2 rounded-full bg-green-500 mb-1 animate-pulse" />
        </div>
        <Address address={"0x0"} />
      </div>

      <div className="flex flex-col">
        <h3 className="font-bold">Address Search</h3>
        <AddressInput placeholder="Enter any address" />
      </div>
    </div>
  );
}
