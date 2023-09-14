import { Container } from "./GIFSelectorModal.styles";
import { useState, useRef } from "react";

import GifPicker, { TenorImage } from "gif-picker-react";

interface Props {
	onSelect: (gif: TenorImage) => void; // Add onSelect prop
}
export const GifSelectorModal = (props: Props) => {
	const [selectedGif, setSelectedGif] = useState<TenorImage>(null!);
	const TENOR_API_KEY = "AIzaSyB04fLMjhJvt-vumwHcFeG-Mi224gHrizI";
	const modalRef = useRef<HTMLDivElement>(null);

	function handleGifClick(gif: TenorImage) {
		console.log("gif", gif);
		setSelectedGif(gif);
		props.onSelect(gif);
	}

	return (
		<Container>
			{/* <div>
				Your selected GIF is:
				{selectedGif && (
					<>
						<img
							src={selectedGif.url}
							className="gif-preview"
							alt="Selected GIF"
						/>
						<a
							href={selectedGif.shortTenorUrl}
							target="_blank"
							rel="noreferrer">
							{selectedGif.shortTenorUrl}
						</a>
					</>
				)}
			</div> */}
			<GifPicker
				tenorApiKey={TENOR_API_KEY}
				width={400}
				height={350}
				onGifClick={handleGifClick}
			/>
		</Container>
	);
};
