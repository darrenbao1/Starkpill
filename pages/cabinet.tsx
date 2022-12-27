import { useEffect, useState } from "react";
import { StarkPillCard } from "../components/StarkPillCard";
import styles from "../styles/cabinet.module.css";
import {
	MINTSQUARE_BASE_URL,
	NETWORK_FOR_API,
	STARKPILL_CONTRACT_ADDRESS,
} from "../types/constants";
export default function Cabinet() {
	const [jsonArray, setJsonArry] = useState<any[]>([]);
	const offsetIncrement = 20;
	const [offsetAmount, setOffsetAmount] = useState(0);
	async function fetchData() {
		console.log(
			MINTSQUARE_BASE_URL +
				"nfts/" +
				NETWORK_FOR_API +
				"?collection=" +
				STARKPILL_CONTRACT_ADDRESS +
				"&limit=" +
				offsetIncrement +
				"&offset=" +
				offsetAmount
		);
		console.log("fetching");
		await fetch(
			MINTSQUARE_BASE_URL +
				"nfts/" +
				NETWORK_FOR_API +
				"?collection=" +
				STARKPILL_CONTRACT_ADDRESS +
				"&limit=" +
				offsetIncrement +
				"&offset=" +
				offsetAmount,
			{
				mode: "cors",
				headers: {
					"Access-Control-Allow-Origin": "*",
				},
			}
		)
			.then((response) => response.json())
			.then((data) => {
				setJsonArry((jsonArray) => [...jsonArray, ...data]);
			});
	}
	useEffect(() => {
		//fetchData();
		console.log("testing");
	}, []);

	const handleScroll = (e: any) => {
		const bottom =
			e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
		if (bottom) {
			setOffsetAmount(offsetAmount + offsetIncrement);
		}
	};
	return (
		<div className="container" onScroll={(e) => handleScroll(e)}>
			<div className="contentContainer">
				<div className={styles.cardContainer}>
					{jsonArray.map((jsonString, index) => (
						<StarkPillCard
							jsonString={jsonString.token_uri}
							tokenId={jsonString.token_id}
							key={index}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
