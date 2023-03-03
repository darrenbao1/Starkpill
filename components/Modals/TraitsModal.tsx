import styles from "../../styles/TraitsModal.module.css";
import Cross from "../../public/svgs/cross.svg";
import Image from "next/image";
import { Trait } from "../../types/interfaces";
import ETHLogo from "../../public/svgs/ethLogo.svg";
export const TraitsModal = (props: {
	traitName: string;
	trait: Trait[];
	selectedId: number;
	close: any;
	select: any;
	handleClick?: (e: any) => void;
}) => {
	return (
		<div className={styles.modalContainer} onClick={props.handleClick}>
			<div className={styles.header}>
				<span>Select {props.traitName}</span>
				<button
					className={styles.closeButton}
					onClick={() => {
						props.close();
					}}>
					<Cross />
				</button>
			</div>
			<div className={styles.selectionContainer2}>
				{props.trait.map((trait, index) => (
					<div key={index}>
						<div
							className={
								index == props.selectedId
									? styles.selectionIconActive
									: styles.selectionIcon
							}>
							<Image
								src={trait.link}
								alt={trait.name}
								layout="fill"
								objectFit="contain"
								onClick={() => {
									props.select(index);
								}}
								className={
									props.traitName == "face trait"
										? styles.centreTrait
										: styles.centreTraitBackground
								}></Image>
							{trait.premiumPrice && (
								<div
									className={
										index == props.selectedId
											? styles.flagSelected
											: styles.flag
									}>
									<span style={{ marginRight: "4px", marginLeft: "auto",letterSpacing:"0px" }}>
										{trait.premiumPrice}
									</span>
									<ETHLogo />
								</div>
							)}
						</div>

						<div
							className={
								index == props.selectedId
									? styles.traitNameActive
									: styles.traitName
							}>
							{trait.name}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
