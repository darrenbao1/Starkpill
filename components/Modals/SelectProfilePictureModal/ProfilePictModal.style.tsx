import styled from "styled-components";
import CloseIcon from "../../../public/SocialConnectsCLOSE.svg";
import Image from "next/image";
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
`;
export const Container = styled.div`
	position: relative;
	display: flex;
	width: 849px;
	padding: 16px 0px 0px 0px;
	flex-direction: column;
	max-height: 50vh;
	align-items: center;
	background: #fff;
	border-radius: 8px;
`;
export const HeaderContainer = styled.div`
	display: flex;
	width: 100%;
	align-items: center;
	justify-content: center;
	box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.12);
	height: 56px;
	padding: 0px 13px 13px 16px;
`;

export const Title = styled.div`
	color: #171717;
	text-align: center;
	font-family: Patrick Hand;
	font-size: 30px;
	font-style: normal;
	font-weight: 400;
	line-height: 110%;
	letter-spacing: -0.44px;
`;

export const Subtitle = styled.p`
	color: #171717;
	text-align: center;
	font-family: Patrick Hand;
	font-size: 22px;
	font-style: normal;
	font-weight: 400;
	line-height: 24px;
`;
export const CloseButton = styled(CloseIcon)`
	display: flex;
	width: 31px;
	height: 31px;
	cursor: pointer;
	position: absolute;
	top: 15px;
	right: 16px;
`;

export const PillContainer = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
	margin-top: 16px;
	padding: 8px 0px;
	gap: 16px;
	overflow-y: scroll;
`;

export const PillImage = styled(Image)`
	box-shadow: 1px 2px 4px 1px rgba(0, 0, 0, 0.12);

	&:hover {
		cursor: pointer;
		transform: scale(1.1);
	}
`;
