import { Post } from "../Post";
import {
	ContentsSectionContainer,
	HeaderContainer,
} from "./ContentsSection.styles";
import { UserProfile } from "../../../types/interfaces";
import { shortenAddress } from "../../../types/utils";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
interface Props {
	profilePictureUrl: string;
	profileObject: UserProfile;
}

export const ContentsSection = (props: Props) => {
	const { profilePictureUrl, profileObject } = props;

	return (
		<ContentsSectionContainer>
			<HeaderContainer> Posts</HeaderContainer>
			<Post
				profilePictureUrl={
					profilePictureUrl ? profilePictureUrl : "/basepill.png"
				}
				profileObject={profileObject}
			/>
		</ContentsSectionContainer>
	);
};
