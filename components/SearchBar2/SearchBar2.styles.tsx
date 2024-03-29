import styled from "styled-components";
import Image from "next/image";
interface SearchBarProps {
	searchQuery?: number;
}
export const SearchBarContainer = styled.div`
	width: fit-content;
	height: 100%;
	max-width: 14rem;
	max-height: 3.5rem;
	border: 1px solid #bfbfbf;
	border-radius: 8px;
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 8px 0 8px 12px;
	margin-top: 1rem;
	z-index: 1;
	@media (max-width: 540px) {
		width: 100%;
		max-width: 100%;
		margin-right: 25px;
		justify-content: center;
		padding-left: 92px;
	}

	@media (max-width: 390px) {
		padding-left: 67px;
	}
`;

export const SearchBarInput = styled.input`
	width: 100%;
	height: 2.5rem;
	background: transparent;
	border: none;
	outline: none;
	color: #ffffff;
	margin-left: 8px;
	font-size: 24px;
	line-height: 24px;
	&::-webkit-inner-spin-button,
	&::-webkit-outer-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
`;

export const Cross = styled(Image)<SearchBarProps>`
	width: 24px;
	height: 24px;
	visibility: ${({ searchQuery }) =>
		searchQuery !== 0 ? "visible" : "hidden"};
	align-self: center;
	margin-right: 6px;

	&:hover {
		cursor: pointer;
	}
`;

export const Icon = styled(Image)`
	width: 24px;
	height: 24px;
`;
export const SearchResultsWrapper = styled.div`
	display: flex;
`;
export const SearchResultsContainer = styled.div`
	display: flex;

	left: 0;
	bottom: 550px;
	margin-top: 0rem;
	width: 100%;

	justify-content: center;
	align-items: center;

	background: none;
	z-index: 1;

	@media (max-width: 500px) {
		padding-bottom: 10rem;
	}
`;

export const SearchResultsModal = styled.div``;

export const HeaderContainer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	width: 100%;
`;
export const Header = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;

	width: 100%;

	p {
		font-size: 24px;
		line-height: 32.5px;
	}
`;

export const NoResults = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	p {
		font-size: 24px;
		line-height: 32.5px;
		align-self: center;
		align-items: center;
		margin-bottom: 0;
		margin-top: 0;
	}
	@media (max-width: 500px) {
		width: 350px;
		margin-bottom:10rem;
		
`;

export const SadFace = styled(Image)`
	width: 77px;
	height: 77px;
	margin-bottom: 1rem;
`;

export const SearchQueryText = styled.p`
	font-size: 24px;
	line-height: 32.5px;
	font-weight: 600;
`;

export const StarkpillCardContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
`;
