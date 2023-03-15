import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export function Disconnect(props: { address: string }) {
	const router = useRouter();

	useEffect(() => {
		// refresh the same page with different parameters.
		const timeoutId = setTimeout(() => {
			router.push("/mypills?walletAddress=" + props.address);
		}, 1);
		return () => clearTimeout(timeoutId);
	}, [router]);

	return (
		<div>
			<p>account changed detected.</p>
		</div>
	);
}
