import styled from "styled-components";
export const NoInstalledWalletModalWrapper = styled.div`
	padding-bottom: 16px;
	display: flex;
	flex-direction: column;
`;
export const Menu_text = styled.text`
	font-weight: bold;
	font-size: 18px;
	line-height: 24px;

	text-align: center;
`;
export const Menu_textWrapper = styled.div`
	display: flex;
	margin-top: 24px;
	margin-left: 7px;
	margin-right: 7px;
`;
export const ButtonWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	@media (max-width: 500px) {
		margin: 0 20px;
	}
`;
export const Button = styled.a`
	all: unset;
	color: white;
	background-color: none;
	width: 100%;

	display: flex;
	align-items: center;
	flex-direction: row;
	justify-content: space-between;
	border-radius: 15px;
	height: 64px;

	padding: 10px 16px 10px 16px;
	cursor: pointer;

	&:hover {
		background-color: #60557e;
	}
`;

export const Button_icon = styled.img`
	width: 32px;
	height: 32px;
	margin-left: 12px;
`;

export const Button_text = styled.text`
	font-size: 22px;
`;
