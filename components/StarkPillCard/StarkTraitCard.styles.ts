import Image from "next/image";
import styled from "styled-components";

export const Card = styled.div`
    width: 200px;
    border: 2px solid rgba(228, 228, 228, 0.6);
    border-radius: 7.7px;
	margin: auto;
	display: grid;
	cursor: pointer;
	position: relative;
	font-size: 20px;    
@media screen and (max-width: 500px) {
    width: 300px;
    `;

export const CardInnerContainer = styled.div`
	overflow: hidden;
	position: relative;
	height: 100%;
	width: 100%;
	margin: 0;
	display: flex;
	flex-direction: column;
	border-radius: 6px;
`;
export const CardImage = styled(Image)`
	width: 200px;
	height: 200px;
	background-color: white;
	border-bottom: 1px solid hsla(0, 0%, 89%, 0.6);
	&:hover {
		opacity: 0.7;
	}
	@media screen and (max-width: 500px) {
		width: 300px;
		height: 300px;
	}
`;

export const Content = styled.div`
	padding-left: 16px;
	padding-bottom: 2px;
	font-size: large;
	width: 200px;
	color: black;
	background-color: white;

	border-top: none;

	h1 {
		font-size: 24px;
		color: #ff4f0a;
		margin-bottom: 0px;
	}
	h1:hover {
		text-decoration: underline;
	}
	@media screen and (max-width: 500px) {
		width: 300px;
	}
	p {
		font-size: large;
		line-height: 0.5;
	}
`;

export const HeaderContainer = styled.div`
	display: flex;
	align-items: center;
`;
