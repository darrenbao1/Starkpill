import styled from "styled-components";
export const ProfilePageWrapper = styled.div`
	position: fixed;
	left: 0;
	width: 100vw;
	top: 0;
	height: 100vh;
	background-color: #1d1d1d;
	overflow-y: overlay;
`;

export const ContentWrapper = styled.div`
	position: relative;
	display: flex;
	margin: 0 auto;
	margin-top: 63px;
	max-width: 1440px;
	padding: 24px;
`;

export const LeftContainerWrapper = styled.div`
	max-width: 900px;
	padding: 25px;
	& > * {
		margin-bottom: 16px;
	}
`;
export const RightContainerWrapper = styled.div`
	max-width: 300px;
	padding-top: 25px;

	& > * {
		margin-bottom: 16px;
	}
`;
