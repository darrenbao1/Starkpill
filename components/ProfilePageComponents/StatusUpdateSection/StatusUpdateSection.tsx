import {
	StatusUpdateSectionContainer,
	ProfilePic,
	StatusUpdateInput,
} from "./StatusUpdateSection.styles";
interface Props {
	profilePictureUrl: string;
}
export const StatusUpdateSection = (props: Props) => {
	return (
		<StatusUpdateSectionContainer>
			<ProfilePic src={props.profilePictureUrl} width={56} height={56} alt="" />
			<StatusUpdateInput placeholder="What's happening?" />
		</StatusUpdateSectionContainer>
	);
};
