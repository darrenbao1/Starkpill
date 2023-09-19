import { useState, useEffect } from "react";
import Image from "next/image";
import { FileUploadModal } from "../../Modals/FileUploadModal/FileUploadModal";
import { uploadCoverPhoto } from "../../../types/utils";
import { ActionButton, ActionButtonContainer } from "./CoverPhotoSection.style";

interface Props {
	imageUrl: string | null;
	xPos: number;
	yPos: number;
	refetch: () => void;
	isViewingOwnProfile: boolean;
}

export const CoverPhotoSection = ({
	imageUrl,
	xPos,
	yPos,
	refetch,
	isViewingOwnProfile,
}: Props) => {
	const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
	const [imageCenter, setImageCenter] = useState({ x: 0, y: 0 });
	const [onImage, setOnImage] = useState(false);
	const [distanceX, setDistanceX] = useState(0);
	const [distanceY, setDistanceY] = useState(0);
	const [showUploadImageModal, setShowUploadImageModal] = useState(false);
	const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
	const [preloadedImageUrl, setPreloadedImageUrl] = useState<string | null>(
		null
	);

	useEffect(() => {
		const handleMouseMove = (event: MouseEvent) => {
			setMousePos({ x: event.clientX, y: event.clientY });
		};

		window.addEventListener("mousemove", handleMouseMove);

		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
		};
	}, []);

	useEffect(() => {
		if (selectedFiles[0]) {
			const reader = new FileReader();
			reader.onload = (event) => {
				setPreloadedImageUrl(event.target?.result as string);
			};
			reader.readAsDataURL(selectedFiles[0]);
		}
	}, [selectedFiles]);

	const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
		setOnImage(true);
		setDistanceX(mousePos.x - imageCenter.x);
		setDistanceY(mousePos.y - imageCenter.y);
	};

	const handleMouseUp = () => {
		setOnImage(false);
	};

	const handleMouseMove = () => {
		if (onImage) {
			setImageCenter({ x: mousePos.x - distanceX, y: mousePos.y - distanceY });
		}
	};

	const handleEditButtonClick = () => {
		setShowUploadImageModal(true);
	};
	const handleSaveButtonClick = async () => {
		const response = await uploadCoverPhoto(
			imageCenter.x,
			imageCenter.y,
			selectedFiles[0]
		).then(() => {
			refetch();
			setSelectedFiles([]);
		});
	};
	const handleCancelButtonClick = () => {
		setSelectedFiles([]);
		setImageCenter({ x: 0, y: 0 });
	};
	const frameWidth = 850;
	const frameHeight = 280;
	//User has no image and also no selected files
	if (!imageUrl && !selectedFiles[0]) {
		return (
			<div
				style={{
					height: `${frameHeight}px`,
					width: `${frameWidth}px`,
					backgroundRepeat: "no-repeat",
					backgroundPosition: `${xPos}px ${yPos}px`,
					backgroundImage: `url(${imageUrl})`,
					backgroundSize: "cover",
					position: "relative",
					overflow: "hidden",
				}}>
				<ActionButton onClick={handleEditButtonClick}>Edit</ActionButton>
				<FileUploadModal
					setSelectedFiles={setSelectedFiles}
					selectedFiles={selectedFiles}
					showUploadImageModal={showUploadImageModal}
					close={() => setShowUploadImageModal(false)}
				/>
			</div>
		);
	}

	//user already has cover photo
	if (!selectedFiles[0]) {
		return (
			<div
				style={{
					height: `${frameHeight}px`,
					width: `${frameWidth}px`,
					backgroundRepeat: "no-repeat",
					backgroundPosition: `${xPos}px ${yPos}px`,
					backgroundImage: `url(${imageUrl})`,
					backgroundSize: "cover",
					position: "relative",
					overflow: "hidden",
				}}>
				{selectedFiles[0] ? null : (
					<ActionButtonContainer>
						<ActionButton onClick={handleEditButtonClick}>Edit</ActionButton>
					</ActionButtonContainer>
				)}
				<FileUploadModal
					setSelectedFiles={setSelectedFiles}
					selectedFiles={selectedFiles}
					showUploadImageModal={showUploadImageModal}
					close={() => setShowUploadImageModal(false)}
				/>
			</div>
		);
	}

	const tempImageUrl = preloadedImageUrl || imageUrl;
	//user is editing cover photo.
	return (
		<div
			style={{
				height: `${frameHeight}px`,
				width: `${frameWidth}px`,
				backgroundRepeat: "no-repeat",
				backgroundPosition: `${imageCenter.x}px ${imageCenter.y}px`,
				backgroundImage: `url(${tempImageUrl})`,
				backgroundSize: "cover",
				position: "relative",
				overflow: "hidden",
			}}
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUp}
			onMouseMove={handleMouseMove}>
			{!selectedFiles[0] ? null : (
				<ActionButtonContainer>
					<ActionButton onClick={handleCancelButtonClick}>Cancel </ActionButton>
					<ActionButton onClick={handleSaveButtonClick}>Save</ActionButton>
				</ActionButtonContainer>
			)}
		</div>
	);
};
