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
	const offsetIncrement = 100;
	const [offsetAmount, setOffsetAmount] = useState(0);
	const [loading, setLoading] = useState(true);
	const [loadedAllPills, setIsLoadedAllPills] = useState(false);
	async function fetchData() {
		if (!loadedAllPills) {
			console.log("api is run :" + offsetAmount);
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
					method: "get",
					mode: "cors",
					headers: {
						"Access-Control-Allow-Origin": "*",
					},
				}
			)
				.then((response) => response.json())
				.then((data) => {
					if (data.length <= 0) {
						setIsLoadedAllPills(true);
					}
					setJsonArry((jsonArray) => [...jsonArray, ...data]);
				})
				.finally(() => {
					setLoading(false);
				});
		}
	}
	useEffect(() => {
		fetchData();
	}, []);

	const handleScroll = (e: any) => {
		const bottom =
			e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
		if (bottom && !loading) {
			setOffsetAmount(offsetAmount + offsetIncrement);
			if (!loadedAllPills) {
				console.log("api is run :" + offsetAmount);
				fetch(
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
						method: "get",
						mode: "cors",
						headers: {
							"Access-Control-Allow-Origin": "*",
						},
					}
				)
					.then((response) => response.json())
					.then((data) => {
						if (data.length <= 0) {
							setIsLoadedAllPills(true);
						}
						setJsonArry((jsonArray) => [...jsonArray, ...data]);
					})
					.finally(() => {
						setLoading(false);
					});
			}
			setLoading(true);
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
			{loading && <div className="snackbar">loading</div>}
		</div>
	);
}
