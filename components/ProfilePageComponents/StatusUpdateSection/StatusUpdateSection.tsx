import { EmojiSelectionModal } from "../../Modals/EmojiSelectionModal/EmojiSelectionModal";
import { createPost } from "../../../types/utils";
import FileUploadComponent from "../../FileUploadButton/FileUploadButton";
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
import { useState, useCallback, useEffect } from "react";
import { GifSelectorModal } from "../../Modals/GIFSelectorModal/GIFSelectorModal";
import { TenorImage } from "gif-picker-react";

interface Props {
	profilePictureUrl: string;
}
export const StatusUpdateSection = (props: Props) => {
	const [inputValue, setInputValue] = useState("");

	const [showEmojiModal, setShowEmojiModal] = useState(false);
	const [selectedGIF, setSelectedGIF] = useState<TenorImage>(null!);
	const [showGIFModal, setShowGIFModal] = useState(false);

	const [selectedFile, setSelectedFile] = useState<File | null>(null);

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
		setSelectedGIF(gif);
		setShowGIFModal(false);
		const gifUrl = gif.url;
		setInputValue(`${inputValue} ${(<img src="${gifUrl}" alt="" />)}`);
	};
	const handleEmojiSelect = (emoji: string) => {
		setInputValue(inputValue + emoji);
		setShowEmojiModal(false);
	};
	const close = () => {
		setShowEmojiModal(false);
	};

	const handlePostButtonClick = async () => {
		await createPost(inputValue, selectedFile);
	};

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
				<BottomContainer>
					<IconsWrapper>
						{/* <FileUploadComponent
							setSelectedFile={setSelectedFile}
							selectedFile={selectedFile}
						/> */}
						<UploadPicIcon />
						<InsertGIFIcon onClick={handleGIFClick} />
						<InsertEmojiIcon onClick={handleOnClick} />
					</IconsWrapper>
					<PostButton
						className={inputValue ? "active" : ""}
						onClick={handlePostButtonClick}
						disabled={inputValue.trim() !== "" ? false : true}>
						Post
					</PostButton>
				</BottomContainer>
			</UpdateWrapper>
			<EmojiSelectionModal
				onSelect={handleEmojiSelect}
				close={close}
				showEmojiModal={showEmojiModal}
			/>

			{showGIFModal && <GifSelectorModal onSelect={handleGifSelect} />}
		</StatusUpdateSectionContainer>
	);
};
