import styled, { css } from "styled-components";

export const ClaimedLabel = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 2px 16px;
	font-family: "Patrick Hand";
	font-style: normal;
	font-weight: 400;
	font-size: 18px;
	line-height: 24px;
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
`;

export const NftCardContainer = styled.div<{ isClaimed?: boolean }>`
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
	&::after {
		content: "";
		position: absolute;
		inset: 0;
		border-radius: 16px;
		background: black;
		opacity: ${(props) => (!props.isClaimed ? 0 : 0.5)};
		cursor: ${(props) => (!props.isClaimed ? "pointer" : "not-allowed")};
		&:before {
			content: "";
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			width: fit-content;
			height: fit-content;
			pointer-events: none;
		}
	}
	${(props) =>
		props.isClaimed &&
		css`
			&::after:before {
				content: "";
				${ClaimedLabel};
			}
		`}
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
