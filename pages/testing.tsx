import { useEffect } from "react";

export default function Test() {
	useEffect(() => {
		console.log("testing");
	}, []);
	return <div>testing</div>;
}
