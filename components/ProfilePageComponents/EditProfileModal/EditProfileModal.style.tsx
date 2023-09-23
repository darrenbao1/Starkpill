import styled from "styled-components";
import CloseIcon from "../../../public/SocialConnectsCLOSE.svg";
export const ModalContainer = styled.div`
	position: fixed;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.75);
	backdrop-filter: blur(2px);
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
	height: fit-content;
	max-width: 655px;
	max-height: 939px;
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
export const CoverPhotoContainer = styled.div`
	display: flex;
	height: fit-content;
	overflow: hidden;
`;
export const ProfilePictureContainer = styled.div`
	width: 100px;
	height: 100px;
	overflow: hidden;
	border-radius: 50%;
	position: relative;
	margin-left: 35px;
	margin-top: -44px;
`;

export const ContentContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 16px;
	padding: 16px;
`;
export const AttributeContainer = styled.div`
	display: flex;
	width: 100%;
	flex-direction: column;
	align-items: flex-start;
	gap: 4px;
`;
export const AttributeLabel = styled.div`
	color: #252525;
	font-family: Poppins;
	font-size: 18px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
`;
export const InputStyle = styled.input`
	display: flex;
	padding: 4px 12px;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	gap: 10px;
	align-self: stretch;
	border-radius: 6px;
	border: 1px solid #e0e0e0;
	height: 43px;
`;
export const InputStyleBio = styled.input`
	display: flex;
	width: 100%;
	padding: 4px 12px;
	gap: 10px;
	border-radius: 6px;
	border: 1px solid #e0e0e0;
	height: 101px;
`;
export const SaveChangesButton = styled.button`
	display: flex;
	border-radius: 6px;
	border: 1px solid #fff;
	height: 40px;
	width: 100%;
	padding: 8px 16px;
	align-items: center;
	justify-content: center;
	color: #fff;
	text-align: center;
	font-family: Patrick Hand;
	font-size: 24px;
	font-style: normal;
	font-weight: 400;
	background: #ff4f0a;
	&:hover {
		cursor: pointer;
	}
	&:disabled {
		background: #ababab;
		cursor: not-allowed;
	}
`;
