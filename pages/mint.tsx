import { useEffect, useState } from "react";
import MintingPage from "../components/DynamicPages/MintingPage";
import sharedBackgroundStyles from "../styles/sharedBackground.module.css";
const Mint = () => {
	const [shouldRender, setShouldRender] = useState(false);
	useEffect(() => {
		let timeoutId: NodeJS.Timeout | null = null;

		if (typeof window !== "undefined") {
			timeoutId = setTimeout(() => {
				setShouldRender(true);
			}, 100);
		}

		return () => {
			if (timeoutId) {
				clearTimeout(timeoutId);
			}
		};
	}, []);

	return shouldRender ? (
		<MintingPage />
	) : (
		<div
			className={`container ${sharedBackgroundStyles.extendedBackground}`}></div>
	);
};
export default Mint;
