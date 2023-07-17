import { useEffect, useState } from "react";
import MintingPage from "../components/DynamicPages/MintingPage";
const Mint = () => {
	const [shouldRender, setShouldRender] = useState(false);
	useEffect(() => {
		if (typeof window !== "undefined") {
			setShouldRender(true);
		}
	}, []);

	return shouldRender ? <MintingPage /> : null;
};
export default Mint;
