import BN from "bn.js";
import { useEffect, useState } from "react";
import Web3 from "web3";

export default function testing() {
	const ConnectWalletButton = (props: {
		onPressLogout: () => void;
		onPressConnect: () => void;
		loading: Boolean;
		address: string | null;
	}) => {
		//destructuring props
		const { onPressLogout, onPressConnect, loading, address } = props;

		return (
			<div>
				{address && !loading ? (
					<button onClick={onPressLogout}>Disconnect</button>
				) : loading ? (
					<button disabled>
						<div>Loading...</div>
					</button>
				) : (
					<button onClick={onPressConnect}>Connect Wallet</button>
				)}
			</div>
		);
	};

	const [loading, setLoading] = useState(false);
	const [address, setAddress] = useState("");
	const onPressConnect = async () => {
		setLoading(true);

		try {
			if (window?.ethereum?.isMetaMask) {
				// Desktop browser
				const accounts = await window.ethereum.request({
					method: "eth_requestAccounts",
				});

				const account = Web3.utils.toChecksumAddress(accounts[0]);
				setAddress(account);
			}
		} catch (error) {
			console.log(error);
		}

		setLoading(false);
	};
	const onPressLogout = () => setAddress("");

	const hash = Web3.utils.soliditySha3(
		{ t: "uint256", v: "0xf4a7c105cfdc6aabe9ae65bdf2d0df0a567a7ade" },
		{ t: "uint256", v: new BN(3) },
		{ t: "uint256", v: "0x2114" }
	);
	const msg = {
		// domain: {
		// 	name: "Confirm the ownership of this StarkNet address",
		// 	verifyingContract: "0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF",
		// 	version: "1",
		// },
		// message: {
		// 	starknetAddress: 12356789,
		// },
		// primaryType: "Payload",
		// types: {
		// 	domain: [
		// 		{ name: "name", type: "string" },
		// 		{ name: "verifyingContract", type: "address" },
		// 		{ name: "version", type: "string" },
		// 	],
		// 	Payload: [{ name: "starknetAddress", type: "uint256" }],
		// },
		domain: {
			name: "get testpilled",
			version: "1",
			verifyingContract:
				"0x05ef092a31619faa63bf317bbb636bfbba86baf8e0e3e8d384ee764f2904e5dd",
		},
		message: {
			testPillClaimHash: hash,
		},
		primaryType: "Payload",
		types: {
			domain: [
				{ name: "name", type: "string" },
				{ name: "version", type: "string" },
				{ name: "verifyingContract", type: "address" },
			],
			Payload: [{ name: "testPillClaimHash", type: "uint256" }],
		},
	};
	// const accounts = await window.ethereum.request({
	// 	method: "eth_requestAccounts",
	// });
	// await window.ethereum.request({
	// 	method: "eth_signTypedData_v4",
	// 	from: accounts[0],
	// 	params: [accounts[0], JSON.stringify(msg)],
	// });
	const handleClick = async () => {
		console.log("testing");
		try {
			const accounts = await window.ethereum.request({
				method: "eth_requestAccounts",
			});
			console.log("testing333");
			await window.ethereum.request({
				method: "eth_signTypedData_v4",
				from: accounts[0],
				params: [accounts[0], JSON.stringify(msg)],
			});
			// Handle the signed data or any other logic here
		} catch (error) {
			// Handle error
		}
	};
	// useEffect(() => {
	// 	const signTypedData = async () => {
	// 		try {
	// 			const accounts = await window.ethereum.request({
	// 				method: "eth_requestAccounts",
	// 			});
	// 			await window.ethereum.request({
	// 				method: "eth_signTypedData_v4",
	// 				from: accounts[0],
	// 				params: [accounts[0], JSON.stringify(msg)],
	// 			});
	// 			// Handle the signed data or any other logic here
	// 		} catch (error) {
	// 			// Handle error
	// 		}
	// 	};

	// 	if (window.ethereum) {
	// 		signTypedData();
	// 	} else {
	// 		// Handle case when Ethereum provider is not available
	// 	}
	// }, []);
	return (
		<div>
			<h1>
				Testing
				{address} <button onClick={handleClick}>testing button</button>
				<ConnectWalletButton
					onPressConnect={onPressConnect}
					onPressLogout={onPressLogout}
					loading={loading}
					address={address}
				/>
			</h1>
		</div>
	);
}
