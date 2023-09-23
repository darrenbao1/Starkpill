import styled from "styled-components";

import Image from "next/image";
import Edit from "../../../public/EditCover.svg";

export const ActionButton = styled.button`
	border-radius: 6px;
	border: none;

	background: rgba(70, 70, 70, 0.9);

	padding-left: 12px;
	padding-right: 12px;
	padding-bottom: 8px;
	padding-top: 8px;
	color: #fff;
	text-align: center;
	font-family: Patrick Hand;
	font-size: 20px;
	font-style: normal;
	font-weight: 400;
	line-height: 100%;
	right: 16px;
	bottom: 16px;

	&:hover {
		cursor: pointer;
		opacity: 0.8;
	}
`;

export const ActionButtonContainer = styled.div`
	position: absolute;
	right: 16px;
	top: 16px;
	display: flex;
	gap: 8px; /* Adjust the gap size as needed */
`;
export const EditPicIcon = styled(Edit)`
	margin-right: 8px;
	padding-top: 0.7px;
`;
