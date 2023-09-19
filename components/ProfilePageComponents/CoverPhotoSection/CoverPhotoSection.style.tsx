import styled from "styled-components";
import Image from "next/image";

export const ActionButton = styled.button`
	border-radius: 6px;
	border: 1px solid #ff4f0a;
	background: #fff;
	padding: 8px 16px;
	color: #ff4f0a;
	text-align: center;
	font-family: Patrick Hand;
	font-size: 20px;
	font-style: normal;
	font-weight: 400;
	line-height: 100%;
	right: 16px;
	bottom: 16px;
	opacity: 0.5;
	&:hover {
		cursor: pointer;
		opacity: 0.8;
	}
	&:active {
		background: #ffeaea;
	}
`;

export const ActionButtonContainer = styled.div`
	position: absolute;
	right: 16px;
	bottom: 16px;
	display: flex;
	gap: 8px; /* Adjust the gap size as needed */
`;
