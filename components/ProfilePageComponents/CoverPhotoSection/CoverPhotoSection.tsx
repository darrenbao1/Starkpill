import { useState, useEffect, useRef } from "react";

import { FileUploadModal } from "../../Modals/FileUploadModal/FileUploadModal";
import {
	GetResponseMessage,
	removeCoverPhoto,
	uploadCoverPhoto,
} from "../../../types/utils";
import {
	ActionButton,
	ActionButtonContainer,
	EditPicIcon,
} from "./CoverPhotoSection.style";
import { ActionModal } from "../../UnfollowModal/ActionModal";
import { Action } from "../../../types/interfaces";
import { useLoader } from "../../Provider/LoaderProvider";

import {
	MenuContainer,
	MenuOption,
	RemovePhoto,
	UploadPhoto,
} from "../../Modals/EditCoverMenu/EditCoverMenu.styles";
import { useToast } from "../../Provider/ToastProvider";

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
	const { showLoader, hideLoader } = useLoader();
	const { showToast } = useToast();
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
	const [showConfirmModal, setShowConfirmModal] = useState(false);
	const [showEditCoverMenu, setShowEditCoverMenu] = useState(false);

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
	const menuRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
				setShowEditCoverMenu(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [showEditCoverMenu]);

	const handleMouseUp = () => {
		setOnImage(false);
	};

	const handleMouseMove = () => {
		if (onImage) {
			setImageCenter({ x: mousePos.x - distanceX, y: mousePos.y - distanceY });
		}
	};

	// const handleEditButtonClick = () => {
	// 	setShowUploadImageModal(true);
	// };
	const handleEditButtonClick = () => {
		setShowEditCoverMenu(!showEditCoverMenu);
	};
	const handleUploadPhotoClick = () => {
		setShowUploadImageModal(true);
		setShowEditCoverMenu(false);
	};
	const handleSaveButtonClick = async () => {
		showLoader();
		await uploadCoverPhoto(imageCenter.x, imageCenter.y, selectedFiles[0]).then(
			(message) => {
				showToast(GetResponseMessage(message));
				refetch();
				setSelectedFiles([]);
				hideLoader();
			}
		);
	};
	const handleCancelButtonClick = () => {
		setSelectedFiles([]);
		setImageCenter({ x: 0, y: 0 });
	};
	const handleRemoveCoverPhoto = async () => {
		showLoader();
		await removeCoverPhoto().then((message) => {
			showToast(GetResponseMessage(message));
			refetch();
			setShowConfirmModal(false);
			hideLoader();
		});
	};
	const frameWidth = 850;
	const frameHeight = 280;

	//user already has cover photo
	if (!selectedFiles[0]) {
		return (
			<>
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
					{!isViewingOwnProfile ? null : (
						<ActionButtonContainer>
							{/* {imageUrl && (
								<ActionButton onClick={() => setShowConfirmModal(true)}>
									Remove
								</ActionButton>
							)} */}
							{imageUrl ? (
								<ActionButton onClick={handleEditButtonClick}>
									<EditPicIcon />
									Edit cover photo
								</ActionButton>
							) : (
								<ActionButton onClick={handleUploadPhotoClick}>
									<EditPicIcon />
									Upload cover photo
								</ActionButton>
							)}
						</ActionButtonContainer>
					)}
					<FileUploadModal
						setSelectedFiles={setSelectedFiles}
						selectedFiles={selectedFiles}
						showUploadImageModal={showUploadImageModal}
						close={() => setShowUploadImageModal(false)}
					/>
				</div>
				{showConfirmModal && (
					<ActionModal
						walletAddress=""
						close={() => setShowConfirmModal(false)}
						handleAction={handleRemoveCoverPhoto}
						actionIndex={Action.RemoveCoverPhoto}
					/>
				)}
				{imageUrl && showEditCoverMenu && (
					<MenuContainer ref={menuRef}>
						<MenuOption onClick={handleUploadPhotoClick}>
							<UploadPhoto />
							Upload photo
						</MenuOption>
						{imageUrl && (
							<MenuOption onClick={() => setShowConfirmModal(true)}>
								<RemovePhoto />
								Remove
							</MenuOption>
						)}
					</MenuContainer>
				)}
			</>
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
			{!isViewingOwnProfile ? null : (
				<ActionButtonContainer>
					<ActionButton onClick={handleCancelButtonClick}>Cancel </ActionButton>
					<ActionButton onClick={handleSaveButtonClick}>Save</ActionButton>
				</ActionButtonContainer>
			)}
		</div>
	);
};
