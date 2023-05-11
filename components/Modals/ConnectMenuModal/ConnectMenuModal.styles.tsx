import styled from "styled-components";
import Cross from "../../../public/svgs/ConnectMenuCross.svg";
export const ModalContainer = styled.div`
	position: fixed;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	background: rgba(38, 41, 44, 0.5);
	backdrop-filter: blur(10px);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 2;
	width: 100vw;
	height: 100vh;

	@media (max-width: 820px) {
		width: 95%;
	}
`;

export const Menu = styled.div`
	position: absolute;
	align-self: center;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	background-color: #262233;

	z-index: 1;

	width: 100%;
	max-width: 400px;
	height: 100%;
	max-height: 288px;
	display: flex;
	flex-direction: column;
	color: white;
	border-radius: 15px;
`;

export const MenuClose = styled.button`
	position: absolute;
	top: 15px;
	right: 15px;
	width: 30px;
	stroke: white;
	cursor: pointer;
	transition: 0.3s;
	background-color: transparent;
	border: none;
	&:hover {
		stroke: #ff4f0a;
	}
`;

export const MenuTitle = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	height: 64px;
	padding: 16px;
	box-shadow: inset 0px -1px 0px rgba(255, 255, 255, 0.25);

	p {
		font-size: 24px;
		font-weight: 400;
		margin: 4px;
		color: #f1f1f1;
		line-height: 32px;
		text-align: center;
	}
`;

export const WalletLinks = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
	margin-top: 16px;
	align-items: center;

	p {
		font-size: 18px;
		line-height: 24px;

		text {
			color: #ff895b;
			text-decoration: underline;
		}
	}
`;

export const Button = styled.button`
	all: unset;
	color: #ffffff;
	background-color: #262233;
	width: 84%;
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	height: 64px;
	padding-left: 16px;
	padding-right: 16px;
	cursor: pointer;

	border-radius: 8px;
	p {
		font-size: 22px;
		align-self: center;
		line-height: 24px;
		font-style: normal;
		color: #ffffff;
	}
	&:hover {
		background-color: #60557e;
	}
`;
export const CloseButton = styled.button`
	position: absolute;
	top: 25px;
	right: 20px;
	width: 24px;

	cursor: pointer;
	transition: 0.3s;
	background-color: transparent;
	border: none;
	&:hover {
		stroke: #ff4f0a;
	}
`;
export const CrossIcon = styled(Cross)`
	width: 24px;
	height: 24px;
`;
export const ButtonIcon = styled.img`
	width: 32px;
	height: 32px;
	margin-top: 16px;
`;
