import { useAccount } from "@starknet-react/core";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
	MINTSQUARE_BASE_URL,
	NETWORK_FOR_API,
	STARKPILL_CONTRACT_ADDRESS,
} from "../types/constants";
import styles from "../styles/cabinet.module.css";
import { StarkPillCard } from "../components/StarkPillCard";
import Link from "next/link";
export default function Mypills() {
	const { address } = useAccount();
	const router = useRouter();
	const [ownerPillsArray, setOwnerPillsArray] = useState<any[]>([]);
	const { walletAddress } = router.query;
	const [loading, setLoading] = useState(true);
	async function fetchData() {
		fetch(
			MINTSQUARE_BASE_URL +
				"nfts/" +
				NETWORK_FOR_API +
				"?collection=" +
				STARKPILL_CONTRACT_ADDRESS +
				"&owner_address=" +
				walletAddress,
			{
				method: "get",
				mode: "cors",
				headers: {
					"Access-Control-Allow-Origin": "*",
				},
			}
		)
			.then((response) => response.json())
			.then((data) => {
				setOwnerPillsArray(data);
			})
			.finally(() => {
				setLoading(false);
			});
	}
	useEffect(() => {
		fetchData();
	}, []);
	return (
		<>
			{address ? (
				<div className="container">
					<div className={styles.backgroundFade}></div>
					<div className="contentContainer">
						<h1 style={{ textAlign: "center", paddingTop: "2rem" }}>
							my pills
						</h1>
						{ownerPillsArray.length == 0 && !loading && (
							<div style={{ textAlign: "center", width: "100%" }}>
								no pills found you can mint one &nbsp;
								<u>
									<Link href="/mint">here</Link>
								</u>
							</div>
						)}
						<div className={styles.cardContainer}>
							{ownerPillsArray.map((jsonString, index) => (
								<StarkPillCard
									jsonString={jsonString.token_uri}
									tokenId={jsonString.token_id}
									key={index}
								/>
							))}
						</div>
					</div>
					{loading && <div className="snackbar">loading</div>}
				</div>
			) : (
				<h1 style={{ textAlign: "center" }}>account disconnected</h1>
			)}
		</>
	);
}
