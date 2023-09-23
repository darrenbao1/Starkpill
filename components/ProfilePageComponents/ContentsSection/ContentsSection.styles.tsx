import styled from "styled-components";
import Icon from "../../../public/emptyBox.svg";
export const ContentsSectionContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 849px;
	height: fit-content;
	border-radius: 12px;
	background: linear-gradient(0deg, #fff 0%, #fff 100%), #c4c4c4;
`;

export const HeaderContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-start;
	height: 50px;

	padding-left: 55.52px;
	padding-top: 24px;
	padding-bottom: 15px;
	color: #343434;
	font-family: Poppins;
	font-size: 20px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
`;

export const NoPostsContainer = styled.div`
	display: flex;
	flex-direction: column;
	background: #fff;
	height: 300px;
	width: 100%;
	color: #343434;
	font-family: Poppins;
	font-size: 20px;
	align-items: center;
	justify-content: center;
	border-bottom-left-radius: 12px;
	border-bottom-right-radius: 12px;

	border-top: 1px solid rgba(3, 2, 41, 0.1);
	gap: 24px;
`;
export const EmptyIcon = styled(Icon)`
	display: flex;
`;
