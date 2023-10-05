import {
	Close,
	Header,
	ImageContainer,
	ImageContainerWrapper,
	PostImageModalContainer,
	PostImageModalWrapper,
} from "./PostImageModal.styles";

interface Props {
	imageurl: string;
	close: () => void;
}
export const PostImageModal = (props: Props) => {
	const { imageurl, close } = props;

	return (
		<PostImageModalWrapper>
			<PostImageModalContainer>
				<Header>
					<Close onClick={close} />
				</Header>
				<ImageContainerWrapper>
					<ImageContainer
						src={imageurl}
						alt=""
						sizes="100vw"
						style={{ width: "auto", height: "auto" }}
						width={0}
						height={0}
					/>
				</ImageContainerWrapper>
			</PostImageModalContainer>
		</PostImageModalWrapper>
	);
};
