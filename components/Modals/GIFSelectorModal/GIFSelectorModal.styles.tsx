import styled from "styled-components";
import CloseIcon from "../../../public/CloseGIFButton.svg";
export const Wrapper = styled.div`
	display: flex;
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
	z-index: 1;
	width: 100vw;
	height: 100vh;
`;

export const Container = styled.div`
	display: flex;

	width: 849px;
	height: 770px;

	margin-top: 8.5rem;
	margin-left: 4rem;
	flex-direction: column;
	background: #ffffff;
	border-radius: 12px;
`;

export const HeaderContainer = styled.div`
	display: flex;
	border-radius: 12px 12px 0px 0px;

	width: 100%;
	height: 56px;
	background: #ffffff;
	border-bottom: 1px solid #c4c4c4;
	color: #343434;

	align-items: center;
	justify-content: center;

	color: #000;
	font-family: Poppins;
	font-size: 20px;
	font-style: bold;
	font-weight: 700;
	line-height: 24px;
`;

export const CloseButton = styled(CloseIcon)`
	display: flex;
	position: fixed;
	margin-left: 49rem;
	&:hover {
		cursor: pointer;
	}
`;
