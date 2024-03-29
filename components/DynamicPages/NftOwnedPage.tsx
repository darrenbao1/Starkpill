import { Web3Button } from "@web3modal/react";
import { useAccount } from "wagmi";
import { NFTData } from "../../types/interfaces";
import { useEffect, useState } from "react";
import { getNFTs } from "../../components/Web3Wallet/api/getNFTs";
import { useRouter } from "next/router";
import { NftCard } from "../../components/Redemption/NftCard/NftCard";
import NoNftIcon from "../../public/svgs/NoNftIcon.svg";
import {
	NftOwnedPageContainer,
	ContentContainer,
	ContentWrapper,
	HeaderContainer,
	HeaderText,
	ContentText,
	ButtonContainer,
	CardContainer,
	DirectoryContainer,
	DirectoryButton,
	DirectoryArrow,
	NoNFTFoundContainer,
	NoNFTFoundText,
} from "../../styles/nftOwned.styles";
import { RightArrow } from "../../public/svgs/RightArrow";
import { useAccount as useStarknetWallet } from "@starknet-react/core";
import { Disconnected } from "../../components/DisconnectedPage.tsx/Disconnected";
import { RedemptionTraitModal } from "../../components/Modals/RedemptionTraitModal/RedemptionTraitModal";
import { COLLAB_PROJECTS } from "../../types/constants";
const NftOwnedPage = () => {
	const wallet = useAccount();
	const starknetWallet = useStarknetWallet();
	const router = useRouter();
	const { project } = router.query;
	const projectString = typeof project === "string" ? project : "";
	const [selectedTokenId, setSelectedTokenId] = useState(0);
	const projectObj = COLLAB_PROJECTS.find(
		(project) => project.contract_address === projectString
	);
	const [nfts, setNfts] = useState<NFTData[]>([]);
	const [isLoading, setIsloading] = useState<boolean>(false);
	const [showTraitModal, setShowTraitModal] = useState<boolean>(false);
	const handleGetNfts = async () => {
		if (wallet.address && project)
			try {
				setIsloading(true);
				const fetchedNfts = await getNFTs(wallet.address!, project as string);
				setNfts(fetchedNfts);
			} catch (error) {
				console.error(error);
			} finally {
				setIsloading(false);
			}
	};
	useEffect(() => {
		if (wallet.address) {
			handleGetNfts();
		} else {
			setNfts([]);
		}
	}, [wallet.isConnected, wallet.address]);
	return (
		<>
			<NftOwnedPageContainer>
				{starknetWallet.status == "connected" ? (
					<ContentContainer>
						<DirectoryContainer>
							<DirectoryButton href={"/redemption"}>Redemption</DirectoryButton>
							<DirectoryArrow>
								<RightArrow />
							</DirectoryArrow>
							Your eligible NFT redemptions
						</DirectoryContainer>
						<ContentWrapper>
							<HeaderContainer>
								<HeaderText>Your eligible NFT redemptions</HeaderText>
								<ContentText>
									Eligible NFTs are displayed, click on your NFT card to redeem
									exclusive traits.
								</ContentText>
							</HeaderContainer>
							<ButtonContainer>
								<Web3Button />
							</ButtonContainer>
						</ContentWrapper>
						{nfts.length > 0 ? (
							<CardContainer>
								{nfts.map((nft: NFTData, index) => (
									<NftCard
										nftData={nft}
										key={index}
										onClick={() => {
											setShowTraitModal(true);
											setSelectedTokenId(Number(nft.collectionTokenId));
										}}
									/>
								))}
							</CardContainer>
						) : isLoading ? (
							<NoNFTFoundContainer>
								<NoNFTFoundText>Fetching NFTs . . .</NoNFTFoundText>
							</NoNFTFoundContainer>
						) : wallet.isConnected ? (
							<NoNFTFoundContainer>
								<NoNftIcon />
								<NoNFTFoundText>
									There are no NFTs available for redemption in your account.
								</NoNFTFoundText>
							</NoNFTFoundContainer>
						) : (
							<NoNFTFoundContainer>
								<NoNftIcon />
								<NoNFTFoundText>Wallet is not connected.</NoNFTFoundText>
							</NoNFTFoundContainer>
						)}
					</ContentContainer>
				) : (
					<Disconnected text="To access your redemptions, please link your wallet first." />
				)}
			</NftOwnedPageContainer>
			{showTraitModal && (
				<RedemptionTraitModal
					project={projectObj!}
					showTraitModal={showTraitModal}
					handleClose={() => setShowTraitModal(false)}
					nftTokenId={selectedTokenId}
				/>
			)}
		</>
	);
};
export default NftOwnedPage;
