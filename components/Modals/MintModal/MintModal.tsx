import {
	BaseMint,
	CloseButton,
	Header,
	HoverTip,
	Information,
	Item,
	ItemName,
	ItemPrice,
	ItemPriceSpan,
	ItemPriceSpan2,
	ItemsContainer,
	Label,
	MintButton,
	ModalContainer,
	ReceiptContainer,
	Stepper,
	StepperButton,
	StepperButtonContainer,
	StepperContainer,
	SubTotalBaseMint,
	SubTotalBaseMintSpan,
	TextField,
	TipContainer,
	TipText,
	Title,
	Total,
	TotalSpan,
} from "./MintModal.styles";
import InformationIcon from "../../../public/svgs/information.svg";
import SubtractIcon from "../../../public/svgs/subtractIcon.svg";

import Cross from "../../../public/svgs/cross2.svg";
import { BACKGROUND, FACE_TRAITS } from "../../../types/constants";
import { createRef, useEffect, useRef, useState } from "react";
import {
	useStarknetExecute,
	useTransactionManager,
} from "@starknet-react/core";
import { getMintVariables } from "../../../hooks/StarkPillContract";
export const MintModal = (props: {
	close: any;
	faceId: number;
	backgroundId: number;
}) => {
	const inputRef = createRef<HTMLInputElement>();
	const SubTotal = () => {
		const ingPrice = FACE_TRAITS[props.faceId].premiumPrice
			? FACE_TRAITS[props.faceId].premiumPrice!
			: 0;
		const bgPrice = BACKGROUND[props.backgroundId].premiumPrice
			? BACKGROUND[props.backgroundId].premiumPrice!
			: 0;
		//base mint price here
		const baseMint: number = 0.001;
		const [mintPrice, setMintPrice] = useState(0.0);
		const [hover, setHover] = useState(false);
		const { addTransaction } = useTransactionManager();
		const handleChange = (e: any) => {
			setMintPrice(Number(handleDecimalsOnValue(e.target.value)));
		};
		//set to limit to 3 decimal place
		function handleDecimalsOnValue(value: any) {
			const regex = /([0-9]*[\.|\,]{0,3}[0-9]{0,3})/s;
			return value.match(regex)[0];
		}
		//code to mint pill
		const mintVariables = getMintVariables(
			props.faceId,
			props.backgroundId,
			mintPrice + ingPrice + bgPrice + baseMint
		);
		const { execute: mintExecute } = useStarknetExecute({
			calls: mintVariables,
		});
		const mintPill = async () => {
			try {
				const response = await mintExecute();
				addTransaction({
					hash: response.transaction_hash,
					metadata: { transactionName: "Approve and Mint Pill" },
				});
				props.close();
			} catch (e) {
				console.log(e);
			}
		};
		const ref = useRef(null);
		useOnClickOutside(ref, () => setHover(false));
		// Hook
		function useOnClickOutside(ref: any, handler: any) {
			useEffect(
				() => {
					const listener = (event: any) => {
						// Do nothing if clicking ref's element or descendent elements
						if (!ref.current || ref.current.contains(event.target)) {
							return;
						}
						handler(event);
					};
					document.addEventListener("mousedown", listener);
					document.addEventListener("touchstart", listener);
					return () => {
						document.removeEventListener("mousedown", listener);
						document.removeEventListener("touchstart", listener);
					};
				},
				// Add ref and handler to effect dependencies
				// It's worth noting that because passed in handler is a new ...
				// ... function on every render that will cause this effect ...
				// ... callback/cleanup to run every render. It's not a big deal ...
				// ... but to optimize you can wrap handler in useCallback before ...
				// ... passing it into this hook.
				[ref, handler]
			);
		}

		return (
			<Stepper>
				<TipContainer>
					<ItemName ref={ref}>
						<TipText>
							Tip&nbsp;
							<InformationIcon
								style={
									hover
										? {
												background: "#FF4F0A",
												borderRadius: "7px",
												marginTop: "10px",
										  }
										: { marginTop: "10px" }
								}
								onClick={() => setHover(!hover)}
							/>
							{hover && (
								<HoverTip>
									If you wish to support our efforts, you can choose to pay for
									your Starkpill in any amount of ETH.
								</HoverTip>
							)}
						</TipText>
					</ItemName>
					<StepperButtonContainer>
						<StepperButton
							onClick={() => {
								inputRef.current?.stepUp();
								setMintPrice(Number(inputRef.current?.value));
							}}>
							<SubtractIcon />
						</StepperButton>
						<StepperButton
							onClick={() => {
								inputRef.current?.stepDown();
								setMintPrice(Number(inputRef.current?.value));
							}}>
							<SubtractIcon style={{ transform: "scaleY(-1)" }} />
						</StepperButton>
					</StepperButtonContainer>
					<StepperContainer>
						<TextField
							type="number"
							min={0}
							step={0.001}
							ref={inputRef}
							onChange={(e) => handleChange(e)}
							placeholder="0.00"
						/>
						<span>ETH</span>
					</StepperContainer>
				</TipContainer>
				<ReceiptContainer>
					<SubTotalBaseMint>
						<div>
							Subtotal{" "}
							<SubTotalBaseMintSpan>
								{ingPrice + bgPrice} <span>ETH</span>
							</SubTotalBaseMintSpan>
						</div>
						<BaseMint>
							Base Mint{" "}
							<SubTotalBaseMintSpan>
								{baseMint} <span>ETH</span>
							</SubTotalBaseMintSpan>
						</BaseMint>
					</SubTotalBaseMint>
					<Total>
						Total
						<TotalSpan>
							{(mintPrice + ingPrice + bgPrice + baseMint).toFixed(3)}{" "}
							<span>ETH</span>
						</TotalSpan>
						<MintButton
							onClick={async () => {
								mintPill();
							}}>
							Mint
						</MintButton>
					</Total>
				</ReceiptContainer>
			</Stepper>
		);
	};
	return (
		<ModalContainer>
			<CloseButton onClick={props.close}>
				<Cross />
			</CloseButton>
			<Header>
				<span>Mint Summary</span>
			</Header>
			<Label>Items</Label>
			<ItemsContainer>
				<Title>Ingredient</Title>
				<Item>
					<ItemName>{FACE_TRAITS[props.faceId].name}</ItemName>
					<ItemPrice>
						{BACKGROUND[props.backgroundId].premiumPrice ? (
							<ItemPriceSpan2>
								{BACKGROUND[props.backgroundId].premiumPrice}{" "}
								<ItemPriceSpan>ETH</ItemPriceSpan>
							</ItemPriceSpan2>
						) : (
							<ItemPriceSpan>- ETH</ItemPriceSpan>
						)}
					</ItemPrice>
				</Item>
			</ItemsContainer>
			<ItemsContainer>
				<Title>Background</Title>
				<Item>
					<ItemName>{BACKGROUND[props.backgroundId].name}</ItemName>
					<ItemPrice>
						{BACKGROUND[props.backgroundId].premiumPrice ? (
							<ItemPriceSpan2>
								{BACKGROUND[props.backgroundId].premiumPrice}{" "}
								<ItemPriceSpan>ETH</ItemPriceSpan>
							</ItemPriceSpan2>
						) : (
							<ItemPriceSpan>- ETH</ItemPriceSpan>
						)}
					</ItemPrice>
				</Item>
			</ItemsContainer>
			<Information>
				All minted Starkpills will be listed and ranked on our leaderboard
			</Information>
			<SubTotal />
		</ModalContainer>
	);
};
