import Image from "next/image";
import styled from "styled-components";

export const CardContainer = styled.div`
	position: relative;
	border-radius: 6px;
	background: #ffffff;
	border: 2px solid #ffffff;
	&:hover {
		border: 2px solid #ff4f0a;
		cursor: pointer;
	}
`;
export const ModalContainer = styled.div`
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
export const CardImage = styled(Image)`
	width: 100%;
	height: auto;
	border-radius: 6px 6px 0px 0px;
	@media (max-width: 450px) {
		width: 340px;
	}
`;
export const CardItemName = styled.div`
	padding: 8px 16px;

	border-top: 1px solid #e9e9e9;
	width: 100%;
	height: fit-content;
	display: flex;
	flex-direction: row;
	font-family: "Patrick Hand";
	font-style: normal;
	font-weight: 400;
	font-size: 20px;
	line-height: 34px;
	color: #ff4f0a;
`;

export const EquippedBadge = styled.div`
	padding: 0px 6px 3px;
	position: absolute;
	top: 8px;
	right: 8px;
	background: #fae3cc;
	border: 1px solid #ea9033;
	border-radius: 4px;
	font-family: "Patrick Hand";
	font-style: normal;
	font-weight: 400;
	font-size: 16px;
	line-height: 22px;
	text-align: center;
	color: #ea9033;
`;

export const UnequippedBadge = styled.div`
	padding: 0px 6px 3px;
	position: absolute;
	top: 8px;
	right: 8px;
	background: #d0d1db;
	border: 1px solid #424971;
	border-radius: 4px;
	font-family: "Patrick Hand";
	font-style: normal;
	font-weight: 400;
	font-size: 16px;
	line-height: 22px;
	text-align: center;
	color: #131b4d;
`;
