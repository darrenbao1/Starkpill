import { signIn, signOut, useSession } from "next-auth/react";
import { removeTwitterHandle, setTwitterHandle } from "../types/utils";
import { getCookie, setCookie } from "typescript-cookie";
import styled from "styled-components";
import TwitterIcon from "../public/svgs/twitterIcon.svg";
interface Props {
	isLinked: boolean;
	refetch: () => void;
}
const TwitterButtonStyle = styled.div`
	background-color: #1da1f2; /* Twitter brand color */
	color: #fff; /* White text color */
	padding: 5px 10px; /* Adjust padding as needed */
	border-radius: 5px; /* Rounded corners */
	text-decoration: none;
	display: inline-block;
	cursor: pointer;
	align-items: center;
	justify-content: center;
	display: flex;
	width: max-content;
	&:hover {
		background-color: #0d8eff; /* Hover color */
	}

	&:active {
		background-color: #007acc; /* Active color */
	}
`;

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
	};

	const removeTwitter = async () => {
		await removeTwitterHandle().then(() => {
			refetch();
		});
	};

	return (
		<div>
			{isLinked ? (
				<TwitterButtonStyle onClick={removeTwitter}>
					<TwitterIcon />
					&nbsp; Unlink Twitter
				</TwitterButtonStyle>
			) : (
				<TwitterButtonStyle onClick={handleLinkTwitter}>
					<TwitterIcon />
					&nbsp; Link Twitter
				</TwitterButtonStyle>
			)}
		</div>
	);
};
