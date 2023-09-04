import { useAccount } from "@starknet-react/core";
import { signIn, signOut, useSession } from "next-auth/react";
import { removeTwitterHandle, setTwitterHandle } from "../types/utils";

interface Props {
	isLinked: boolean;
	refetch: () => void;
}

export const TwitterSignIn = (props: Props) => {
	//destructure props
	const { isLinked, refetch } = props;
	const { data: session } = useSession();
	const handleLinkTwitter = async () => {
		const result = await signIn("twitter");
		// Check if the sign-in was successful
		if (result?.error) {
			// Handle error
			console.error("Error during sign-in:", result.error);
			return;
		}

		// Obtain the Twitter handle and wallet address
		if (session) {
			const twitterHandle = session.user!.name; // Adjust based on your user object structure
			if (twitterHandle) {
				await setTwitterHandle(twitterHandle).then(() => refetch());
			}
		}
	};

	const removeTwitter = async () => {
		await removeTwitterHandle().then(() => refetch());
	};

	return isLinked ? (
		<button onClick={removeTwitter}>Unlink Twitter</button>
	) : (
		<button onClick={handleLinkTwitter}>Link Twitter</button>
	);
};
