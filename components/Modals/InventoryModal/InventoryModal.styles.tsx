import styled from "styled-components";
import Image from "next/image";

interface ModalProps {
	selected: boolean;
}
interface ButtonProps {
	itemSelectedBG: boolean;
}
interface UnequipButtonProps {
	unequipSelected: boolean;
}
export const Container = styled.div`
	display: flex; /* Hidden by default */
	justify-content: center;
	align-items: center;
	position: fixed;
	/* Stay in place */
	z-index: 3;
	/* Location of the box */
	left: 0;
	top: 0;
	width: 100%; /* Full width */
	height: 100%; /* Full height */
	overflow: auto; /* Enable scroll if needed */
	background-color: rgb(0, 0, 0); /* Fallback color */
	background-color: rgba(0, 0, 0, 0.9); /* Black w/ opacity */
`;
export const ModalContainer = styled.div`
	position: absolute;
	display: flex;
	height: fit-content;
	background-color: #ffffff;
	padding: 24px 21px 24px 24px;
	border-radius: 12px;
	gap: 24px;
	justify-content: center;
	align-items: center;
	flex-direction: row;
	z-index: 4;
	@media (max-width: 769px) {
		flex-direction: column;
		gap: 11px;
		top: 100px;
	}
`;

export const ModalContent = styled.div`
	display: flex;
	flex-direction: column;
	width: 22.813rem;
	height: 20.625rem;
	@media (max-width: 769px) {
		width: 100%;
	}
`;
export const HeaderContainer = styled.div`
	display: flex;
	justify-content: space-between;

	h1 {
		font-size: 32px;
		line-height: 34px;
		letter-spacing: -0.357448px;
		align-items: flex-start;
		margin-top: 2px;

		color: #ff4f0a;
	}
	@media (max-width: 769px) {
		display: flex;
		justify-content: space-between;
		width: 100%;

		h1 {
			margin-top: 10px;
		}
	}
`;

export const Cross = styled(Image)`
	width: 30px;
	height: 31px;
	&:hover {
		cursor: pointer;
	}
`;
export const Down = styled(Image)`
	width: 28px;
	height: 24px;
`;
export const ImageContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	border: 3px solid#FF4F0A;
	width: 19.875rem;
	height: 19.875rem;
	border-radius: 8px;
`;
export const ImageStyle = styled(Image)`
	width: 100%;
	height: 100%;
`;

export const EquippedOn = styled.div`
	width: 100%;
	height: 47px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background: #f5f5f5;
	border-radius: 14px;
	padding: 6px 24px 6px 24px;
`;
export const SelectATrait = styled(EquippedOn)`
	&:hover {
		cursor: pointer;
	}
`;

export const EquipText = styled.div`
	font-size: 24px;
	line-height: 34px;
	color: #262626;
`;
export const SelectTraitText = styled(EquipText)``;
export const HighlightText = styled(EquipText)`
	color: #ff4f0a;
`;

export const ContentContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 16px;
`;

export const RadioWrapper = styled.div`
	height: auto;
	width: 22.813rem;
	padding: 0px 35px 0px 0px;
	gap: 16px;
	display: flex;
	justify-content: center;
	align-items: center;
	@media (max-width: 769px) {
		padding: 0px;
		gap: 0px;
		width: 19.813rem;
	}
`;

export const Item = styled.div`
	display: flex;
	align-items: center;
	height: 48px;
	position: relative;

	border-radius: 2px;
`;
export const RadioButtonText = styled.div`
	font-size: 24px;
	color: #262626;
	width: 120px;
`;

export const RadioButtonLabel = styled.label`
	position: absolute;
	top: 25%;
	left: 4px;
	width: 24px;
	height: 24px;

	border-radius: 50%;
	background: white;
	border: 2px solid #ff4f0a;
`;
export const RadioButton = styled.input`
	opacity: 0;
	z-index: 1;
	cursor: pointer;
	width: 24px;
	height: 24px;
	margin-right: 10px;
	&:hover ~ ${RadioButtonLabel} {
		background: none;
		&::after {
			content: "";

			display: block;
			color: #ff4f0a;
			width: 12px;
			height: 12px;
		}
	}
	&:checked + ${Item} {
		background: #ff4f0a;
		border: 2px solid #ff4f0a;
	}
	&:checked + ${RadioButtonLabel} {
		background: white;
		border: 2px solid #ff4f0a;
		&::after {
			content: "";
			width: 12px;
			height: 12px;
			background: #ff4f0a;
			position: absolute;
			top: 20%;
			bottom: 0%;
			left: 20%;

			border-radius: 50%;
		}
	}
`;

export const SelectionContainer = styled.div`
	display: flex;
	height: 140px;
	justify-content: space-between;

	align-items: flex-end;
	flex-direction: column;
`;

export const ButtonContainer = styled.button<ButtonProps>`
	display: flex;
	justify-content: center;
	align-items: center;
	background: ${(props) => (props.itemSelectedBG ? "#ff4f0a" : "#9B9B9B")};
	width: 176px;
	height: 41px;
	border: 2px solid ${(props) => (props.itemSelectedBG ? "#ff4f0a" : "#9B9B9B")};
	border-radius: 3px;
	font-size: 24px;
	font-family: "Patrick Hand", normal;
	color: #ffffff;
	&:hover {
		cursor: pointer;
		background: ${(props) => (props.itemSelectedBG ? "#ba3400" : "#9B9B9B")};
		border: 2px solid
			${(props) => (props.itemSelectedBG ? "#ba3400" : "#9B9B9B")};
	}
	&:active {
		background: ${(props) =>
			props.itemSelectedBG
				? "linear-gradient(180deg, #ff4f0a 0%, rgba(255, 79, 10, 0.56) 100%)"
				: "#9B9B9B"};
		border: 1px solid
			${(props) => (props.itemSelectedBG ? "#ff7037" : "#9B9B9B")};
	}
	@media (max-width: 769px) {
		width: 320px;
		align-self: bottom;
	}
`;
export const ButtonContainer2 = styled(ButtonContainer)<UnequipButtonProps>`
	margin-top: 99px;
	align-self: flex-end;
	background: ${(props) => (props.unequipSelected ? "#ff4f0a" : "#9B9B9B")};
	border: 2px solid
		${(props) => (props.unequipSelected ? "#ff4f0a" : "#9B9B9B")};
	&:hover {
		cursor: pointer;
		background: ${(props) => (props.unequipSelected ? "#ba3400" : "#9B9B9B")};
		border: 2px solid
			${(props) => (props.unequipSelected ? "#ba3400" : "#9B9B9B")};
	}
	&:active {
		background: ${(props) =>
			props.itemSelectedBG
				? "linear-gradient(180deg, #ff4f0a 0%, rgba(255, 79, 10, 0.56) 100%)"
				: "#9B9B9B"};
		border: 1px solid
			${(props) => (props.unequipSelected ? "#ff7037" : "#9B9B9B")};
	}
`;
export const DropdownContainer = styled.div`
	position: absolute;
	display: flex;

	margin-top: 50px;

	align-items: center;
	height: fit-content;
	max-height: 175px;
	overflow-y: scroll;
	background: #f5f5f5;
	box-shadow: 0px 4px 8px rgba(155, 155, 155, 0.16);
	border-radius: 8px;
	flex-direction: column;
	&::-webkit-scrollbar {
		width: 4px;
	}
	&::-webkit-scrollbar-thumb {
		background: #757575;
		border-radius: 8px;
	}
`;

export const DropdownItem = styled.div<ModalProps>`
	display: flex;
	justify-content: space-between;
	align-items: center;

	padding: 10px 24px 7px 24px;
	border-bottom: 1px solid #e0e0e0;

	color: ${(props) => (props.selected ? "#ff4f0a" : "#262626")};
	width: 22.5rem;
	font-size: 24px;
	&:hover {
		background: #ececec;
		cursor: pointer;
	}
	@media (max-width: 769px) {
		width: 19.5rem;
	}
`;
export const DropdownContainerPILL = styled(DropdownContainer)`
	padding-top: 97px;
`;
export const DropdownItemPILL = styled(DropdownItem)`
	padding: 10px 24px 7px 24px;
`;

export const Tick = styled(Image)`
	width: 24px;
	height: 24px;
`;
export const PillImage = styled(Image)`
	width: 50px;
	height: 50px;
`;

export const PillImageContainer = styled(Image)`
	width: 19px;
	height: 30.67px;
`;
