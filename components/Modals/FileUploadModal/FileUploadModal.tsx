import { ChangeEvent, useEffect, useRef } from "react";
import {
	ModalContainer,
	Container,
	Title,
	CloseButton,
	TitleWrapper,
	Header,
	ContentContainer,
	UploadImageDropZone,
	UploadIconContainer,
	Subtitle1,
	Subtitle2,
	InputOverlay,
} from "./FileUploadModal.style";

interface Props {
	setSelectedFiles: (files: File[]) => void;
	selectedFiles: File[];
	showUploadImageModal: boolean;
	close: () => void;
}
export const FileUploadModal = (props: Props) => {
	//destruture props
	const modalRef = useRef<HTMLDivElement>(null);
	const { setSelectedFiles, selectedFiles, showUploadImageModal, close } =
		props;

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files;
		if (files) {
			const fileList = Array.from(files);
			setSelectedFiles([...selectedFiles, ...fileList]);
		}
		close();
	};
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				modalRef.current &&
				!modalRef.current.contains(event.target as Node)
			) {
				props.close();
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [showUploadImageModal]);

	if (!showUploadImageModal) {
		return null;
	}

	return (
		<ModalContainer>
			<Container ref={modalRef}>
				<Header>
					<TitleWrapper>
						<Title>Upload photos/videos</Title>
					</TitleWrapper>
					<CloseButton onClick={close} />
				</Header>
				<ContentContainer>
					<UploadImageDropZone>
						<InputOverlay
							type="file"
							accept=".jpg, .jpeg, .png" // Specify the allowed file types
							multiple // Allow multiple file selection
							onChange={handleFileChange}
						/>
						<UploadIconContainer />
						<Subtitle1>Add photos/videos</Subtitle1>
						<Subtitle2>or drag and drop</Subtitle2>
					</UploadImageDropZone>
				</ContentContainer>
			</Container>
		</ModalContainer>
	);
};
