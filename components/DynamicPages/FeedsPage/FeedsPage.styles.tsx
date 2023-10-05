import styled from "styled-components";

export const FeedPageContainer = styled.div`
	position: fixed;
	left: 0;
	width: 100vw;
	top: 0;
	height: 100vh;
	overflow-y: overlay;

	background-color: #2a2a2a;
	&::-webkit-scrollbar {
		width: 10px;
	}

	&::-webkit-scrollbar-track {
		background-color: #1d1d1d;
	}

	&::-webkit-scrollbar-thumb {
		background-color: #ff4f0a;
		border-radius: 10px;
		border: 2px solid #1d1d1d;
	}
`;
export const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	margin-top: 6rem;
	margin-bottom: 2rem;
`;
export const PostsContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 16px;
	gap: 16px;
`;
export const PostContainer = styled.div`
	border-radius: 12px;
	width: 90vw;
	max-width: 53.063rem;
	background: #fff;
`;
