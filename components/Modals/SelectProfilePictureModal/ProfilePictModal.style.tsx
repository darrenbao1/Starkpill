import styled from "styled-components";
import CloseIcon from "../../../public/SocialConnectsCLOSE.svg";
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
	display: flex;
	width: 468px;
	padding: 40px 0px;
	flex-direction: column;
	align-items: center;
	background: #fff;
	border-radius: 8px;
`;

export const Title = styled.h1`
	color: #171717;
	text-align: center;
	font-family: Patrick Hand;
	font-size: 40px;
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
`;

export const PillContainer = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
	margin-top: 40px;
	margin-bottom: 40px;
	max-height: 400px;
	overflow-y: scroll;
`;
