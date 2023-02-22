import styles from "../../styles/ImageModal.module.css";
import Image from "next/image";
import { BACKGROUND, FACE_TRAITS } from "../../types/constants";
interface Props {
	imageUrl: string;
	tokenId: string;
	close: () => void;
	ingImageId: number;
	bgImageId: number;
	rank: number;
}
export const ImageModal = (props: Props) => {
	const { imageUrl, tokenId, close, ingImageId, bgImageId, rank } = props;
	return (
		<div className={styles.modal} onClick={close}>
			<span className={styles.close} onClick={close}>
				&times;
			</span>
			<div className={styles.container}>
				<Image
					src={imageUrl}
					className={styles.modal_content}
					alt={"TestPill #" + tokenId}
					width={500}
					height={500}
					priority={true}
					blurDataURL="/Base_StarkPill.png"
					placeholder="blur"
				/>
				<div className={styles.caption}>
					TestPill #{tokenId} <br />
					{rank != 0 && (
						<>
							Cabinet Ranking #{rank} <br />
						</>
					)}
					Ingredient: {FACE_TRAITS[ingImageId].name} <br />
					Background: {BACKGROUND[bgImageId].name}
				</div>
			</div>
		</div>
	);
};
