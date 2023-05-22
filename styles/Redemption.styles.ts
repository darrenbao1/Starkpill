import styled from "styled-components";

export const RedemptionPageContainer = styled.div`
	position: fixed;
	left: 0;
	width: 100vw;
	top: 100px;
	height: calc(100vh - 100px);
	align-content: center;
	background: linear-gradient(
		180deg,
		#11114b 0%,
		rgba(17, 17, 75, 0.06) 101.96%,
		rgba(17, 17, 75, 0) 186.84%
	);
	background-position: center;
	background-size: cover;
	background-attachment: fixed;
	background-color: #1d1d1d;
	overflow-y: overlay;
	@media screen and (max-width: 750px) {
		padding-bottom: 100px;
	}
`;
export const ContentContainer = styled.div`
	position: relative;
	margin: 0 auto;
	max-width: 1440px;
	padding: 24px;
`;

export const ContentWrapper = styled.div`
	display: flex;
	margin-top: 41px;
	margin-bottom: 60px;

	@media screen and (max-width: 750px) {
		flex-direction: column;
		margin-top: 0px;
		margin-bottom: 0px;
	}
`;
export const HeaderContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: start;
	padding: 0px;
	gap: 8px;
	width: calc(100% - 300px);
	@media screen and (max-width: 750px) {
		width: 100%;
	}
`;
export const ButtonContainer = styled.div`
	width: 300px;
	display: flex;
	justify-content: center;
	align-items: center;
	@media screen and (max-width: 750px) {
		margin-top: 16px;
		width: 100%;
		margin-bottom: 32px;
	}
`;

export const HeaderText = styled.div`
	font-family: "Patrick Hand";
	font-style: normal;
	font-weight: 400;
	font-size: 40px;
	line-height: 54px;
	text-align: center;
	letter-spacing: -0.25px;
`;
export const ContentText = styled.div`
	font-family: "Patrick Hand";
	font-style: normal;
	font-weight: 400;
	font-size: 24px;
	line-height: 32px;
	letter-spacing: -0.25px;
`;

export const CardContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	grid-gap: 24px;
	@media screen and (max-width: 1150px) {
		grid-template-columns: 1fr 1fr 1fr;
	}
	@media screen and (max-width: 850px) {
		grid-template-columns: 1fr 1fr;
	}
	@media screen and (max-width: 550px) {
		grid-template-columns: 1fr;
	}
`;
