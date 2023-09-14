import styled from "styled-components";
import CloseIcon from "../../../public/SocialConnectsCLOSE.svg";
import UploadIcon from "../../../public/svgs/uploadIcon.svg";
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
	display: block;
	width: 100%;
	height: 100%;
	max-width: 849px;
	max-height: 525px;
	background: #fff;
	border-radius: 12px;
`;
export const Header = styled.div`
	display: flex;
	width: 100%;
	height: 56px;
	align-items: center;
	justify-content: center;
	border-radius: 12px 12px 0px 0px;
	border-top: 0.5px solid #e7e7e7;
	background: #fff;
	box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.12);
	padding: 12px 16px;
	justify-content: space-between;
	position: relative;
`;
export const TitleWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-grow: 1;
`;

export const Title = styled.h1`
	color: #000;
	font-family: Poppins;
	font-size: 20px;
	font-style: normal;
	font-weight: 700;
	line-height: 24px;
	align-self: center;
`;

export const CloseButton = styled(CloseIcon)`
	display: flex;
	width: 31px;
	height: 31px;
	cursor: pointer;
	position: absolute;
	top: 12px;
	right: 16px;
`;

export const ContentContainer = styled.div`
	height: calc(100% - 56px);
	flex-direction: column;
	justify-content: center;
	align-items: center;
	padding: 24px;
`;

export const UploadImageDropZone = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	border-radius: 14.437px;
	border: 3.008px dashed #ff4f0a;
	height: 100%;
	width: 100%;
	position: relative;
`;
export const UploadImageBackground = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 8px;
`;

export const UploadIconContainer = styled(UploadIcon)`
	display: flex;
	width: 114.296px;
	height: 96.249px;
`;

export const Subtitle1 = styled.div`
	color: #000;
	font-family: Poppins;
	font-size: 24px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
`;

export const Subtitle2 = styled.div`
	color: #616161;
	font-family: Poppins;
	font-size: 20px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
`;
export const InputOverlay = styled.input`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	opacity: 0;
	cursor: pointer;
`;
