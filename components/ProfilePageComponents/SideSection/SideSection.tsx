import { Container, ContentWrapper, LocationIcon } from "./SideSection.styles";
interface SideSectionProps {
	title: string;
	content: string;
}
export const SideSection = ({ title, content }: SideSectionProps) => {
	const isLocation = title === "Location";
	const isWebsite = title === "Website";
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
				{!isWebsite ? (
					<p>{content}</p>
				) : (
					<a href={content} target="_blank" rel="noopener noreferrer">
						{content}
					</a>
				)}
			</ContentWrapper>
		</Container>
	);
};
