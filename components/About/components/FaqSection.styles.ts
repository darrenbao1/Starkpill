import styled from "styled-components";
interface FaqItemProps {
	showanswer: boolean;
}
export const FaqItemContainer = styled.div`
	background: ${(props) => props.theme.whiteBgColor};
	margin-top: 10px;
`;
export const FaqItemStyle = styled.div<FaqItemProps>`
	padding: 16px 24px;
	font-size: 24px;
	font-weight: 700;
	line-height: 120%;
	display: flex;
	align-items: center;
	color: ${(props) =>
		props.showanswer ? props.theme.primaryColor : props.theme.blackText};
`;
export const FaqItemButton = styled.div`
	width: 30px;
	height: 30px;
	stroke: black;
	margin-right: 0;
	margin-left: auto;
`;
export const Divider = styled.div`
	background: rgba(0, 0, 0, 0.25);
	height: 2px;
	width: 100%;
`;
export const Answer = styled.div`
	padding: 16px 48px;
	font-size: 20px;
	font-weight: 400;
	line-height: 140%;
	color: rgba(60, 60, 67, 0.85);
`;
export const FaqSectionContainer = styled.div`
	position: relative;
	margin: 0 auto;
	max-width: 1200px;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	color: black;
	ul {
		background: transparent;
		width: 100%;
		list-style-type: none;
		padding: 0;
	}
	h1 {
		color: ${(props) => props.theme.primaryColor};
	}
`;
