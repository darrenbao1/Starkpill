import styled from "styled-components";
import Image from "next/image";
import UploadPicSVG from "../../../public/UploadPictureIcon.svg";
import InsertGIFSVG from "../../../public/InsertGIF.svg";
import InsertEmojiSVG from "../../../public/InsertEMOJI.svg";
import { css } from "styled-components";
export const StatusUpdateSectionContainer = styled.div`
	display: flex;
	flex-direction: row;
	width: 53.063rem;
	height: fit-content;

	border-radius: 12px;
	background: #fff;
	box-shadow: 0px 1px 0px 0px #ebeef0;
	padding: 16px;

	gap: 12px;
`;

export const ProfilePic = styled(Image)`
	display: flex;
	border-radius: 50%;
	width: 50px;
	height: 50px;
`;

export const StatusUpdateInput = styled.textarea`
	display: flex;
	width: 100%;
	border: none;
	outline: none;
	padding-top: 14px;

	overflow: hidden;

	border-bottom: 1px solid #e3e3e3;
	color: black;
	font-family: Poppins;
	font-size: 18px;
	font-style: normal;
	font-weight: 400;
	resize: none;

	&:focus {
		outline: none;
	}
	&::placeholder {
		color: #787878;
		font-family: Poppins;
	}
`;
export const UpdateWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 12px;
	width: 100%;
`;
export const IconsWrapper = styled.div`
	display: flex;
	flex-direction: row;
	gap: 18px;
	width: 100%;
	margin-top: 9px;
`;
const IconStyles = css`
	display: flex;
	width: 22px;
	height: 22px;
	&:hover {
		cursor: pointer;
	}
`;
export const UploadPicIcon = styled(UploadPicSVG)`
	${IconStyles}
`;

export const InsertGIFIcon = styled(InsertGIFSVG)`
	${IconStyles}
`;
export const InsertEmojiIcon = styled(InsertEmojiSVG)`
	${IconStyles}
`;

export const BottomContainer = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
`;
export const PostButton = styled.button`
	display: flex;
	border-radius: 6px;
	border: 1px solid #fff;
	background: #ababab;
	height: 40px;
	padding: 8px 16px;
	align-items: center;
	color: #fff;
	text-align: center;
	font-family: Patrick Hand;
	font-size: 24px;
	font-style: normal;
	font-weight: 400;
	&.active {
		background: #ff4f0a;
		&:hover {
			cursor: pointer;
		}
	}
`;
