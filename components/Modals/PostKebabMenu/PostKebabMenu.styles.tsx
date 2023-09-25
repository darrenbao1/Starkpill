import styled from "styled-components";
import DeleteIcon from "../../../public/Delete.svg";

export const KebabContainer = styled.div`
	display: flex;
	flex-direction: column;
	background: #fff;
	position: absolute;
	margin-top: 3.7rem;
	margin-left: 36.4rem;

	box-shadow: 2px 1px 8px 3px rgba(155, 155, 155, 0.16);
	border-radius: 8px;
	width: 167px;
	height: fit-content;
	z-index: 1;

	&::after {
		content: "";
		position: absolute;
		top: -20px;
		left: 80%;
		transform: translateX(-50%);
		border: 10px solid transparent;
		border-bottom-color: #fff;
	}
	&::before {
		content: "";
		position: absolute;
		top: -23px;
		left: 80%;
		transform: translateX(-50%);
		border: 11.2px solid transparent;
		border-bottom-color: #f5f5f5;
	}
`;
export const Delete = styled(DeleteIcon)`
	display: flex;
`;
export const KebabOption = styled.div`
	display: flex;
	padding: 12px 16px;
	width: 100%;
	height: 48px;
	color: #262626;
	font-family: Montserrat;
	font-size: 16px;
	font-style: normal;
	font-weight: 400;
	line-height: 24px;
	gap: 16px;
	border-radius: 8px;

	&:hover {
		cursor: pointer;
		background: #e9e9e9;
	}
`;
