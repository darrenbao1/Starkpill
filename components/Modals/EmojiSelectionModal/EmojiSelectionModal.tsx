import EmojiPicker, { EmojiClickData, Emoji } from "emoji-picker-react";
import { useState } from "react";
import styles from "../../../styles/EmojiSelection.module.css";
import { useRef, useEffect } from "react";

interface Props {
	onSelect: (emoji: string) => void; // Add onSelect prop
	close: () => void;
}
export const EmojiSelectionModal = (props: Props) => {
	const [selectedEmoji, setSelectedEmoji] = useState<string>("1f60a");
	const modalRef = useRef<HTMLDivElement>(null);

	function onClick(emojiData: EmojiClickData, event: MouseEvent) {
		setSelectedEmoji(emojiData.emoji);
		props.onSelect(emojiData.emoji);
	}
	const { close } = props;
	const handleClickOutside = (event: MouseEvent) => {
		if (
			modalRef.current &&
			!(event.target as HTMLElement).closest(".EmojiSelectionModal")
		) {
			console.log("clicked outside");
			close();
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<div className={styles.EmojiSelectionModal} ref={modalRef}>
			{/* <div className={styles.showEmoji}>
				<h3>Your selected Emoji is:</h3>
				{selectedEmoji ? <Emoji unified={selectedEmoji} size={77} /> : null}
			</div> */}
			<EmojiPicker onEmojiClick={onClick} autoFocusSearch={false} />
		</div>
	);
};
