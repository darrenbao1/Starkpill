import { useAccount } from "@starknet-react/core";
import { signIn, signOut, useSession } from "next-auth/react";

export const TwitterSignIn = () => {
	const { data: session } = useSession();
	const { address } = useAccount();
	const handleSignIn = async () => {
		const result = await signIn("twitter");

		// Check if the sign-in was successful
		if (result?.error) {
			// Handle error
			return;
		}

		// Obtain the Twitter handle and wallet address
		if (session && address) {
			const twitterHandle = session.user!.name; // Adjust based on your user object structure
			const walletAddress = address; // Obtain this from your application logic
			console.log(twitterHandle, walletAddress);
		}
		// Make a call to your NestJS API
		// fetch('/api/your-endpoint', {
		//   method: 'POST',
		//   headers: { 'Content-Type': 'application/json' },
		//   body: JSON.stringify({ twitterHandle, walletAddress })
		// })
		//   .then(response => response.json())
		//   .then(data => {
		//     // Handle the response from your API
		//     // Log the user out
		//     signOut();
		//   })
		//   .catch(error => {
		//     // Handle any errors from the API call
		//   });
	};

	return <button onClick={handleSignIn}>Sign in with Twitter</button>;
};
