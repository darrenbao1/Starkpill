import { useEffect, useState } from "react";
import sharedBackgroundStyles from "../styles/sharedBackground.module.css";
import ProfilePage from "../components/DynamicPages/ProfilePage";
export default function Profile() {
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
		<ProfilePage />
	) : (
		<div
			className={`container ${sharedBackgroundStyles.extendedBackground}`}></div>
	);
}
