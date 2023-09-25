import { useRouter } from "next/router";

export default function Unauthorized() {
	const router = useRouter();
	const { twitterHandle } = router.query;
	return <div>{twitterHandle} is already linked to another wallet</div>;
}
