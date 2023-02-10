import styles from "../styles/StarkPillCard.module.css";
import Image from "next/image";
import { STARKPILL_CONTRACT_ADDRESS } from "../types/constants";
import { shortenAddress } from "../types/utils";
import { useState } from "react";
import { EditPillModal } from "./Modals/EditPillModal";
interface Props {
  ownerAddress: string;
  imageUrl: string;
  mintPrice: string;
  tokenId: string;
  ingId?: number;
  bgId?: number;
  rank?: number;
  isOwner?: boolean;
}
export const StarkPillCard = (props: Props) => {
  const { ownerAddress, imageUrl, mintPrice, tokenId, isOwner, ingId, bgId } =
    props;
  const [showModal, setShowModal] = useState(false);
  const value = imageUrl.substring(
    imageUrl.lastIndexOf("_") + 1,
    imageUrl.lastIndexOf(".")
  );
  const ingImageId = parseInt(value.substring(0, 3));
  const bgImageId = parseInt(value.substring(3));

  const openNewTab = () => {
    if (isOwner) {
      console.log(ingId);
      console.log(bgId);
      setShowModal(true);
    } else {
      window.open(
        "https://mintsquare.io/asset/starknet-testnet/" +
          STARKPILL_CONTRACT_ADDRESS +
          "/" +
          tokenId,
        "_blank"
      );
    }
  };
  const borderColor =
    props.rank === 1 ? "#FFC107" : props.rank === 2 ? "#E0E0E0" : "#FF9838";

  return (
    <>
      <div>
        <div
          className={props.rank ? styles.cardRank : styles.card}
          onClick={openNewTab}
        >
          <Image
            src={imageUrl}
            className={props.rank ? styles.imageRank : styles.image}
            style={props.rank ? { borderColor: borderColor } : {}}
            width={300}
            height={300}
            alt=""
          ></Image>
          <div
            className={props.rank ? styles.contentRank : styles.content}
            style={props.rank ? { borderColor: borderColor } : {}}
          >
            <div className={styles.contentRankTitle}>
              TestPill #{tokenId}{" "}
              {props.rank && (
                <Image
                  src={"/svgs/medal" + props.rank + ".svg"}
                  alt=""
                  width={50}
                  height={50}
                  style={{ float: "right" }}
                ></Image>
              )}
            </div>
            <div>{Number(mintPrice) / Math.pow(10, 18)} ETH</div>
            <div>Owned By: {shortenAddress(ownerAddress)}</div>
          </div>
        </div>
      </div>
      {showModal && (
        <EditPillModal
          tokenId={Number(tokenId)}
          ingId={ingId!}
          bgId={bgId!}
          ingImageId={ingImageId}
          bgImageId={bgImageId}
          close={() => setShowModal(false)}
        />
      )}
    </>
  );
};
