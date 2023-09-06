import { signIn, signOut, useSession } from "next-auth/react";
import { removeTwitterHandle, setTwitterHandle } from "../types/utils";
import { getCookie, setCookie } from "typescript-cookie";
interface Props {
	isLinked: boolean;
	refetch: () => void;
}

export const TwitterSignIn = (props: Props) => {
	const fetchTwitterHandle = async () => {
		try {
			const response = await fetch("/api/search");
			const data = await response.json();
			if (response.ok) {
				return data.data.twitterHandle;
			} else {
				console.error(data.status);
			}
		} catch (error) {
			console.error("Error", error);
		}
	};
	//destructure props
	const { isLinked, refetch } = props;
	const { data: session } = useSession();
	//get access_token from localStorage
	const access_token = localStorage.getItem("access_token");
	const handleLinkTwitter = async () => {
		setCookie(
			"additionalAuthParams",
			JSON.stringify({
				appPublicKey: access_token,
			})
		);
		const result = await signIn("twitter");

		// Check if the sign-in was successful
		// if (result?.error) {
		// 	// Handle error
		// 	console.error("Error during sign-in:", result.error);
		// 	return;
		// }
		// if (session) {
		// 	fetchTwitterHandle()
		// 		.then((userName) => {
		// 			setTwitterHandle(userName).then(() => {
		// 				refetch();
		// 			});
		// 		})
		// 		.catch((error) => {
		// 			console.error("Error fetching Twitter handle:", error);
		// 		});
		// }
	};

	const removeTwitter = async () => {
		await removeTwitterHandle().then(() => {
			refetch();
		});
	};

	return (
		<div>
			{isLinked ? (
				<button onClick={removeTwitter}>Unlink Twitter</button>
			) : (
				<button onClick={handleLinkTwitter}>Link Twitter</button>
			)}
		</div>
	);
};
