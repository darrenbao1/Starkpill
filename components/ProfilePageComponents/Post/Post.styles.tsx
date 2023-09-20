import styled from "styled-components";
import Image from "next/image";
import Comment from "../../../public/CommentIcon.svg";
import Like from "../../../public/LikeIcon.svg";

export const PostContainer = styled.div`
	display: flex;
	flex-direction: row;
	width: 100%;
	height: 409px;
	border-top: 1px solid rgba(3, 2, 41, 0.1);
	color: black;
	padding-left: 16px;
`;

export const ProfilePictureContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	width: 56px;

	padding-top: 16px;
`;

export const PostContentContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 749px;
	padding: 7px;
`;

export const NamesContainer = styled.div`
	display: flex;
	flex-direction: row;
	gap: 5px;

	h1 {
		color: #0f1419;
		font-family: Poppins;
		font-size: 18px;
		font-style: bold;
		font-weight: 700;
		line-height: 20px;
	}
	h2 {
		color: #5b7083;
		font-family: Poppins;
		font-size: 16px;
		font-style: normal;
		font-weight: 400;
		line-height: 20px;
	}
`;

export const CaptionContainer = styled.div`
	display: flex;
	color: #0f1419;
	font-family: Poppins;
	font-size: 18px;
	font-style: normal;
	font-weight: 400;
	line-height: 20px;
	padding-bottom: 10px;
`;
export const PostImage = styled.div`
	position: relative;
	border-radius: 12px;
`;
export const PostImageContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(50%, 1fr));
	gap: 8px;
	height: 100vh;
	max-height: 358px;
	border-radius: 12px;
	overflow-x: auto;
`;

export const CommentLikeContainer = styled.div`
	display: flex;
	flex-direction: row;
	width: 100%;
	height: 50px;
	justify-content: flex-end;
	color: #5b7083;
	font-family: Poppins;
	font-size: 13px;
	font-style: normal;
	font-weight: 400;
	line-height: 16px;

	padding-top: 10px;
`;
export const LikeIconWrapper = styled.div`
	display: flex;
	padding: 8px 16px;
	border-radius: 4px;
	gap: 5px;
	&:hover {
		background-color: #f2f2f2;
		cursor: pointer;
	}
`;
export const CommentIcon = styled(Comment)`
	display: flex;
`;

export const LikeIcon = styled(Like)`
	display: flex;
`;
