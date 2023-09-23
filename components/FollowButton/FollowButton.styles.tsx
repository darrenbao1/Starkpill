import styled from "styled-components";

interface ButtonProps {
	isFollowing: boolean;
}

export const StyledButton = styled.button<ButtonProps>`
	display: flex;
	height: 40px;
	align-items: center;
	gap: 8px;
	padding: 8px 16px;
	font-size: 24px;
	font-weight: 400;
	font-family: Patrick Hand;
	color: ${(props) => (props.isFollowing ? "#FF4F0A" : "#FFFFFF")};
	text-align: center;
	border-radius: 6px;
	border: ${(props) =>
		props.isFollowing ? "1px solid #FF4F0A" : "1px solid #FFFFFF"};
	background-color: ${(props) => (props.isFollowing ? "#FFFFFF" : "#FF4F0A")};
	cursor: pointer;

	&:hover {
		background-color: ${(props) => (props.isFollowing ? "#FFEAEA" : "#FF4F0A")};
	}
	z-index: 2;
`;
