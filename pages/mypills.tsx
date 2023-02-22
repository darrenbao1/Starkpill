import { useAccount } from "@starknet-react/core";
import { useRouter } from "next/router";
import { useQuery, gql } from "@apollo/client";
import styles from "../styles/cabinet.module.css";
import { StarkPillCard } from "../components/StarkPillCard";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useEffect } from "react";
export default function Mypills() {
	const refetchState = useSelector((state: any) => state.refetch);
	const { address } = useAccount();
	const router = useRouter();
	const { walletAddress } = router.query;
	const GET_USER_TOKENS = gql`
		query Tokens($address: String!) {
			user(address: $address) {
				tokens {
					id
					ingredient
					background
					owner {
						address
					}
					metadata {
						imageUrl
						mintPrice
					}
				}
			}
		}
	`;
	const { data, loading, refetch } = useQuery(GET_USER_TOKENS, {
		variables: {
			address: walletAddress,
		},
	});
	useEffect(() => {
		setTimeout(() => {
			refetch();
			console.log(data);
		}, 3000);
	}, [refetchState.value]);
	if (loading) {
		return (
			<div className="container">
				<div className={styles.backgroundFade}></div>
				<div className="contentContainer">
					<h1 style={{ textAlign: "center", paddingTop: "2rem" }}>my pills</h1>
					<div className={styles.cardContainer}>Loading</div>
				</div>
			</div>
		);
	}
	const tokenIds = data.user.tokens;
	return (
		<>
			{address ? (
				<div className="container">
					<div className={styles.backgroundFade}></div>

					<div className="contentContainer">
						<h1 style={{ textAlign: "center", paddingTop: "2rem" }}>
							my pills
						</h1>
						{tokenIds.length == 0 && !loading && (
							<div style={{ textAlign: "center", width: "100%" }}>
								no pills found you can mint one &nbsp;
								<u>
									<Link href="/mint">here</Link>
								</u>
							</div>
						)}
						<div className={styles.cardContainer}>
							{tokenIds.map((token: any, index: number) => (
								<StarkPillCard
									tokenId={token.id}
									ingId={token.ingredient}
									bgId={token.background}
									ownerAddress={token.owner.address}
									mintPrice={token.metadata.mintPrice}
									imageUrl={token.metadata.imageUrl}
									isOwner={true} //true because at pills page.
									key={token.id}
									rank={0}
								/>
							))}
						</div>
					</div>
				</div>
			) : (
				<h1 style={{ textAlign: "center" }}>account disconnected</h1>
			)}
		</>
	);
}
