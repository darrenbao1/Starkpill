import { signIn, signOut, useSession } from "next-auth/react";
import {
	GetResponseMessage,
	removeTwitterHandle,
	setTwitterHandle,
} from "../types/utils";
import { getCookie, setCookie } from "typescript-cookie";
import styled from "styled-components";
import LinkIcon from "../public/LinkwithTwt.svg";
import { useToast } from "./Provider/ToastProvider";
import { useLoader } from "./Provider/LoaderProvider";
interface Props {
	isLinked: boolean;
	refetch: () => void;
}
const TwitterButtonStyle = styled.div`
	background: none;
	color: #1d9bf0;

	border-radius: 5px; /* Rounded corners */
	text-decoration: none;
	display: inline-block;
	font-size: 16px;
	cursor: pointer;
	align-items: center;
	justify-content: center;
	display: flex;
	width: max-content;
	&:hover {
		text-decoration: underline;
	}

	&:active {
		opacity: 0.5;
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
	const { showToast } = useToast();
	const { showLoader, hideLoader } = useLoader();
	const handleLinkTwitter = async () => {
		setCookie(
			"additionalAuthParams",
			JSON.stringify({
				appPublicKey: access_token,
			})
		);
		showLoader();
		const result = await signIn("twitter").then((message) => {
			hideLoader();
		});
	};

	const removeTwitter = async () => {
		showLoader();
		await removeTwitterHandle().then((message) => {
			hideLoader();
			showToast(GetResponseMessage(message));
			refetch();
		});
	};

	return (
		<div>
			{isLinked ? (
				<TwitterButtonStyle onClick={removeTwitter}>
					<LinkIcon />
					Unlink Twitter
				</TwitterButtonStyle>
			) : (
				<TwitterButtonStyle onClick={handleLinkTwitter}>
					<LinkIcon />
					Link with Twitter
				</TwitterButtonStyle>
			)}
		</div>
	);
};
