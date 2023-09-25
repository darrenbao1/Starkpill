import { Delete, KebabContainer, KebabOption } from "./PostKebabMenu.styles";

export const PostKebabMenu = () => {
	return (
		<KebabContainer>
			<KebabOption>
				<Delete /> Delete Post
			</KebabOption>
		</KebabContainer>
	);
};
