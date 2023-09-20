import { Post } from "../Post";
import {
	ContentsSectionContainer,
	HeaderContainer,
} from "./ContentsSection.styles";
import { UserProfile, PostMinimal } from "../../../types/interfaces";
import { shortenAddress } from "../../../types/utils";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
interface Props {
	postArray: PostMinimal[];
}

export const ContentsSection = (props: Props) => {
	const { postArray } = props;
	return (
		<ContentsSectionContainer>
			<HeaderContainer> Posts</HeaderContainer>
			{postArray.map((post, index) => {
				return <Post postMinimal={post} key={index} />;
			})}
		</ContentsSectionContainer>
	);
};
