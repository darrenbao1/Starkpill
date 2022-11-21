import { useAccount, useConnectors } from "@starknet-react/core";
import { useEffect, useState } from "react";
import { shortenAddress } from "../types/utils";
import  ConnectMenuModal  from "./Modals/ConnectMenuModal";

export const ConnectWalletButton = () => {
    const { account,address } = useAccount();
    const { available, refresh } = useConnectors();
    const [showConnectMenuModal, setShowConnectMenuModal] = useState(false);
    
    //useEffect to check the available wallet user has installed
    useEffect(() => {
        const interval = setInterval(refresh, 5000);
        return () => clearInterval(interval);
      }, [refresh]);
    return (
        <>
        {!account ? <div className="connectWalletButton"
        onClick={() => setShowConnectMenuModal(true)}
        >
            connect wallet
            
        </div> : <div className="connectWalletButton">{shortenAddress(address!)}</div>}
        {showConnectMenuModal ? ( <ConnectMenuModal connectors={available} close={() => setShowConnectMenuModal(false)}/>) : null}
        </>
    )
}