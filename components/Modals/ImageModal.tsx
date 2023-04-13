import styles from "../../styles/ImageModal.module.css";
import Image from "next/image";
import Cross from "../../public/svgs/cross2.svg";
import { createRef, useState } from "react";
import { BACKGROUND, FACE_TRAITS } from "../../types/constants";
import { useRef, useEffect } from "react";
import { getVotingPower, shortenAddress } from "../../types/utils";
import ConnectMenuModal from "./ConnectMenuModal";
import {
	useAccount,
	useConnectors,
	useStarknetExecute,
	useTransactionManager,
} from "@starknet-react/core";
import { getFameOrDefameVariables } from "../../hooks/StarkPillContract";

interface Props {
	imageUrl: string;
	tokenId: string;
	close: () => void;
	ingImageId: number;
	bgImageId: number;
	fame: number;
	ownerAddress: string;
}
export const ImageModal = (props: Props) => {
	const inputRef = createRef<HTMLInputElement>();
	const { account, address } = useAccount();
	const { available } = useConnectors();
	const [showConnectMenuModal, setShowConnectMenuModal] = useState(false);
	const [fameValue, setFameValue] = useState(0);
	const [radioButtonIsSelected, setRadioButtonIsSelected] = useState(false); // this is the state that will be used to determine whether the fame or defame radio button is selected
	const [selectedRadioButton, setSelectedRadioButton] = useState(""); //this is the state that will be used to determine whether the fame or defame radio button is selected
	const [votingPower, setVotingPower] = useState(0);
	const isValidRadioButton =
		selectedRadioButton === "fame" || selectedRadioButton === "defame";
	async function fetchData() {
		const res = await getVotingPower(address!);
		setVotingPower(res);
	}
	const handleChange = (event: any) => {
		if (account) {
			setSelectedRadioButton(event.target.id);
			setRadioButtonIsSelected(true);
			fetchData();
		} else {
			setSelectedRadioButton(event.target.id);
			setShowConnectMenuModal(true);
		}
	};
	const { imageUrl, tokenId, close, ingImageId, bgImageId } = props;
	const modalRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (modalRef.current && event.target === modalRef.current) {
				close();
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [close]);
	useEffect(() => {
		if (account && isValidRadioButton) {
			setRadioButtonIsSelected(true);
			fetchData();
		}
	}, [account]);

	const handleManualInput = (e: any) => {
		const value = Number(handleDecimalsOnValue(e.target.value));
		if (value > votingPower) {
			setFameValue(votingPower);
			return;
		} else {
			setFameValue(value);
		}
	};
	//set to limit to 0 decimal place
	function handleDecimalsOnValue(value: any) {
		const regex = /([0-9]*[\.|\,]{0,1}[0-9]{0,0})/s;
		return value.match(regex)[0];
	}
	const fameOrDefameVariables = getFameOrDefameVariables(
		selectedRadioButton,
		Number(props.tokenId),
		fameValue
	);
	const { addTransaction } = useTransactionManager();
	const { execute } = useStarknetExecute({
		calls: fameOrDefameVariables,
	});
	const fameOrDefame = async () => {
		try {
			const response = await execute();
			addTransaction({
				hash: response.transaction_hash,
				metadata: { transactionName: selectedRadioButton + ": " + fameValue },
			});
			props.close();
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<div ref={modalRef} className={styles.modal}>
			<div className={styles.container}>
				<Image
					src={imageUrl}
					className={styles.modal_content}
					alt={"TestPill #" + tokenId}
					width={500}
					height={500}
					priority={true}
					blurDataURL="/Base_StarkPill.png"
					placeholder="blur"
				/>
				<div className={styles.caption}>
					<div className={styles.captionContainer}>
						<div className={styles.pillHeader}>TestPill #{tokenId}</div>
						{/* ingredient container */}
						<div className={styles.captionBox}>
							<div className={styles.contentHeader}>Ingredient</div>
							<div className={styles.contentValue}>
								{FACE_TRAITS[ingImageId].name}
							</div>
						</div>
						{/* Owned by container */}
						<div className={styles.captionBox}>
							<div className={styles.contentHeader}>Owned by: </div>
							<div className={styles.contentValue}>
								{shortenAddress(props.ownerAddress)}
							</div>
						</div>
						{/* background container */}
						<div className={styles.captionBox}>
							<div className={styles.contentHeader}>Background</div>
							<div className={styles.contentValue}>
								{BACKGROUND[bgImageId].name}
							</div>
						</div>
						{/*Fame Container */}
						<div className={styles.captionBox}>
							<div className={styles.contentHeader}>Fame</div>
							<div className={styles.contentValue}>{props.fame}</div>
						</div>
					</div>
					<div className={styles.fameRadioButtonContainer}>
						<label className={styles.radioLabel}>
							<input
								className={styles.radioInput}
								type="radio"
								value={0}
								name="fameradio"
								id="fame"
								onChange={handleChange}
								checked={selectedRadioButton === "fame" && account != undefined}
							/>
							<span className={styles.customRadio} />
						</label>
						Fame
						<label>
							<input
								className={styles.radioInput}
								type="radio"
								value={0}
								name="fameradio"
								id="defame"
								onChange={handleChange}
								checked={
									selectedRadioButton === "defame" && account != undefined
								}
							/>
							<span className={styles.customRadio} />
						</label>
						Defame
					</div>
					{radioButtonIsSelected ? (
						<>
							<div className={styles.captionBox}>
								<div className={styles.contentHeader}></div>
								{selectedRadioButton === "fame" ? "Fame" : "Defame"}
								<div className={styles.addFameButtonContainer}>
									<button
										className={styles.stepperButton}
										onClick={() => {
											inputRef.current?.stepDown();
											setFameValue(Number(inputRef.current?.value));
										}}>
										-
									</button>
									<input
										max={votingPower}
										min={0}
										step={1}
										type="number"
										className={styles.textField}
										value={fameValue}
										onChange={(e) => handleManualInput(e)}
										ref={inputRef}
										placeholder="0"></input>

									<button
										className={styles.stepperButton}
										onClick={() => {
											inputRef.current?.stepUp();
											setFameValue(Number(inputRef.current?.value));
										}}>
										+
									</button>
								</div>
								<div className={styles.contentValue}></div>
							</div>
							<div className={styles.yourBalance}>
								<span style={{ fontSize: "24px" }}>Your balance:</span>
								<span className={styles.remainderFame}>{votingPower}</span>
							</div>
							<div className={styles.buttonWrapper}>
								<button className={styles.confirmButton} onClick={fameOrDefame}>
									Confirm
								</button>
							</div>
						</>
					) : null}

					<div className={styles.close} onClick={close}>
						<Cross />
					</div>
					{showConnectMenuModal ? (
						<ConnectMenuModal
							connectors={available}
							close={() => {
								setShowConnectMenuModal(false);
							}}
						/>
					) : null}
				</div>
			</div>
		</div>
	);
};
