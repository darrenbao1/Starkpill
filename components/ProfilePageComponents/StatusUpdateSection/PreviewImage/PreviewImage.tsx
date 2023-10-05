import Image from "next/image";
import {
	CloseButton,
	PreviewImageContainer,
	PreviewImageItem,
} from "./PreviewImage.styles";
import { useState } from "react";
import { PostImageModal } from "../../../Modals/PostImageModal";

interface Props {
	gifArray: string[];
	imageArray: string[];
	removeImage: (index: number) => void;
	removeGif: (index: number) => void;
}
export const PreviewImage = (props: Props) => {
	const { gifArray, imageArray } = props;
	const fullArray = [...gifArray, ...imageArray];
	let gridColumns;
	if (fullArray.length === 1) {
		gridColumns = "1fr";
	} else if (fullArray.length === 2) {
		gridColumns = "1fr 1fr";
	} else if (fullArray.length >= 3) {
		gridColumns = "1fr 1fr 1fr";
	}
	const [showImageModal, setShowImageModal] = useState(false);
	const [imageIndex, setImageIndex] = useState(0);
	const [GifIndex, setGifIndex] = useState(0);
	return (
		<PreviewImageContainer style={{ gridTemplateColumns: gridColumns }}>
			{imageArray.map((imageUrl, index) => {
				return (
					<>
						<PreviewImageItem
							key={index}
							onClick={() => {
								setShowImageModal(true);
								setImageIndex(index);
							}}>
							<Image
								src={imageUrl}
								alt="Preview Image"
								fill={true}
								sizes="100vw"
								style={{
									borderRadius: "12px",
									objectFit: "cover",
								}}
							/>
							<CloseButton onClick={() => props.removeImage(index)} />
						</PreviewImageItem>
						{showImageModal && imageIndex === index && (
							<PostImageModal
								close={() => setShowImageModal(false)}
								imageurl={imageUrl}
							/>
						)}
					</>
				);
			})}
			{gifArray.map((imageUrl, index) => {
				return (
					<>
						<PreviewImageItem
							key={index}
							onClick={() => {
								setShowImageModal(true);
								setGifIndex(index);
							}}>
							<Image
								src={imageUrl}
								alt="Preview Image"
								fill={true}
								sizes="100vw"
								style={{
									borderRadius: "12px",
									objectFit: "fill",
								}}
							/>
							<CloseButton onClick={() => props.removeGif(index)} />
						</PreviewImageItem>
						{showImageModal && GifIndex === index && (
							<PostImageModal
								close={() => setShowImageModal(false)}
								imageurl={imageUrl}
							/>
						)}
					</>
				);
			})}
		</PreviewImageContainer>
	);
};
