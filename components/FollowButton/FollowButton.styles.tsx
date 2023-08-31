import styled from "styled-components";

interface ButtonProps {
	isFollowing: boolean;
}
export const StyledButton = styled.button`
	display: flex;
	height: 40px;
	align-items: center;
	gap: 8px;
	padding: 8px 16px;
	font-size: 24px;
	font-weight: 400;
	font-family: Patrick Hand;
	color: ${(props: ButtonProps) => (props.isFollowing ? "#FF4F0A" : "#FFFFFF")};
	text-align: center;
	border-radius: 6px;
	border: ${(props: ButtonProps) =>
		props.isFollowing ? "1px solid #FF4F0A" : "1px solid #FFFFFF"};
	background-color: ${(props: ButtonProps) =>
		props.isFollowing ? "#FFFFFF" : "#FF4F0A"};
	cursor: pointer;
`;
