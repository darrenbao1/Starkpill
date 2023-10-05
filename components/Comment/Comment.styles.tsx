import styled from "styled-components";

export const PostCommentWrapper = styled.div`
	display: flex;
	flex-direction: column;

	max-height: 400px;

	overflow-y: auto;
	width: 100%;
	&::-webkit-scrollbar {
		width: 10px;
	}
	&::-webkit-scrollbar-track {
		background-color: #fff;
	}
	&::-webkit-scrollbar-thumb {
		background-color: #ff4f0a;
		border-radius: 10px;
		border: 2px solid #fff;
	}
`;
