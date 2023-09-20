import styled from "styled-components";
export const Wrapper = styled.div`
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
export const CommentsModalContainer = styled.div`
	display: flex;
	flex-direction: column;
	background-color: #fff;
	color: #000;
	border-radius: 12px;

	width: 849px;
	height: fit-content;
`;

export const CommentsModalHeader = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	color: #000;
	font-family: Poppins;
	font-size: 20px;
	font-style: normal;
	font-weight: 700;
	line-height: 24px;
	padding: 12px;
	box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.12);
`;
