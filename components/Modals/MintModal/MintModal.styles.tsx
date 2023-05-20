import styled, { keyframes } from "styled-components";
import InfoIcon from "../../../public/svgs/information.svg";

const toastInRight = keyframes`
    from {
		transform: translateX(100%);
	}
	to {
		transform: translateX(0);
	}
`;
export const ModalContainer = styled.div`
	width: 100%;
	height: fit-content;
	overflow: overlay;
	background: rgba(41, 41, 110, 1);
	font-weight: 400;
	border: 1px solid #e4e4e4;
	border-radius: 5px;
	color: white;
	margin: auto;
	display: flex;
	flex-direction: column;
	transition: transform 0.6s ease-in-out;
	animation: ${toastInRight} 0.7s;
	padding: 24px;
	font-size: 22px;
	@media screen and (max-width: 750px) {
		position: fixed;
		top: 100px;
		width: 100%;
		height: calc(100vh - 150px);
		margin: 20px auto;
		text {
			padding: 0 2rem;
		}
	}
`;

export const CloseButton = styled.button`
	position: absolute;
	right: 20px;
	float: right;
	padding: 11px;
	stroke: white;
	cursor: pointer;
	background-color: #ff4f0a;
	border: none;
	border-radius: 5px;
`;

export const Header = styled.div`
	text-align: center;
	font-size: 34px;
	white-space: nowrap;

	padding-bottom: 18px;
	border-bottom: 3px solid #ffffff;
`;

export const Label = styled.div`
	font-size: 34px;
	line-height: 110%;
	padding-top: 20px;
	padding-bottom: 12px;
`;

export const ItemsContainer = styled.div`
	background-color: #35358f;
	padding: 13px;
	margin-top: 2px;
	border-radius: 5px;
`;
export const Title = styled.div`
	color: #e0e0e0;
	font-size: 24px;
	font-weight: 400;
	line-height: 110%;
	letter-spacing: -0.02em;
	padding-bottom: 7px;
`;
export const Item = styled.div`
	display: flex;
`;

export const ItemName = styled.div`
	font-size: 32px;
	line-height: 100%;
`;

export const ItemPrice = styled.div`
	font-size: 24px;
	line-height: 100%;
	margin-left: auto;
	display: flex;
	align-items: flex-end;
`;
export const ItemPriceSpan = styled.span`
	font-size: 24px;
`;
export const ItemPriceSpan2 = styled.span`
	font-size: 32px;
`;
export const Information = styled.div`
	font-size: 20px;
	line-height: 120%;
	text-align: center;
	padding-top: 12px;
	margin-bottom: 12px;
`;

export const Stepper = styled.div`
	padding-left: 13px;
`;

export const TipContainer = styled.div`
	display: flex;
	border-bottom: 3px solid #ffffff;
	padding-bottom: 18px;
	position: relative;
`;

export const InformationIcon = styled(InfoIcon)`
margin-top: 10px;
&:hover {
    background-color: #FF4F0A
    border-radius: 7px;

}

`;

export const TipText = styled.div`
	margin-top: 10px;
`;
export const HoverContainer = styled.div`
	position: relative;
`;
export const HoverTip = styled.div`
	width: 185px;
	text-align: left;
	position: absolute;
	left: 60px;
	bottom: 50px;
	font-size: 18px;
	line-height: 120%;
	padding: 8px;
	border: 0.5px solid white;
	border-radius: 5px;
	background-color: #212158;
`;

export const StepperButtonContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin-left: auto;
	margin-right: 4px;
	background: #4545b1;
	border-radius: 5px;
`;

export const StepperButton = styled.div`
	border-bottom: 1px solid #35358f;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 8px 13px;
`;

export const StepperContainer = styled.div`
	background: #35358f;
	border-radius: 5px;
	margin-right: 0;
	padding-right: 13px;
	font-size: 24px;

	span {
		margin-left: 5px;
	}
`;

export const TextField = styled.input`
	background: #4545b1;
	border: 2px solid #35358f;
	mix-blend-mode: normal;
	border-radius: 5px;
	width: 111px;
	height: 60px;
	font-size: 32px;
	padding-right: 5px;
	padding-bottom: -20px;
	padding-top: 10px;
	text-align: end;
	font-family: "Patrick Hand";
	color: white;
	-moz-appearance: textfield;

	&::placeholder {
		color: #c5c5e7;
	}
	&::-webkit-outer-spin-button,
	&::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
	span {
		margin-left: 5px;
	}
`;

export const ReceiptContainer = styled.div`
	display: flex;
	flex-direction: column;
	color: #e0e0e0;
	padding-top: 12px;
	padding-right: 13px;
`;

export const Total = styled.div`
	color: #ffffff;
	font-size: 40px;
	padding-top: 16px;
	font-weight: 400;
`;

export const TotalSpan = styled.span`
	float: right;
	span {
		font-size: 28px;
	}
`;

export const MintButton = styled.div`
	font-size: 32px;
	width: 100%;
	background-color: #ff4f0a;
	border-radius: 5px;
	text-align: center;
	padding: 9px;
	margin-top: 24px;
	border-radius: 5px;
	color: #ffffff;
	border: 2px solid #ffffff;
`;

export const SubTotalBaseMint = styled.div`
	margin-top: 4px;
`;

export const BaseMint = styled.div`
	margin-top: 12px;
`;
export const SubTotalBaseMintSpan = styled.span`
	float: right;
	font-size: 24px;
	span {
		font-size: 20px;
	}
`;
