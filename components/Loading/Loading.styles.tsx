import styled from "styled-components";

export const LoadingContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: flex-end;
	height: 100%;
	width: 100%;
	top: 0;
	left: 0;

	@media (max-width: 768px) {
		align-items: flex-start;
	}
`;
