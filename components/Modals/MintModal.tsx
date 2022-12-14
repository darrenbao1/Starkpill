import Cross from "../../public/svgs/cross.svg";
import styles from "../../styles/MintModal.module.css";
import SubtractIcon from "../../public/svgs/subtractIcon.svg";
import AdditionIcon from "../../public/svgs/additionIcon.svg";
import { createRef, useMemo, useState } from "react";
import starknetEthAbi from "../../abi/starkEth.json";
import {
	useAccount,
	useContract,
	useStarknetCall,
	useStarknetExecute,
	useTransactionManager,
} from "@starknet-react/core";
import { Abi, uint256 } from "starknet";
import { uint256ToBN } from "starknet/dist/utils/uint256";
import { toBN, toFelt } from "starknet/dist/utils/number";
export const MintModal = (props: {
	close: any;
	faceId: number;
	backgroundId: number;
}) => {
	const inputRef = createRef<HTMLInputElement>();
	const Stepper = () => {
		const [mintPrice, setMintPrice] = useState(0.001);
		const handleChange = (e: any) => {
			setMintPrice(handleDecimalsOnValue(e.target.value));
		};

		//set to limit to 1 decimal place
		function handleDecimalsOnValue(value: any) {
			const regex = /([0-9]*[\.|\,]{0,3}[0-9]{0,3})/s;
			return value.match(regex)[0];
		}
		//code to mint pill
		const { addTransaction } = useTransactionManager();
		const calls = [
			{
				contractAddress:
					"0x05ef092a31619faa63bf317bbb636bfbba86baf8e0e3e8d384ee764f2904e5dd",
				entrypoint: "mint",
				calldata: [
					props.faceId,
					props.backgroundId,
					"0x" + (mintPrice * Math.pow(10, 18)).toString(16),
					0,
				],
			},
		];
		const mintPill = async () => {
			try {
				const response = await execute();
				addTransaction({
					hash: response.transaction_hash,
					metadata: { test: "Mint Pill" },
				});
			} catch (e) {
				console.log(e);
			}
		};
		const { execute } = useStarknetExecute({ calls });
		//code to check allowance balance
		const { contract } = useContract({
			address:
				"0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
			abi: starknetEthAbi as Abi,
		});
		const { address } = useAccount();
		const { data, loading, error } = useStarknetCall({
			contract,
			method: "allowance",
			args: address
				? [
						address,
						"0x05ef092a31619faa63bf317bbb636bfbba86baf8e0e3e8d384ee764f2904e5dd",
				  ]
				: undefined,
			options: {
				watch: true,
			},
		});
		const hasAllowance = useMemo(() => {
			if (loading || !data?.length) {
				return false;
			}
			if (error) {
				return false;
			}
			if (data && data.length > 0) {
				const value = uint256ToBN(data[0]);
				return Number(value) >= 1000000000000000;
			}
		}, [data]);
		//function to let them approve eth
		const allowanceCall = [
			{
				contractAddress:
					"0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
				entrypoint: "approve",
				calldata: [
					"0x05ef092a31619faa63bf317bbb636bfbba86baf8e0e3e8d384ee764f2904e5dd",
					"0x" + (mintPrice * Math.pow(10, 18)).toString(16),
					0,
				],
			},
		];
		const approveAllowance = async () => {
			try {
				const response = await approveAllowanceExecute();
				addTransaction({
					hash: response.transaction_hash,
					metadata: { test: "approve eth" },
				});
			} catch (e) {
				console.log(e);
			}
		};
		const { execute: approveAllowanceExecute } = useStarknetExecute({
			calls: allowanceCall,
		});

		return (
			<>
				<div className={styles.stepper}>
					<button
						onClick={() => {
							inputRef.current?.stepDown();
							setMintPrice(Number(inputRef.current?.value));
						}}
						disabled={mintPrice == 0.001}
					>
						<SubtractIcon />
					</button>
					<div className={styles.inputContainer}>
						<input
							type="number"
							min={0.001}
							step={0.001}
							value={mintPrice}
							onChange={(e) => handleChange(e)}
							className={styles.mintPrice}
							placeholder="mint price"
							ref={inputRef}
						/>
						<span className={styles.unitOfMeasurement}>eth</span>
					</div>
					<button
						onClick={() => {
							inputRef.current?.stepUp();
							setMintPrice(Number(inputRef.current?.value));
						}}
					>
						<AdditionIcon />
					</button>
				</div>
				{hasAllowance ? (
					<div
						className="connectWalletButton"
						style={{
							width: "fit-content",
							padding: "1rem 2rem",
							marginTop: "30px",
						}}
						onClick={() => {
							mintPill();
						}}
					>
						mint
					</div>
				) : (
					<div
						className="connectWalletButton"
						style={{
							width: "fit-content",
							padding: "1rem 2rem",
							marginTop: "30px",
						}}
						onClick={() => {
							approveAllowance();
						}}
					>
						approve eth
					</div>
				)}
			</>
		);
	};
	return (
		<div className={styles.modalContainer}>
			<button className={styles.closeButton} onClick={props.close}>
				<Cross />
			</button>
			<div className={styles.header}>mint</div>
			<div className={styles.text}>
				if you wish to support our efforts you can choose pay for your Starkpill
				in any amount of ETH.
				<br />
				<br />
				All minted Starkpills will be listed as a collection in our cabinet.
			</div>
			<Stepper />
		</div>
	);
};
