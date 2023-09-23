import styled from "styled-components";

export const LoaderContainer = styled.div`
	display: flex;
	position: absolute;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	z-index: 5;
	height: calc(100vh - 68px);
	top: 68px;
	width: 100vw;
	background: rgba(0, 0, 0, 0.5);
`;
