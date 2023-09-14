import { Container } from "./GIFSelectorModal.styles";
import { useState, useRef, useEffect } from "react";

import GifPicker, { TenorImage } from "gif-picker-react";
import { getTenorApiKey } from "../../../types/utils";

interface Props {
	onSelect: (gif: TenorImage) => void; // Add onSelect prop
	showGIFModal: boolean;
}
export const GifSelectorModal = (props: Props) => {
	const modalRef = useRef<HTMLDivElement>(null);
	function handleGifClick(gif: TenorImage) {
		props.onSelect(gif);
	}
	//const apiKey = getTenorApiKey();
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
	}, [props.showGIFModal]);

	if (!props.showGIFModal) {
		return null;
	}

	return (
		<Container ref={modalRef}>
			<GifPicker
				tenorApiKey={"AIzaSyB04fLMjhJvt-vumwHcFeG-Mi224gHrizI"}
				width={400}
				height={350}
				onGifClick={handleGifClick}
			/>
		</Container>
	);
};
