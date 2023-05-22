import { CollabProject } from "../../../types/interfaces";
import {
	ProjectCardContainer,
	Header,
	ImageContainer,
	ProjectImage,
} from "./ProjectCard.styles";
export const ProjectCard = (props: {
	project: CollabProject;
	onClick: () => void;
}) => {
	return (
		<ProjectCardContainer onClick={props.onClick}>
			<Header>{props.project.name}</Header>
			<ImageContainer>
				<ProjectImage
					src={props.project.imageUrl}
					alt={props.project.name}
					width={135}
					height={135}
				/>
			</ImageContainer>
		</ProjectCardContainer>
	);
};
