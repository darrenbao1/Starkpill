import styled from "styled-components";
import CloseIcon from "../../../public/SocialConnectsCLOSE.svg";
import Image from "next/image";
export const PostImageModalWrapper = styled.div`
	display: flex;
	background: rgba(0, 0, 0, 0.75);
	backdrop-filter: blur(2px);
	position: fixed;
	height: 100vh;
	width: 100vw;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	justify-content: center;
	align-items: center;
	z-index: 20;
`;
export const PostImageModalContainer = styled.div`
	display: flex;
	width: fit-content;
	height: fit-content;
	background-color: #fff;
	flex-direction: column;
	border-radius: 12px;
`;
export const Header = styled.div`
	display: flex;
	border-radius: 12px;
	padding: 16px;
	flex-direction: row;
	width: 100%;

	height: 56px;
	justify-content: flex-end;

	background-color: #fff;

	box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.12);
`;
export const ImageContainerWrapper = styled.div`
	display: flex;
	width: fit-content;
	height: fit-content;

	padding: 16px;
`;
export const ImageContainer = styled(Image)`
	display: flex;
	max-width: 900px;
	max-height: 900px;
	min-width: 300px;
	min-height: 300px;
	background-color: red;
	border-radius: 12px;
`;

export const Close = styled(CloseIcon)`
	display: flex;
	z-index: 10;

	&:hover {
		cursor: pointer;
	}
`;
