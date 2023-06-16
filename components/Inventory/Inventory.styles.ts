import styled from "styled-components";
export const InventoryWrapper = styled.div`
	width: 100%;
	max-width: 1440px;
	padding: 24px;
	margin: auto;
`;
export const HeaderColumn = styled.div`
	width: 100%;
	font-family: "Patrick Hand";
	font-style: normal;
	font-weight: 400;
	font-size: 24px;
	line-height: 100%;
	margin-top: 24px;
	margin-bottom: 16px;
`;

export const CardContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
	grid-gap: 12px;
	@media screen and (max-width: 1350px) {
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
	}
	@media screen and (max-width: 1130px) {
		grid-template-columns: 1fr 1fr 1fr 1fr;
	}
	@media screen and (max-width: 900px) {
		grid-template-columns: 1fr 1fr 1fr;
	}
	@media screen and (max-width: 670px) {
		grid-template-columns: 1fr 1fr;
	}
	@media screen and (max-width: 450px) {
		grid-template-columns: 1fr;
		align-items: center;
		justify-items: center;
	}
`;
export const LoadingWrapper = styled.div`
	display: flex;
	margin-top: 10%;

export const ShowAllButton = styled.div`
	border: 2px solid #ffffff;
	border-radius: 3px;
	padding: 8px 24px;
	color: #ffffff;
	font-family: "Patrick Hand";
	font-style: normal;
	font-weight: 400;
	font-size: 24px;
	line-height: 100%;
	width: fit-content;
	margin: auto;
	cursor: pointer;
	margin-top: 32px;
`;
