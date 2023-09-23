import styled from "styled-components";
import UploadIcon from "../../../public/UploadCover.svg";
import RemoveIcon from "../../../public/RemoveCover.svg";

export const MenuContainer = styled.div`
	display: flex;
	width: 167px;
	flex-direction: column;
	border-radius: 8px;

	background: #f5f5f5;

	position: absolute;
	margin-top: 3.8rem;
	margin-left: 41.7rem;
`;

export const MenuOption = styled.div`
	display: flex;
	width: 100%;
	border-radius: 8px;
	padding: 12px 8px;
	color: #262626;
	font-family: Patrick Hand;
	font-size: 20px;
	font-style: normal;
	font-weight: 400;
	line-height: 24px; /* 120% */
	letter-spacing: -0.25px;
	border-bottom: 1px solid #e9e9e9;
	&:hover {
		cursor: pointer;
		background: #e9e9e9;
	}
`;

export const UploadPhoto = styled(UploadIcon)`
	display: flex;
	margin-right: 8px;
`;
export const RemovePhoto = styled(RemoveIcon)`
	display: flex;
	margin-right: 8px;
`;
