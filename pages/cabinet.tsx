import { StarkPillCard } from "../components/StarkPillCard";
import { StarkPill } from "../types/interfaces";
import styles from "../styles/cabinet.module.css";
export default function cabinet() {
	const starkPillArray: StarkPill[] = [
		{
			id: 1,
			cost: 0,
			owner:
				"0x0464F1765E2911F0743e24eAA81C40cbF27D2bbaE690c9A82F052FF96c68689c",
		},
		{
			id: 1,
			cost: 0,
			owner:
				"0x0464F1765E2911F0743e24eAA81C40cbF27D2bbaE690c9A82F052FF96c68689c",
		},
		{
			id: 1,
			cost: 0,
			owner:
				"0x0464F1765E2911F0743e24eAA81C40cbF27D2bbaE690c9A82F052FF96c68689c",
		},
		{
			id: 1,
			cost: 0,
			owner:
				"0x0464F1765E2911F0743e24eAA81C40cbF27D2bbaE690c9A82F052FF96c68689c",
		},
		{
			id: 1,
			cost: 0,
			owner:
				"0x0464F1765E2911F0743e24eAA81C40cbF27D2bbaE690c9A82F052FF96c68689c",
		},
		{
			id: 1,
			cost: 0,
			owner:
				"0x0464F1765E2911F0743e24eAA81C40cbF27D2bbaE690c9A82F052FF96c68689c",
		},
		{
			id: 1,
			cost: 0,
			owner:
				"0x0464F1765E2911F0743e24eAA81C40cbF27D2bbaE690c9A82F052FF96c68689c",
		},
		{
			id: 1,
			cost: 0,
			owner:
				"0x0464F1765E2911F0743e24eAA81C40cbF27D2bbaE690c9A82F052FF96c68689c",
		},
		{
			id: 1,
			cost: 0,
			owner:
				"0x0464F1765E2911F0743e24eAA81C40cbF27D2bbaE690c9A82F052FF96c68689c",
		},
		{
			id: 1,
			cost: 0,
			owner:
				"0x0464F1765E2911F0743e24eAA81C40cbF27D2bbaE690c9A82F052FF96c68689c",
		},
		{
			id: 1,
			cost: 0,
			owner:
				"0x0464F1765E2911F0743e24eAA81C40cbF27D2bbaE690c9A82F052FF96c68689c",
		},
		{
			id: 1,
			cost: 0,
			owner:
				"0x0464F1765E2911F0743e24eAA81C40cbF27D2bbaE690c9A82F052FF96c68689c",
		},
		{
			id: 1,
			cost: 0,
			owner:
				"0x0464F1765E2911F0743e24eAA81C40cbF27D2bbaE690c9A82F052FF96c68689c",
		},
		{
			id: 1,
			cost: 0,
			owner:
				"0x0464F1765E2911F0743e24eAA81C40cbF27D2bbaE690c9A82F052FF96c68689c",
		},
		{
			id: 1,
			cost: 0,
			owner:
				"0x0464F1765E2911F0743e24eAA81C40cbF27D2bbaE690c9A82F052FF96c68689c",
		},
		{
			id: 1,
			cost: 0,
			owner:
				"0x0464F1765E2911F0743e24eAA81C40cbF27D2bbaE690c9A82F052FF96c68689c",
		},
		{
			id: 1,
			cost: 0,
			owner:
				"0x0464F1765E2911F0743e24eAA81C40cbF27D2bbaE690c9A82F052FF96c68689c",
		},
		{
			id: 1,
			cost: 0,
			owner:
				"0x0464F1765E2911F0743e24eAA81C40cbF27D2bbaE690c9A82F052FF96c68689c",
		},
		{
			id: 1,
			cost: 0,
			owner:
				"0x0464F1765E2911F0743e24eAA81C40cbF27D2bbaE690c9A82F052FF96c68689c",
		},
		{
			id: 1,
			cost: 0,
			owner:
				"0x0464F1765E2911F0743e24eAA81C40cbF27D2bbaE690c9A82F052FF96c68689c",
		},
		{
			id: 1,
			cost: 0,
			owner:
				"0x0464F1765E2911F0743e24eAA81C40cbF27D2bbaE690c9A82F052FF96c68689c",
		},
	];

	return (
		<div className="container">
			<div className="contentContainer">
				<div className={styles.cardContainer}>
					{starkPillArray.map(
						(starkpill, index) => (
							<StarkPillCard
								Starkpill={starkpill}
								key={index}
							/>
						)
					)}
				</div>
			</div>
		</div>
	);
}
