import styled from "styled-components";
import { Trait } from "../../../types/interfaces";
import Image from "next/image";
interface TraitCardProps {
	trait?: Trait;
	isSelected: boolean;
	isHidden?: boolean;
}
export const TraitCardWrapper = styled.div<TraitCardProps>`
	outline: 1px solid transparent;
	border-radius: 5px;
	${(props) => props.isSelected && "outline-color: white;"}
`;
export const TraitCardContainer = styled.div<TraitCardProps>`
	position: relative;
	width: 100%;
	aspect-ratio: 1/1;
	background-color: #f5f5f5;
	border-radius: 5px 5px 0 0;
	${(props) => props.isSelected && "background-color: rgba(0, 0, 0, 0.2);"}
	${(props) => props.isSelected && "border-bottom: none;"}

	&::after {
		content: "";
		position: absolute;
		inset: 0;
		background: black;
		opacity: 0.5;
		cursor: not-allowed;
		display: ${(props) => (props.isHidden ? "block" : "none")};
	}
`;
export const TraitCardImage = styled(Image)`
	border-radius: 5px 5px 0 0;
`;
export const PriceFlag = styled.div`
	width: fit-content;
	height: auto;
	padding: 4px 3px 4px 13px;
	position: relative;
	top: 7px;
	margin-right: 0;
	margin-left: auto;
	background: ${(props) => props.theme.primaryColor};
	color: white;
	font-size: 22px;
	letter-spacing: 0.2em;
	text-align: center;
	border: 0.5px solid white;
	border-top-left-radius: 8px;
	border-bottom-left-radius: 8px;
	span {
		margin-right: 4px;
		margin-left: auto;
		letter-spacing: 0px;
	}
`;
export const QuantityLabelContainer = styled.div`
	position: absolute;
	bottom: 5px;
	width: 100%;
	justify-content: center;
	align-items: center;
	display: flex;
`;
export const QuantityLabelContent = styled.div<TraitCardProps>`
	position: relative;
	width: 96px;
	bottom: 5px;
	border: 1px solid white;
	border-radius: 20px;
	text-align: center;
	font-size: 18px;
	padding: 5px 10px;
	${(props) => props.isSelected && "background-color: #9D9D9D;"}
`;

export const RedeemLabel = styled.div<TraitCardProps>`
	position: relative;
	width: fit-content;
	bottom: 5px;
	border: 1px solid white;
	border-radius: 20px;
	text-align: center;
	font-family: "Patrick Hand";
	font-style: normal;
	font-weight: 400;
	font-size: 18px;
	line-height: 100%;
	padding: 10px 20px;
	background: #eecccc;
	color: #aa0000;
	@media (max-width: 540px) {
		font-size: 14px;
	}
`;

export const TraitNameLabel = styled.div<TraitCardProps>`
	position: relative;
	background-color: ${(props) => props.theme.primaryColor};
	border-radius: 0 0 5px 5px;
	font-size: 25px;
	border-top: 2px solid #f6a787;
	text-align: center;
	padding: 7px 0;
	${(props) => props.isHidden && "border-top: 2px solid grey;"}
	${(props) => props.isSelected && "border-top: 2px solid #d03b00;"}
	${(props) => !props.isSelected && "backdrop-filter: blur(300px);"}
	&::after {
		content: "";
		position: absolute;
		inset: 0;
		background: black;
		opacity: 0.5;
		border-radius: 0 0 5px 5px;
		cursor: not-allowed;
		display: ${(props) => (props.isHidden ? "block" : "none")};
	}
`;
