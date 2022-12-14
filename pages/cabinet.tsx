import { StarkPillCard } from "../components/StarkPillCard";
import { StarkPill } from "../types/interfaces";
import styles from "../styles/cabinet.module.css";
import { SAMPLE_DATA } from "../types/constants";
export default function cabinet() {
	return (
		<div className="container">
			<div className="contentContainer">
				<div className={styles.cardContainer}>
					{SAMPLE_DATA.map((starkpill, index) => (
						<StarkPillCard Starkpill={starkpill} key={index} />
					))}
				</div>
			</div>
		</div>
	);
}
