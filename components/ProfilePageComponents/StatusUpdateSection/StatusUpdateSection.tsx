import { EmojiSelectionModal } from "../../Modals/EmojiSelectionModal/EmojiSelectionModal";
import { createPost } from "../../../types/utils";
import {
	StatusUpdateSectionContainer,
	ProfilePic,
	StatusUpdateInput,
	UpdateWrapper,
	IconsWrapper,
	UploadPicIcon,
	InsertGIFIcon,
	InsertEmojiIcon,
	PostButton,
	BottomContainer,
} from "./StatusUpdateSection.styles";
import { useState } from "react";
import { GifSelectorModal } from "../../Modals/GIFSelectorModal/GIFSelectorModal";
import { TenorImage } from "gif-picker-react";
import Image from "next/image";
import { FileUploadModal } from "../../Modals/FileUploadModal/FileUploadModal";
import { PreviewImage } from "./PreviewImage/PreviewImage";

interface Props {
	profilePictureUrl: string;
	refetch: () => void;
}
export const StatusUpdateSection = (props: Props) => {
	const [inputValue, setInputValue] = useState("");

	const [showEmojiModal, setShowEmojiModal] = useState(false);
	const [showUploadImageModal, setShowUploadImageModal] = useState(false);
	const [gifArray, setGifArray] = useState<string[]>([]);
	// const [selectedGIF, setSelectedGIF] = useState<TenorImage>(null!);
	const [showGIFModal, setShowGIFModal] = useState(false);

	const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

	const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (event.key === "Enter" && !event.shiftKey) {
			event.preventDefault();
			const input = event.target as HTMLTextAreaElement;
			input.value += "\n";
			handleInputChange(event); // Trigger handleInputChange to update the height
		}
	};

	const handleInputChange = (
		event: React.SyntheticEvent<HTMLTextAreaElement>
	) => {
		const input = event.target as HTMLTextAreaElement;
		input.style.height = "auto";

		input.style.height = input.scrollHeight + "px";
		setInputValue(input.value); // Update state variable with textarea content
		setShowEmojiModal(false);
	};
	//handleOnClick, if showEmojiModal is true, then close emoji modal, else open emoji modal
	const handleOnClick = () => {
		if (showEmojiModal) {
			setShowEmojiModal(false);
		} else {
			setShowEmojiModal(true);
		}
	};
	const handleGIFClick = () => {
		if (showGIFModal) {
			setShowGIFModal(false);
		} else {
			setShowGIFModal(true);
		}
	};

	const handleGifSelect = (gif: TenorImage) => {
		setShowGIFModal(false);
		const gifUrl = gif.url;
		//append gifUrl to the gifArray state variable
		setGifArray([...gifArray, gifUrl]);
	};
	const handleEmojiSelect = (emoji: string) => {
		setInputValue(inputValue + emoji);
		setShowEmojiModal(false);
	};
	const close = () => {
		setShowEmojiModal(false);
	};

	const handlePostButtonClick = async () => {
		await createPost(inputValue, selectedFiles, gifArray).then(() => {
			setInputValue("");
			setSelectedFiles([]);
			setGifArray([]);
			props.refetch();
		});
	};
	const handleRemoveGif = (index: number) => {
		const newSelectedFiles = [...gifArray];
		newSelectedFiles.splice(index, 1);
		setGifArray(newSelectedFiles);
	};
	const handleRemoveImage = (index: number) => {
		const newSelectedFiles = [...selectedFiles];
		newSelectedFiles.splice(index, 1);
		setSelectedFiles(newSelectedFiles);
	};
	const shouldShowPreviewImage =
		gifArray.length > 0 || selectedFiles.length > 0;
	return (
		<StatusUpdateSectionContainer>
			<ProfilePic src={props.profilePictureUrl} width={56} height={56} alt="" />
			<UpdateWrapper>
				<StatusUpdateInput
					placeholder="What's happening?"
					onKeyDown={handleKeyDown}
					onChange={handleInputChange}
					style={{ height: "50px" }}
					value={inputValue}
				/>

				{shouldShowPreviewImage && (
					<PreviewImage
						gifArray={gifArray}
						imageArray={selectedFiles.map((file) => URL.createObjectURL(file))}
						removeImage={handleRemoveImage}
						removeGif={handleRemoveGif}
					/>
				)}

				<BottomContainer>
					<IconsWrapper>
						<UploadPicIcon onClick={() => setShowUploadImageModal(true)} />
						<InsertGIFIcon onClick={handleGIFClick} />
						<InsertEmojiIcon onClick={handleOnClick} />
						<EmojiSelectionModal
							onSelect={handleEmojiSelect}
							close={close}
							showEmojiModal={showEmojiModal}
						/>
					</IconsWrapper>
					<PostButton
						className={inputValue ? "active" : ""}
						onClick={handlePostButtonClick}
						disabled={inputValue.trim() !== "" ? false : true}>
						Post
					</PostButton>
				</BottomContainer>
			</UpdateWrapper>

			<GifSelectorModal
				onSelect={handleGifSelect}
				showGIFModal={showGIFModal}
				close={() => setShowGIFModal(false)}
			/>
			<FileUploadModal
				setSelectedFiles={setSelectedFiles}
				selectedFiles={selectedFiles}
				showUploadImageModal={showUploadImageModal}
				close={() => setShowUploadImageModal(false)}
			/>
		</StatusUpdateSectionContainer>
	);
};
