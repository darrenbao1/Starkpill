import { useEffect, useState } from "react";
import { FeedsPage } from "../components/DynamicPages/FeedsPage";

export default function feeds() {
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
		<div className="pageContainer">
			<FeedsPage />
		</div>
	) : (
		<></>
	);
}
