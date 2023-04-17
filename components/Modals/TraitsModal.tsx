import styles from "../../styles/TraitsModal.module.css";
import Cross from "../../public/svgs/cross2.svg";
import Image from "next/image";
import { Trait } from "../../types/interfaces";
import ETHLogo from "../../public/svgs/ethLogo.svg";
import { gql, useQuery } from "@apollo/client";
import { getPharmacyData } from "../../types/utils";
export const TraitsModal = (props: {
	traitName: string;
	trait: Trait[];
	selectedId: number;
	close: any;
	select: any;
	handleClick?: (e: any) => void;
	isMinting: boolean; //check if this is minting page or not.
}) => {
	const GET_PHARMACY_DATA = gql`
		query GetPharmacyData {
			getPharmacyData {
				amount_left
				index
				startAmount
				typeIndex
			}
		}
	`;
	const { data, loading } = useQuery(GET_PHARMACY_DATA);
	if (loading) return null;
	else {
		if (props.isMinting) {
			if (props.traitName === "Ingredient") {
				//map through the data array and check the type index is equal to 1
				data.getPharmacyData.map((item: any) => {
					if (item.typeIndex === 1) {
						props.trait[item.index].quantityLeft = item.amount_left;
					}
				});
			} else if (props.traitName === "Background") {
				data.getPharmacyData.map((item: any) => {
					if (item.typeIndex === 2) {
						props.trait[item.index].quantityLeft = item.amount_left;
					}
				});
			}
		}
		return (
			<div className={styles.modalContainer} onClick={props.handleClick}>
				<button
					className={styles.closeButton}
					onClick={() => {
						props.close();
					}}>
					<Cross />
				</button>
				<div className={styles.header}>
					<span>Select {props.traitName}</span>
				</div>
				<div className={styles.selectionContainer2}>
					{props.trait.map((trait, index) => (
						<div
							key={index}
							className={styles.container}
							style={
								index == props.selectedId ? { outlineColor: "white" } : {}
							}>
							<div
								className={
									index == props.selectedId
										? styles.selectionIconActive
										: styles.selectionIcon
								}>
								<Image
									src={trait.marketViewLink ? trait.marketViewLink : trait.link}
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
										<span
											style={{
												marginRight: "4px",
												marginLeft: "auto",
												letterSpacing: "0px",
											}}>
											{trait.premiumPrice}
										</span>
										<ETHLogo />
									</div>
								)}
								{trait.quantityLeft && props.isMinting && (
									<div className={styles.unitsLeftContainer}>
										<div
											className={styles.unitsLeft}
											style={
												index == props.selectedId
													? {}
													: { backgroundColor: "#9D9D9D" }
											}>
											{trait.quantityLeft} Left
										</div>
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
	}
};
