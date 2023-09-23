import EmojiPicker, { EmojiClickData, Emoji } from "emoji-picker-react";

import styles from "../../../styles/EmojiSelection.module.css";
import { useRef, useEffect } from "react";

interface Props {
	onSelect: (emoji: string) => void;
	close: () => void;
	showEmojiModal: boolean;
}
export const EmojiSelectionModal = (props: Props) => {
	const modalRef = useRef<HTMLDivElement>(null);

	function onClick(emojiData: EmojiClickData, event: MouseEvent) {
		props.onSelect(emojiData.emoji);
	}
	const { close } = props;

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
	}, [props.showEmojiModal, close]);

	if (!props.showEmojiModal) {
		return null;
	}

	return (
		<div className={styles.EmojiSelectionModal} ref={modalRef}>
			<EmojiPicker onEmojiClick={onClick} autoFocusSearch={false} />
		</div>
	);
};
