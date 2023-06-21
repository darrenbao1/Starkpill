import styled from "styled-components";

export const TraitModalContainer = styled.div`
	width: 100%;
	background: ${(props) => props.theme.bgColor};
	border: 1px solid #e4e4e4;
	border-radius: 5px;
	color: ${(props) => props.theme.whiteText};
	display: flex;
	margin: 50px auto;
	flex-direction: column;
	transition: transform 0.6s ease-in-out;
	animation: toast-in-right 0.7s;
	padding: 1rem;
	@media screen and (max-width: 750px) {
		position: fixed;
		width: 95%;
		height: calc(100vh - 150px);
		z-index: 3;
	}
	@keyframes toast-in-right {
		from {
			transform: translateX(100%);
		}
		to {
			transform: translateX(0);
		}
	}
`;
export const CloseButton = styled.button`
	position: absolute;
	right: 20px;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 8px;
	stroke: white;
	cursor: pointer;
	border-radius: 5px;
	border: none;

	background-color: ${(props) => props.theme.primaryColor};
	&:hover {
		background-color: ${(props) => props.theme.primaryColorHover};
		stroke: grey;
	}
`;
export const TraitModalHeader = styled.div`
	text-align: center;
	font-size: 32px;
	white-space: nowrap;
	margin-bottom: 11px;
`;
export const TraitCardContainer = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-gap: 2rem;
	padding: 1rem;
	padding-top: 5px;
	overflow: overlay;
	&:hover {
		overflow: overlay;
	}
	&::-webkit-scrollbar {
		width: 8px;
	}
	&::-webkit-scrollbar-track {
		background-color: transparent;
	}
	&::-webkit-scrollbar-thumb {
		border-width: 4px;
		border-style: solid;
		border-color: #ff4f0a;
		border-radius: 4px;
	}
	@media screen and (max-width: 750px) {
		padding-bottom: 10vh;
		overflow: overlay;
		grid-gap: 1rem;
		padding: 0.7rem;
	}
`;
