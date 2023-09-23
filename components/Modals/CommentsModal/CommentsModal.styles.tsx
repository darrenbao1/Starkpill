import styled from "styled-components";
import GIFicon from "../../../public/CommentGIF.svg";
import EnterIcon from "../../../public/EnterMessageIcon.svg";
import CloseIcon from "../../../public/SocialConnectsCLOSE.svg";
export const Wrapper = styled.div`
	display: flex;
	background: rgba(0, 0, 0, 0.75);
	backdrop-filter: blur(2px);
	position: fixed;
	height: 100vh;
	width: 100vw;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	justify-content: center;
	align-items: center;
	z-index: 20;
`;
export const CommentsModalContainer = styled.div`
	display: flex;
	flex-direction: column;
	background-color: #fff;
	position: relative;
	color: #000;
	border-radius: 12px;

	width: 849px;
	height: fit-content;
`;

export const CommentsModalHeader = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	color: #000;
	font-family: Poppins;
	font-size: 20px;
	font-style: normal;
	font-weight: 700;
	line-height: 24px;
	padding: 12px;
	box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.12);
`;

export const AddCommentContainer = styled.div`
	display: flex;
	width: 100%;
	height: 128px;
	padding: 16px;
	flex-direction: row;
	border-radius: 0px 0px 12px 12px;
	border-top: 0.5px solid #e7e7e7;
	box-shadow: 0px -1px 4px 0px rgba(0, 0, 0, 0.12);
	gap: 12px;
	background: #fbfbfb;
`;

export const AddCommentTextArea = styled.textarea`
	display: flex;
	height: 80px;
	width: 100%;
	border: none;

	resize: none;
	&:focus {
		outline: none;
	}
	&::placeholder {
		color: #67727e;
		font-feature-settings: "clig" off, "liga" off;
		font-family: Poppins;
		font-size: 16px;
		font-style: normal;
		font-weight: 400;
		line-height: 24px;
	}
`;

export const Close = styled(CloseIcon)`
	display: flex;
	position: absolute;

	right: 17px;
	&:hover {
		cursor: pointer;
	}
`;
export const TextAreaContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	border-radius: 8px;
	border: 1px solid #ebeef0;
	padding: 12px 6px 0px 12px;
	background: #fff;
`;
export const TextareaFooter = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`;
export const GIFIconContainer = styled(GIFicon)`
	display: flex;
	margin-top: 4px;
	&:hover {
		cursor: pointer;
	}
`;

export const Enter = styled(EnterIcon)`
	display: flex;
	margin-bottom: 4px;
	&:hover {
		cursor: pointer;
	}
`;
