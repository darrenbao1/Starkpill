import Image from "next/image";
import styled from "styled-components";

export const CardContainer = styled.div`
	position: relative;
	border: 1px solid #ffffff;
	border-radius: 6px;
	width: fit-content;
	background: #ffffff;
`;
export const CardImage = styled(Image)`
	width: 100%;
	height: 100%;
	max-width: 208px;
	max-height: 208px;
	aspect-ratio: 1/1;
	border-radius: 6px 6px 0px 0px;
`;
export const CardItemName = styled.div`
	padding: 8px 16px;
	border-top: 1px solid #e9e9e9;
	width: 100%;
	height: 100%;
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
