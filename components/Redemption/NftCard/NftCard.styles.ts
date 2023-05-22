import Image from "next/image";
import styled, { css } from "styled-components";
export const NftCardContainer = styled.div`
	display: flex;
	position: relative;
	flex-direction: column;
	align-items: center;
	padding: 24px;
	gap: 18px;
	background: rgba(255, 255, 255, 0.05);
	border-radius: 16px;
	width: fit-content;
	cursor: pointer;
	border: 1px solid transparent;
	&::before {
		content: "";
		position: absolute;
		inset: 0;
		border-radius: 16px;
		padding: 1px;
		background: linear-gradient(100.92deg, #a259ff 13.57%, #ff6250 97.65%);
		-webkit-mask: linear-gradient(#fff 0 0) content-box,
			linear-gradient(#fff 0 0);
		-webkit-mask-composite: xor;
		mask-composite: exclude;
	}
	@media screen and (max-width: 750px) {
		width: 100%;
	}
`;
const HeaderStyle = css`
	font-family: "Patrick Hand";
	font-style: normal;
	font-weight: 400;
	font-size: 32px;
	line-height: 30px;
`;
export const Header = styled.div`
	${HeaderStyle}
`;
const tokenIdStyle = css`
	font-family: "Patrick Hand";
	font-style: normal;
	font-weight: 400;
	font-size: 24px;
	line-height: 30px;
`;
export const TokenId = styled.div`
	${tokenIdStyle}
`;

export const ImageContainer = styled.img`
	max-width: 316px;
	max-height: 316px;
	width: 100%;
	height: 100%;
`;
