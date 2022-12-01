import { StarkPill } from "../types/interfaces";
import styles from "../styles/StarkPillCard.module.css";
import { shortenAddress } from "../types/utils";
interface Props {
	Starkpill: StarkPill;
}

export const StarkPillCard = (props: Props) => {
	return (
		<div className={styles.card}>
			<picture>
				<img src="/starkpill.PNG" className={styles.image} alt=""></img>
			</picture>
			<div className={styles.content}>
				<div> Starkpill #{props.Starkpill.id} </div>
				<div>
					Cost: {props.Starkpill.cost == 0 ? "Free!" : props.Starkpill.cost}
				</div>
				<div>Owned By: {shortenAddress(props.Starkpill.owner)}</div>
			</div>
		</div>
	);
};
