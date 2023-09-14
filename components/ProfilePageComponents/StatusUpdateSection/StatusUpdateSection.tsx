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
import { useState } from "react";
interface Props {
	profilePictureUrl: string;
}
export const StatusUpdateSection = (props: Props) => {
	const [inputValue, setInputValue] = useState("");
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
				/>
				<BottomContainer>
					<IconsWrapper>
						<FileUploadComponent
							setSelectedFile={setSelectedFile}
							selectedFile={selectedFile}
						/>
						<UploadPicIcon />
						<InsertGIFIcon />
						<InsertEmojiIcon />
					</IconsWrapper>
					<PostButton
						className={inputValue ? "active" : ""}
						onClick={handlePostButtonClick}
						disabled={inputValue.trim() !== "" ? false : true}>
						Post
					</PostButton>
				</BottomContainer>
			</UpdateWrapper>
		</StatusUpdateSectionContainer>
	);
};
