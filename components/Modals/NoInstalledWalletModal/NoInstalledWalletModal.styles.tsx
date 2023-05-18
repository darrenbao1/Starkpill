import styled from "styled-components";

export const ModalContainer = styled.div`
	display: flex;
	flex-direction: column;
	position: fixed;

	margin: auto;
	align-items: center;
`;

export const MenuText = styled.div`
	margin-top: 13px;
	font-size: 18px;
`;

export const Button = styled.a`
	all: unset;
	color: white;
	background-color: #262233;
	width: 21rem;
	display: flex;
	align-items: center;
	border-radius: 8px;
	height: 1.25rem;

	margin-bottom: 7px;
	padding: 20px 15px 20px 20px;
	cursor: pointer;
	flex-direction: row;
	justify-content: space-between;

	&:hover {
		background-color: #60557e;
	}
`;

export const ButtonIcon = styled.img`
	width: 2rem;
`;

export const ButtonText = styled.div`
	font-size: 22px;
`;
