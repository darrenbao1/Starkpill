import styles from "../styles/StarkPillCard.module.css";
import Image from "next/image";
interface Props {
	jsonString: any;
	tokenId: string;
}

export const StarkPillCard = (props: Props) => {
	let obj = convertToJson(props.jsonString);
	function convertToJson(jsonString: any): any {
		jsonString = jsonString.replace("data:application/json,", "");
		jsonString = jsonString.replaceAll(" ", "");
		let resultObj = JSON.parse(jsonString);
		if (resultObj.name.startsWith("TestPill")) {
			let obj = resultObj;
			return obj;
		} else {
			return undefined;
		}
	}
	return (
		<>
			{obj != undefined && (
				<div className={styles.card}>
					<Image
						src={obj.image}
						className={styles.image}
						width={250}
						height={250}
						alt=""
					></Image>
					<div className={styles.content}>
						<div style={{ color: "#FF4F0A" }}>{obj.name}</div>
						<div>{obj.attributes[0].value / Math.pow(10, 18)} ETH</div>
						{/* <div>Owned By: {shortenAddress(ownerAddress)}</div> */}
					</div>
				</div>
			)}
		</>
	);
};
