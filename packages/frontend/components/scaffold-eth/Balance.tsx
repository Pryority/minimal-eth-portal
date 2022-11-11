import { useEffect, useState } from "react";
import { useBalance } from "wagmi";
import { useEthPrice } from "~~/hooks/scaffold-eth";

type BalanceProps = {
  address: string;
};

/**
 * Display (ETH & USD) balance of an ETH address.
 */
export default function Balance({ address }: BalanceProps) {
  const [isEthBalance, setIsEthBalance] = useState(true);
  const [balance, setBalance] = useState<number | null>(null);

  // ToDo. We could move this to zustand state.
  const price = useEthPrice();

  const {
    data: fetchedBalanceData,
    isError,
    isLoading,
  } = useBalance({
    addressOrName: address,
    watch: true,
    // ToDo: Read this value from config. Disabled for localhost.
    cacheTime: 30_000,
  });

  const onToggleBalance = () => {
    setIsEthBalance(!isEthBalance);
  };

  useEffect(() => {
    if (fetchedBalanceData?.formatted) {
      setBalance(Number(fetchedBalanceData.formatted));
    }
  }, [fetchedBalanceData]);

  if (!address || isLoading || balance === null) {
    return (
      <div className="animate-pulse flex space-x-4 items-center cursor-default">
        <div className="rounded-md bg-slate-500 h-6 w-6 relative justify-center items-center flex">
          <div>?</div>
        </div>
        <div className="flex items-center justify-center space-y-6">
          <div className="h-2 w-28 border-4 border-slate-500  p-4 rounded-lg relative flex justify-center items-center">
            <div className="h-2 w-1/2 bg-slate-500  rounded-lg absolute justify-center items-center"></div>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className={`border-2 border-gray-400 rounded-xl p-2 flex flex-col items-center max-w-fit cursor-pointer`}>
        <div className="text-warning text-xs">Error</div>
      </div>
    );
  }

  return (
    <div
      className={`border-2 text-stone-400 hover:text-stone-200 border-gray-600 hover:border-gray-400 transition-all ease-in-out rounded-xl p-2 flex flex-col items-center max-w-fit cursor-pointer `}
      onClick={onToggleBalance}
    >
      <div className="w-full flex items-center justify-center">
        {isEthBalance ? (
          <>
            <span>{balance?.toFixed(2)}</span>
            <span className="text-xs font-bold m-1">ETH</span>
          </>
        ) : (
          <>
            <span className="text-xs font-bold m-1">$</span>
            <span>{(balance * price).toFixed(2)}</span>
          </>
        )}
      </div>
    </div>
  );
}
