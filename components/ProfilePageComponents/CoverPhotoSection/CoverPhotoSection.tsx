import { useState, useEffect } from "react";
import Image from "next/image";
import { FileUploadModal } from "../../Modals/FileUploadModal/FileUploadModal";

interface Props {
	imageUrl: string | null;
}

export const CoverPhotoSection = ({ imageUrl }: Props) => {
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

	if (!imageUrl && !selectedFiles[0]) {
		return (
			<div>
				<button onClick={handleEditButtonClick}>Edit</button>
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

	return (
		<div
			style={{
				height: "100%",
				width: "100%",
				backgroundImage: `url(${tempImageUrl})`,
				backgroundRepeat: "no-repeat",
				backgroundPosition: `${imageCenter.x}px ${imageCenter.y}px`,
				backgroundSize: "cover",
				position: "relative",
			}}
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUp}
			onMouseMove={handleMouseMove}>
			{selectedFiles[0] ? null : (
				<button onClick={handleEditButtonClick}>Edit</button>
			)}
		</div>
	);
};
