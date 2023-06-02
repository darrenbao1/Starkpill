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

export const ModalContainer = styled.div`
	position: absolute;
	display: flex;
	height: fit-content;
	background-color: #ffffff;
	padding: 30px;
	border-radius: 12px;
`;

export const ModalCloseButton = styled.span`
	position: absolute;
	display: flex;
	top: 16px;
	right: 16px;
	height: fit-content;
	align-items: center;
	justify-content: center;
	background-color: #ff4f0a;
	color: white;
	padding: 10px;
	font-size: 40px;
	font-weight: bold;
	border-radius: 6px;
	z-index: 2;
`;
