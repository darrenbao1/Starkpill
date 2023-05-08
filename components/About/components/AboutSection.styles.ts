import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";
export const AboutContainer = styled.div`
	position: relative;
	margin: auto;
	max-width: 1200px;
	overflow: auto;
	display: flex;
	flex-wrap: wrap;
	background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
		${(props) => props.theme.bgColor};
	font-style: normal;
	font-weight: 400;
	font-size: 20px;
	line-height: 120%;
`;
export const AboutImage = styled(Image)`
	margin: auto;
	width: 50%;
	height: 100%;
	@media screen and (max-width: 750px) {
		padding: 20px;
		width: 100%;
		height: 100%;
	}
`;
export const AboutText = styled.div`
	margin: auto;
	width: 50%;
	padding-left: 40px;
	color: white;
	overflow: auto;
	h1 {
		width: 100%;
		color: ${(props) => props.theme.primaryColor};
	}
	@media screen and (max-width: 750px) {
		width: 100%;
		padding-top: 10%;
		padding-bottom: 10%;
		padding: 0px 20px;
		h1 {
			display: flex;
			text-align: center;
			justify-content: center;
		}
	}
`;
export const StartMintButton = styled(Link)`
	border-radius: 6px;
	width: fit-content;
	color: white;
	font-size: 24px;
	padding: 15px;
	cursor: pointer;
	background-color: ${(props) => props.theme.primaryColor};
	border: 1px solid rgba(228, 228, 228, 0.6);
	display: flex;
	justify-content: center;
	align-items: center;
	&:hover {
		background-color: ${(props) => props.theme.primaryColorHover};
	}
`;
export const Paragraph1 = styled.p`
	text-align: justify;
	margin-top: -0.5rem;
	margin-bottom: 0.8rem;
`;
export const Paragraph2 = styled.p`
	margin-top: 0.8rem;
	text-align: justify;
	margin-bottom: 0.5rem;
`;
export const Paragraph3 = styled.p`
	margin-top: 0.8rem;
	margin-bottom: 2rem;
	text-align: justify;
`;
export const Paragraph4 = styled.p`
	text-align: justify;
	margin-top: -0.5rem;
	margin-bottom: 1.3rem;
`;
