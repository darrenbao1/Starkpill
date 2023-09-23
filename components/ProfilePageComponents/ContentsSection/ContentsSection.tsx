import { Post } from "../Post";
import {
	ContentsSectionContainer,
	EmptyIcon,
	HeaderContainer,
	NoPostsContainer,
} from "./ContentsSection.styles";
import { PostMinimal } from "../../../types/interfaces";

interface Props {
	postArray: PostMinimal[];
}

export const ContentsSection = (props: Props) => {
	const { postArray } = props;
	return (
		<ContentsSectionContainer>
			<HeaderContainer> Posts</HeaderContainer>
			{postArray.length === 0 && (
				<NoPostsContainer>
					<EmptyIcon />
					No posts yet
				</NoPostsContainer>
			)}
			{postArray.map((post, index) => {
				// if there are no posts, return "No posts yet"

				return <Post postMinimal={post} key={index} />;
			})}
		</ContentsSectionContainer>
	);
};
