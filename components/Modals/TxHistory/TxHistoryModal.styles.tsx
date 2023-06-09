import { styled } from "styled-components";

export const ModalBackground = styled.div`
	display: flex; /* Hidden by default */
	justify-content: center;
	align-items: center;
	position: fixed;
	/* Stay in place */
	z-index: 3;
	/* Location of the box */
	left: 0;
	top: 0;
	width: 100%; /* Full width */
	height: 100%; /* Full height */
	overflow: auto; /* Enable scroll if needed */
	background-color: rgb(0, 0, 0); /* Fallback color */
	background-color: rgba(0, 0, 0, 0.9); /* Black w/ opacity */
`;
export const ModalWrapper = styled.div`
	position: absolute;
	display: flex;
	height: fit-content;
	flex-direction: column;
	width: 100%;
	max-width: 335px;
	max-height: 445px;

	background-color: #ffffff;

	border-radius: 12px;
`;
export const ModalContainer = styled.div`
	display: flex;
	height: fit-content;
	flex-direction: column;
	width: 100%;
	max-width: 335px;
	max-height: 445px;
	overflow: overlay;
`;
export const HeaderContainerWrapper = styled.div`
	padding-bottom: 16px;
	padding-left: 24px;
	padding-right: 24px;

	height: 64px;
	box-shadow: inset 0px -1px 0px rgba(0, 0, 0, 0.25);
`;
export const HeaderContainer = styled.div`
display: flex;
justify-content: space-between;



align-items: center;

h1 {
	font-size: 24px;
	line-height: 32px;
	color: #262626;

`;
export const ContentContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: fit-content;
	gap: 4px;

	padding: 24px;
	h1 {
		margin: 0;
		font-size: 20px;
		line-height: 27px;
		color: #262626;
	}
`;

export const ModalCloseButton = styled.span`
	display: flex;

	height: fit-content;

	align-items: center;
	justify-content: center;
	background-color: #ff4f0a;
	color: white;

	font-size: 40px;
	font-weight: bold;
	border-radius: 6px;
	z-index: 2;

	&:hover {
		cursor: pointer;
	}
`;
