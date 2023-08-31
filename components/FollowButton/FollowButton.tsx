import { useState } from "react";
import { StyledButton } from "./FollowButton.styles";
import Image from "next/image";
import styled from "styled-components";
import { followUser, unfollowUser } from "../../types/utils";

const IsFollowingButton = styled.div`
	/* your styles here */
`;
interface Props {
	followAddress: string;
	refetch: () => void;
	isFollowing: boolean;
}
export const FollowButton = (props: Props) => {
	const [isLoading, setIsLoading] = useState(false);
	const isFollowing = props.isFollowing;
	const handleClick = async () => {
		setIsLoading(true);
		if (!isFollowing) {
			await followUser(props.followAddress).then(() => {
				props.refetch();
				setIsLoading(false);
			});
		} else {
			await unfollowUser(props.followAddress).then(() => {
				props.refetch();
				setIsLoading(false);
			});
		}
	};

	return (
		<StyledButton
			onClick={handleClick}
			isFollowing={isFollowing}
			data-testid="follow-button">
			{isFollowing ? (
				<span>Following</span>
			) : isLoading ? (
				<>
					<Image src="/LoadingFollowIcon.svg" width={24} height={24} alt="" />
					<span>Follow</span>
				</>
			) : (
				<>
					<Image src="/FollowIcon.svg" width={16} height={16} alt="" />
					<span>Follow</span>
				</>
			)}

			{/* {isFollowing ? (
				<span>Following</span>
			) : (
				<>
					<Image src="/FollowIcon.svg" width={16} height={16} alt="" />
					<span>Follow</span>
				</>
			)}
			{isLoading && (
				<>
					<Image src="/LoadingFollowIcon.svg" width={24} height={24} alt="" />
					<span>Follow</span>
				</>
			)} */}
		</StyledButton>
	);
};
