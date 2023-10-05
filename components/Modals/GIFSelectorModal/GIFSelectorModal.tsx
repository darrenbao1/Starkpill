import {
	Container,
	HeaderContainer,
	Wrapper,
	CloseButton,
	TitleWrapper,
	Title,
} from "./GIFSelectorModal.styles";
import { useRef, useEffect } from "react";

import GifPicker, { TenorImage } from "gif-picker-react";
import { getTenorApiKey } from "../../../types/utils";

interface Props {
	onSelect: (gif: TenorImage) => void; // Add onSelect prop
	showGIFModal: boolean;
	close: () => void;
}
export const GifSelectorModal = (props: Props) => {
	const { showGIFModal, close, onSelect } = props;

	const modalRef = useRef<HTMLDivElement>(null);
	function handleGifClick(gif: TenorImage) {
		onSelect(gif);
	}
	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				modalRef.current &&
				!modalRef.current.contains(event.target as Node)
			) {
				close();
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [showGIFModal]);

	if (!showGIFModal) {
		return null;
	}

	return (
		<Wrapper>
			<Container ref={modalRef}>
				<HeaderContainer>
					<TitleWrapper>
						<Title>Choose a GIF</Title>
					</TitleWrapper>
					<CloseButton onClick={props.close} />
				</HeaderContainer>

				<GifPicker
					tenorApiKey={getTenorApiKey()}
					width="100%"
					height="90%"
					onGifClick={handleGifClick}
				/>
			</Container>
		</Wrapper>
	);
};
