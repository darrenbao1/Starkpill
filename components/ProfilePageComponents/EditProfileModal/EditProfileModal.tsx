import { useEffect, useState } from "react";
import { Action, UserProfile } from "../../../types/interfaces";
import { useLoader } from "../../Provider/LoaderProvider";
import {
	ModalContainer,
	Container,
	CloseButton,
	Header,
	TitleWrapper,
	Title,
	CoverPhotoContainer,
	ContentContainer,
	ProfilePictureContainer,
	AttributeLabel,
	AttributeContainer,
	InputStyle,
	SaveChangesButton,
	InputStyleBio,
} from "./EditProfileModal.style";
import {
	GetResponseMessage,
	UpdateInfo,
	removeCoverPhoto,
	uploadCoverPhoto,
} from "../../../types/utils";
import { FileUploadModal } from "../../Modals/FileUploadModal/FileUploadModal";
import { ActionModal } from "../../UnfollowModal/ActionModal";
import Image from "next/image";
import { useToast } from "../../Provider/ToastProvider";

interface Props {
	userObject: UserProfile;
	closeModal: () => void;
	refetch: () => void;
	profilePictureUrl: string;
}

export const EditProfileModal = ({
	userObject,
	closeModal,
	refetch,
	profilePictureUrl,
}: Props) => {
	//destructure userObject
	const {
		coverPictureUrl,
		pos_x_CoverPicture,
		pos_y_CoverPicture,
		username,
		bio,
		location,
		websiteUrl,
		ensDomain,
	} = userObject;
	const [editableUsername, setEditableUsername] = useState(username || "");
	const [editableBio, setEditableBio] = useState(bio || "");
	const [editableLocation, setEditableLocation] = useState(location || "");
	const [editableWebsiteUrl, setEditableWebsiteUrl] = useState(
		websiteUrl || ""
	);
	const [editableEnsDomain, setEditableEnsDomain] = useState(ensDomain || "");

	//useEffect to check if the user has edited any field.
	const [hasChanged, setHasChanged] = useState(false);

	useEffect(() => {
		if (
			editableUsername !== username ||
			editableBio !== bio ||
			editableLocation !== location ||
			editableWebsiteUrl !== websiteUrl ||
			editableEnsDomain !== ensDomain
		) {
			setHasChanged(true);
		} else {
			setHasChanged(false);
		}
	}, [
		editableUsername,
		editableBio,
		editableLocation,
		editableWebsiteUrl,
		editableEnsDomain,
	]);
	const { showLoader, hideLoader } = useLoader();
	const { showToast } = useToast();
	const handleSaveChanges = async () => {
		showLoader();
		await UpdateInfo(
			editableUsername,
			editableBio,
			editableLocation,
			editableWebsiteUrl,
			editableEnsDomain
		).then((message) => {
			showToast(GetResponseMessage(message));
			refetch();
			closeModal();
			hideLoader();
		});
	};
	return (
		<ModalContainer>
			<Container>
				<Header>
					<TitleWrapper>
						<Title>Edit Info</Title>
						<CloseButton onClick={closeModal} />
					</TitleWrapper>
				</Header>
				{/* <CoverPhotoContainer>
					<CoverPhotoSectionForEditProfileModal
						imageUrl={userObject.coverPictureUrl}
						xPos={userObject.pos_x_CoverPicture}
						yPos={userObject.pos_y_CoverPicture}
						isViewingOwnProfile={true}
						refetch={refetch}
					/>
				</CoverPhotoContainer>
				<ProfilePictureContainer>
					<Image src={profilePictureUrl} alt={"Profile Picture"} fill={true} />
				</ProfilePictureContainer> */}
				<ContentContainer>
					<AttributeContainer>
						<AttributeLabel>Username</AttributeLabel>
						<InputStyle
							value={editableUsername}
							onChange={(e) => setEditableUsername(e.target.value)}
						/>
					</AttributeContainer>
					<AttributeContainer>
						<AttributeLabel>Bio</AttributeLabel>
						<InputStyleBio
							value={editableBio}
							onChange={(e) => setEditableBio(e.target.value)}
						/>
					</AttributeContainer>
					<AttributeContainer>
						<AttributeLabel>Location</AttributeLabel>
						<InputStyle
							value={editableLocation}
							onChange={(e) => setEditableLocation(e.target.value)}
						/>
					</AttributeContainer>
					<AttributeContainer>
						<AttributeLabel>Website</AttributeLabel>
						<InputStyle
							value={editableWebsiteUrl}
							onChange={(e) => setEditableWebsiteUrl(e.target.value)}
						/>
					</AttributeContainer>
					<AttributeContainer>
						<AttributeLabel>ENS Domain</AttributeLabel>
						<InputStyle
							value={editableEnsDomain}
							onChange={(e) => setEditableEnsDomain(e.target.value)}
						/>
					</AttributeContainer>
					<SaveChangesButton disabled={!hasChanged} onClick={handleSaveChanges}>
						Save Changes
					</SaveChangesButton>
				</ContentContainer>
			</Container>
		</ModalContainer>
	);
};

interface CoverPhotoProps {
	imageUrl: string | null;
	xPos: number;
	yPos: number;
	refetch: () => void;
	isViewingOwnProfile: boolean;
}

const CoverPhotoSectionForEditProfileModal = ({
	imageUrl,
	xPos,
	yPos,
	refetch,
	isViewingOwnProfile,
}: CoverPhotoProps) => {
	const { showLoader, hideLoader } = useLoader();
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
		showLoader();
		const response = await uploadCoverPhoto(
			imageCenter.x,
			imageCenter.y,
			selectedFiles[0]
		).then(() => {
			refetch();
			setSelectedFiles([]);
			hideLoader();
		});
	};
	const handleCancelButtonClick = () => {
		setSelectedFiles([]);
		setImageCenter({ x: 0, y: 0 });
	};
	const handleRemoveCoverPhoto = () => {
		showLoader();
		const response = removeCoverPhoto().then(() => {
			refetch();
			setShowConfirmModal(false);
			hideLoader();
		});
	};
	const frameWidth = 655;
	const frameHeight = 189;

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
					{/* {!isViewingOwnProfile ? null : (
						<ActionButtonContainer>
							{imageUrl && (
								<ActionButton onClick={() => setShowConfirmModal(true)}>
									Remove
								</ActionButton>
							)}
							<ActionButton onClick={handleEditButtonClick}>Edit</ActionButton>
						</ActionButtonContainer>
					)} */}
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
			{/* {!isViewingOwnProfile ? null : (
				<ActionButtonContainer>
					<ActionButton onClick={handleCancelButtonClick}>Cancel </ActionButton>
					<ActionButton onClick={handleSaveButtonClick}>Save</ActionButton>
				</ActionButtonContainer>
			)} */}
		</div>
	);
};
