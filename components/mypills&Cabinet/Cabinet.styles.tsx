import styled from "styled-components";
import Image from "next/image";
import SortIconn from "../../public/svgs/sortIcon.svg";

//Interface  ↓ ↓ ↓
interface StarkpillsHeaderProps {
	sortOption?: number;
}

export const CardContainer = styled.div`
	display: grid;
	--grid-layout-gap: 10px;
	--grid-column-count: 6;
	--grid-item--min-width: 200px;
	--gap-count: calc(var(--grid-column-count) - 1);
	--total-gap-width: calc(var(--gap-count) * var(--grid-layout-gap));
	--grid-item--max-width: calc(
		(100% - var(--total-gap-width)) / var(--grid-column-count)
	);
	grid-template-columns: repeat(
		auto-fill,
		minmax(max(var(--grid-item--min-width), var(--grid-item--max-width)), 1fr)
	);
	grid-template-rows: max-content;
	grid-gap: 2rem;
	height: 100%;
	margin-top: 2.5rem;
	margin-right: 8px;
	padding-bottom: 10vh;
`;
export const Top3Container = styled.div`
	display: flex;
	justify-content: center;
	gap: 2rem;
	margin-top: 2.5rem;
	@media screen and (max-width: 750px) {
		flex-direction: column;
	}
`;
export const ConnectWalletButtonContainer = styled.div`
	margin-top: 40px;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`;
export const ConnectYourWallet = styled.div`
	display: block;
	align-items: center;
	justify-content: center;
	text-align: center;
`;

export const ConnectYourWalletText = styled.div`
	font-size: 32px;
`;

export const NoPillsFoundText = styled.div`
	text-align: center;
	width: 100%;
`;
export const Footer = styled.footer`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: auto;
	margin-bottom: 0;
	margin-top: auto;
	margin-bottom: 1rem;

    a{
        href:"https://www.seraphlabs.io/"
        target:"_blank"
        rel:"noreferrer"
    }
`;

export const SortWrapper = styled.div`
	display: flex;
	justify-content: flex-end;
	padding-right: 20px;
	@media screen and (max-width: 800px) {
		justify-content: center;
		padding-right: 0;
	}
`;

export const SortContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	gap: 8px;
	margin-bottom: -60px;
	margin-top: 40px;
	margin-right: 12px;
	width: fit-content;
	height: auto;
	background: #12124a;
	border: 1px solid #bfbfbf;
	border-radius: 8px;

	&:hover {
		background: #242424;
		cursor: pointer;
	}
	&:focus {
		background: #111111;
	}
	@media screen and (max-width: 800px) {
		width: 100%;
		margin: 24px 30px;
	}
`;

//Headers ↓ ↓ ↓
export const LoadingHeader = styled.h1`
	text-align: center;
	padding-top: 2rem;
`;
export const Top3Header = styled.h1`
	text-align: center;
	font-size: 40px;
`;

export const StarkPillsHeader = styled.h1<StarkpillsHeaderProps>`
	text-align: center;
	font-size: 40px;
	margin-top: ${(props) => (props.sortOption == 3 ? "-1rem" : "5rem")};
`;

//Sort Function  ↓ ↓ ↓
export const SortButton = styled.button`
	display: flex;
	text-align: center;
	justify-content: center;
	gap: 8px;
	font-size: 24px;
	letter-spacing: -0.15px;

	width: fit-content;
	padding: 12px 16px;
	border: none;
	background-color: transparent;
	color: #ffffff;
	font-family: Patrick hand;

	&:selected {
		background: pink;
	}
`;

export const DropdownWrapper = styled.div`
	position: relative;
	align-items: center;
`;

export const DropdownMenu = styled.div`
	position: absolute;
	right: 0px;
	top: 100%;
	margin-top: 16px;
	width: 242px;
	box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
	z-index: 4;
	display: flex;
	flex-direction: column;
	span {
		margin-left: 16px;
	}
	}
	@media screen and (max-width: 768px) {
		position: fixed;
		width: 100%;
		height: auto; /* Change the height to auto */
		max-height: 80%; /* Set a maximum height for the menu */
		top: auto; /* Remove the top positioning */
		bottom: 0; /* Position the drawer at the bottom */
		left: 0;
		margin-top: 0;
		overflow-y: auto;
		border-radius: 8px 8px 0 0; /* Add border-radius to the top */
	}
`;
export const MenuLabel = styled.label`
	display: block;
	position: relative;
	padding: 16px 16px 16px 0px;
	border: 1px solid #e9e9e9;
	font-weight: bold;
	cursor: pointer;
	background-color: #ffffff;
	color: #262626;
	font-size: 24px;

	&:hover {
		background-color: #f1f1f1;
	}

	&:focus {
		outline: none;
		box-shadow: 0 0 0 3px rgba(18, 18, 74, 0.5);
	}

	&:first-child {
		border-radius: 8px 8px 0px 0px;
	}
	&:last-child {
		border-radius: 0px 0px 8px 8px;
	}
`;
export const MenuInput = styled.input.attrs({ type: "radio" })`
	position: absolute;
	opacity: 0;

	&:checked {
		background-color: #ff4f0a;
		border-color: #ff4f0a;
	}

	// For checked sibling label
	&:checked + ${MenuLabel}::before {
		background-color: #ff4f0a;
		border-color: #ff4f0a;
	}
	visibility: hidden;

	&:checked + span {
		border: 2px solid #ff4f0a;
	}

	&:checked + span:after {
		opacity: 1;
	}
`;

export const RadioInput = styled.input.attrs({ type: "radio" })`
	visibility: hidden;

	&:checked + span {
		border: 2px solid #ff4f0a;
	}

	&:checked + span:after {
		opacity: 1;
	}
`;
export const CustomRadio = styled.span`
	cursor: pointer;
	width: 20px;
	height: 20px;
	border: 2px solid #ff4f0a;
	border-radius: 50%;
	display: inline-block;
	position: relative;

	&::after {
		content: "";
		width: 10px;
		height: 10px;
		background: #ff4f0a;
		position: absolute;
		border-radius: 50%;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		opacity: 0;
		transition: opacity 0.2s;
	}
`;

//Sort Icon ↓ ↓ ↓
export const SortIcon = styled(SortIconn)`
	margin: auto;
`;

//SeraphLabs Logo ↓ ↓ ↓
export const CompanyLogo = styled(Image)`
	position: fixed;
	bottom: 0px;
	left: 600px;
	margin: 14px;

	@media screen and (max-width: 750px) {
		visibility: hidden;
	}
`;
