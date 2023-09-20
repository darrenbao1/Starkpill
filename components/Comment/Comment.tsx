import {
	CaptionContainer,
	NamesContainer,
	PostContainer,
	PostContentContainer,
	ProfilePictureContainer,
} from "../ProfilePageComponents/Post/Post.styles";
import { ProfilePic } from "../ProfilePageComponents/StatusUpdateSection/StatusUpdateSection.styles";

export const Comment = () => {
	return (
		<>
			<PostContainer>
				<ProfilePictureContainer>
					<ProfilePic src="/Base_StarkPill.PNG" width={56} height={56} alt="" />
				</ProfilePictureContainer>
				<PostContentContainer>
					<NamesContainer>
						<h1>Name of profile</h1>
						<h2>@handlename</h2>
						{/* <h2>• *timestamp here* </h2>   */}
					</NamesContainer>
					<CaptionContainer>
						Impressive! Though it seems the drag feature could be improved. But
						overall it looks incredible. You’ve nailed the design and the
						responsiveness at various breakpoints works really well.
					</CaptionContainer>
				</PostContentContainer>
			</PostContainer>
		</>
	);
};
