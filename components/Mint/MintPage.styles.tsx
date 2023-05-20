import styled, { css } from "styled-components";
import Image from "next/image";
import EditIconn from "../../public/svgs/Edit.svg";
interface ButtonProps {
	hasEditedFace?: boolean;
}

export const ContentContainer = styled.div`
	position: relative;
	margin: auto;
	max-width: 1440px;
	display: flex;
	height: calc(100vh - 100px);
	@media screen and (max-width: 750px) {
		align-items: center;
		justify-content: center;
	}
`;

export const BackgroundFade = styled.div`
	position: fixed;
	width: calc(100vw + 5px);
	height: calc(100vh - 100px);
	background: linear-gradient(
		269.9deg,
		rgba(0, 0, 0, 0.792) 53.43%,
		rgba(0, 0, 0, 0.7755) 96.05%,
		rgba(0, 0, 0, 0.784406) 99.91%,
		rgba(0, 0, 0, 0) 99.92%
	);
	z-index: -1;
	margin-left: -5px;
`;

export const ImageContainer = styled.div`
	aspect-ratio: 1/1;
	min-width: 212px;
	max-width: 377px;
	width: 50%;
	position: relative;
	padding: 1px;
	border: 1px solid rgba(228, 228, 228, 0.6);
	border-radius: 6px;
	margin-bottom: 1rem;
`;

export const ImageLayer = styled(Image)`
	position: absolute;
	top: 0;
	left: 0;
	max-width: 375px;
	min-width: 210px;
	width: 100%;
	object-fit: contain;
	border-radius: 3px;
`;

export const TraitsContainer = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	margin: auto;
	button {
		cursor: pointer;
		color: white;
		max-width: 375px;
		min-width: 210px;
		width: 50%;
		font-family: inherit;
		font-size: 32px;
		background: #ff4f0a;
		margin-bottom: 1rem;
		border: 1px solid rgba(228, 228, 228, 0.6);
		box-shadow: 0px 4px 4px rgba(50, 50, 71, 0.08),
			0px 4px 8px rgba(50, 50, 71, 0.06);
		border-radius: 6px;
		text-align: center;
		padding: 11px 15px;

		&:hover {
			background-color: #fe7641;
		}
	}
`;

export const EditButton = styled.div`
	background: #29296e;
	color: white;
	max-width: 375px;
	min-width: 210px;
	width: 50%;
	border: 1px solid rgba(228, 228, 228, 0.6);
	box-shadow: 0px 4px 4px rgba(50, 50, 71, 0.08),
		0px 4px 8px rgba(50, 50, 71, 0.06);
	border-radius: 6px;
	font-size: 32px;
	cursor: pointer;
	padding: 11px 15px;
	margin-bottom: 1rem;
	display: flex;

	&:hover {
		color: grey;
		border-color: grey;
	}
`;
export const DefaultButton = styled.div`
	cursor: pointer;
	color: white;
	max-width: 375px;
	min-width: 210px;
	width: 50%;
	font-family: inherit;
	font-size: 32px;
	background: #ff4f0a;
	margin-bottom: 1rem;
	border: 1px solid rgba(228, 228, 228, 0.6);
	box-shadow: 0px 4px 4px rgba(50, 50, 71, 0.08),
		0px 4px 8px rgba(50, 50, 71, 0.06);
	border-radius: 6px;
	text-align: center;
	padding: 11px 15px;

	&:hover {
		background-color: #fe7641;
	}
`;

export const StyledButton = styled.div<ButtonProps>`
	${({ hasEditedFace }) =>
		hasEditedFace
			? css`
					background: #29296e;
					color: white;
					max-width: 375px;
					min-width: 210px;
					width: 50%;
					border: 1px solid rgba(228, 228, 228, 0.6);
					box-shadow: 0px 4px 4px rgba(50, 50, 71, 0.08),
						0px 4px 8px rgba(50, 50, 71, 0.06);
					border-radius: 6px;
					font-size: 32px;
					cursor: pointer;
					padding: 11px 15px;
					margin-bottom: 1rem;
					display: flex;

					&:hover {
						color: grey;
						border-color: grey;
					}
			  `
			: css`
					cursor: pointer;
					color: white;
					max-width: 375px;
					min-width: 210px;
					width: 50%;
					font-family: inherit;
					font-size: 32px;
					background: #ff4f0a;
					margin-bottom: 1rem;
					border: 1px solid rgba(228, 228, 228, 0.6);
					box-shadow: 0px 4px 4px rgba(50, 50, 71, 0.08),
						0px 4px 8px rgba(50, 50, 71, 0.06);
					border-radius: 6px;
					text-align: center;
					padding: 11px 15px;

					&:hover {
						background-color: #fe7641;
					}
			  `}
`;
export const HasEdited = styled.div`
	margin-right: 0;
	margin-left: auto;
`;
export const EditIcon = styled(EditIconn)`
	margin-right: 0;
	margin-left: auto;
	align-self: center;
`;

export const CompanyLogo = styled(Image)`
	position: fixed;
	bottom: 0px;
	left: 0px;
	margin: 14px;

	@media screen and (max-width: 750px) {
		visibility: hidden;
	}
`;
