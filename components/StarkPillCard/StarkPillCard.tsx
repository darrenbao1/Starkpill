import {
	NETWORK_FOR_API,
	STARKPILL_CONTRACT_ADDRESS,
} from "../../types/constants";
import { shortenAddress } from "../../types/utils";
import { useDispatch } from "react-redux";
import { EditPillModal } from "../Modals/EditPillModal";
import {
	showImageModalRedux,
	showEditPillModalRedux,
} from "../../features/refetch";
import { ImageModal } from "../Modals/ImageModal";
import KebabIcon from "../../public/svgs/kebab.svg";
import KebabIconSmall from "../../public/svgs/kebabSmall.svg";
import ExternalLinksIcon from "../../public/svgs/ExternalLinks.svg";
import PillDetailsIcon from "../../public/svgs/PillDetailsIcon.svg";
import { useState, useEffect, useCallback } from "react";
import DownloadLogo from "../../public/svgs/downloadIcon.svg";
//STYLES↓↓↓
import {
	KebabIconStyled,
	MenuOptions,
	Card,
	CardImage,
	Content,
	EditIcon,
	HeaderContainer,
	MenuOptionsWrapper,
	CardInnerContainer,
	SaveImageIcon,
} from "./StarkPillCard.styles";
import { TxHistoryModal } from "../Modals/TxHistory/TxHistoryModal";
import { saveAs } from "file-saver";

//INTERFACES↓↓↓
interface Props {
	ownerAddress: string;
	imageUrl: string;
	mintPrice: string;
	tokenId: string;
	ingId?: number;
	bgId?: number;
	rank: number;
	isOwner?: boolean;
	fame: number;
}

//MAIN FUNCTION↓↓↓
export const StarkPillCard = (props: Props) => {
	//REDUX↓↓↓
	const dispatch = useDispatch();

	//PROPS↓↓↓
	const {
		ownerAddress,
		imageUrl,
		mintPrice,
		tokenId,
		isOwner,
		ingId,
		bgId,
		rank,
		fame,
	} = props;

	//STATES↓↓↓
	const [showTxHistoryModal, setShowTxHistoryModal] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [showImageModal, setShowImageModal] = useState(false);
	const [menuId, setMenuId] = useState<string | null>(null);
	const value = imageUrl.substring(
		imageUrl.lastIndexOf("_") + 1,
		imageUrl.lastIndexOf(".")
	);

	const ingImageId = parseInt(value.substring(0, 3));
	const bgImageId = parseInt(value.substring(3));

	//Redirect user to MintSquare in a new tab when menu option External Links Option is clicked ↓↓
	const openMintSquareLink = () => {
		window.open(
			`https://mintsquare.io/asset/${NETWORK_FOR_API}/` +
				STARKPILL_CONTRACT_ADDRESS +
				"/" +
				tokenId,
			"_blank"
		);
	};
	//Display Image Modal when menu option Pill Details Option is clicked ↓↓
	const openImageModal = () => {
		setShowImageModal(true);
		dispatch(showImageModalRedux(true));
	};

	// Defining the Top3 by checking the rank ↓↓
	const isTop3 = props.rank <= 3 && props.rank > 0;

	const toggleMenu = (tokenId: any) => {
		setMenuId((prevMenuId) => {
			const newMenuId = prevMenuId === tokenId ? null : tokenId;
			const event = new CustomEvent("starkPillMenuToggle", {
				detail: newMenuId,
			});
			window.dispatchEvent(event);
			return newMenuId;
		});
	};
	// When user clicks outside the menu, close the menu ↓↓
	const handleClickOutside = (event: any) => {
		if (
			event.target.closest(MenuOptions) ||
			event.target.closest(KebabIconStyled)
		) {
			return;
		}
		setMenuId(null);
	};

	const handleMenuToggle = useCallback(
		(event: any) => {
			if (event.detail !== tokenId) {
				setMenuId(null);
			}
		},
		[tokenId]
	);

	useEffect(() => {
		document.addEventListener("click", handleClickOutside);
		window.addEventListener("starkPillMenuToggle", handleMenuToggle);
		return () => {
			document.removeEventListener("click", handleClickOutside);
			window.removeEventListener("starkPillMenuToggle", handleMenuToggle);
		};
	}, [handleMenuToggle]);
	useEffect(() => {
		dispatch(showImageModalRedux(showImageModal));
		dispatch(showEditPillModalRedux(showModal));
	}, [showModal, showImageModal]);
	const closeImageModal = () => {
		dispatch(showImageModalRedux(false));
		setShowImageModal(false);
	};
	const closeEditModal = () => {
		dispatch(showEditPillModalRedux(false));
		setShowModal(false);
	};

	const SaveImage = () => {
		saveAs(imageUrl, "image.png");
	};

	return (
		<>
			{/* Overall Card Container ↓↓ */}
			<Card isTop3={isTop3} rank={rank}>
				{/* Inner Container Wraps the Image and Details ↓↓ */}
				<CardInnerContainer>
					{/* PILL IMAGE ↓↓*/}
					<CardImage
						width={10000}
						height={10000}
						src={imageUrl}
						alt="pill"
						isTop3={isTop3}
						rank={rank}
						onClick={() => setShowImageModal(true)}
					/>
					{/* PILL DETAILS ↓↓*/}
					<Content isTop3={isTop3} rank={rank}>
						{/* Header Container Wraps Pill Number and Kebab Menu ↓↓ */}
						<HeaderContainer>
							{/* Pill Number and will display Image Modal when user clicks it ↓↓ */}
							<h1 onClick={() => setShowImageModal(true)}>
								{" "}
								TestPill #{tokenId}
							</h1>
							{/* Kebab Menu ↓↓ */}
							<KebabIconStyled
								isTop3={isTop3}
								rank={rank}
								onClick={() => toggleMenu(tokenId)}>
								{isTop3 ? <KebabIcon /> : <KebabIconSmall />}
							</KebabIconStyled>{" "}
						</HeaderContainer>

						{/* Price Of Pill ↓↓ */}
						<p>{Number(mintPrice) / Math.pow(10, 18)} ETH</p>

						{/* Fame Of Pill ↓↓ */}
						<p>{fame} Fame</p>

						{/* Owner Of Pill ↓↓ */}
						{!isOwner && <p>Owner: {shortenAddress(ownerAddress)}</p>}
					</Content>
				</CardInnerContainer>

				{menuId === tokenId && (
					<MenuOptionsWrapper isTop3={isTop3} isOwner={isOwner}>
						<MenuOptions isOwner={isOwner}>
							{/* Edit Pill Option will be shown on mypills.tsx page ↓↓ */}
							{/* Wen clicked, showModal state changes to true and EditPillModal will be displayed */}
							{isOwner && (
								<>
									<p
										onClick={() => {
											setShowModal(true);
											dispatch(showEditPillModalRedux(true));
											setMenuId(null);
										}}>
										<EditIcon /> Edit Pill{" "}
									</p>
									<p
										onClick={() => {
											SaveImage();
											setMenuId(null);
										}}>
										<SaveImageIcon /> Save Image{" "}
									</p>
								</>
							)}
							{/* Option to display Pill Details via Image Modal ↓↓ */}
							{/* Wen clicked, showImageModal state changes to true and ImageModal will be displayed */}
							<p
								onClick={() => {
									openImageModal();
									setMenuId(null);
								}}>
								<PillDetailsIcon /> Pill Details{" "}
							</p>
							{/* Option to redirect user to Mint Square ↓↓ */}
							<p
								onClick={() => {
									openMintSquareLink();
									setMenuId(null);
								}}>
								<ExternalLinksIcon /> Mint Square{" "}
							</p>
							{/* <p
								onClick={() => {
									setShowTxHistoryModal(true);
									setMenuId(null);
								}}>
								<ExternalLinksIcon /> Tx History{" "}
							</p> */}
						</MenuOptions>
					</MenuOptionsWrapper>
				)}
			</Card>
			{/* Edit Pill Modal Displayed when showModal state is set to true ↓↓ */}
			{showModal && (
				<EditPillModal
					tokenId={Number(tokenId)}
					ingId={ingId!}
					bgId={bgId!}
					ingImageId={ingImageId}
					bgImageId={bgImageId}
					close={closeEditModal}
					oldImage={imageUrl}
				/>
			)}
			{/* Image Modal Displayed when showImageModal state is set to true ↓↓ */}
			{showImageModal && (
				<ImageModal
					imageUrl={imageUrl}
					tokenId={tokenId}
					ingImageId={ingImageId}
					bgImageId={bgImageId}
					close={closeImageModal}
					fame={fame}
					ownerAddress={ownerAddress}
				/>
			)}
			{/* <TxHistoryModal
				showTxHistoryModal={showTxHistoryModal}
				tokenId={Number(tokenId)}
				close={() => setShowTxHistoryModal(false)}
			/> */}
		</>
	);
};
