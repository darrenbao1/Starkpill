import { Container, ContentWrapper, LocationIcon } from "./SideSection.styles";
interface SideSectionProps {
	title: string;
	content: string;
}
export const SideSection = ({ title, content }: SideSectionProps) => {
	const isLocation = title === "Location";
	return (
		<Container>
			<h1>{title}</h1>

			<ContentWrapper>
				{isLocation && (
					<LocationIcon
						src="/LocationIcon.svg"
						width={24}
						height={24}
						alt="location icon"
					/>
				)}
				<p>{content}</p>
			</ContentWrapper>
		</Container>
	);
};
