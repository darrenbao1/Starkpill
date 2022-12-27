import styles from "../styles/StarkPillCard.module.css";
import { shortenAddress } from "../types/utils";

interface Props {
	jsonString: any;
	tokenId: string;
}

export const StarkPillCard = (props: Props) => {
	let obj = convertToJson(props.jsonString);
	let ownerAddress = "";

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
					<picture>
						<img src={obj.image} className={styles.image} alt=""></img>
					</picture>

					<div className={styles.content}>
						<div>{obj.name}</div>
						<div>Cost: {obj.attributes[0].value / Math.pow(10, 18)}</div>
						<div>Owned By: {shortenAddress(ownerAddress)}</div>
					</div>
				</div>
			)}
		</>
	);
};
