import styled, { css } from "styled-components";

import Link from "next/link";
import HamburgerIcon from "../../../public/hamburger.svg";
import CrossIcon from "../../../public/cross.svg";

interface LinksProps {
	isActive: boolean;
}
// interface HamburgerProps {
// 	showModal: boolean;
// }
export const NavbarContainer = styled.div`
	width: 100vw;
	background-color: ${(props) => props.theme.bgColor};
`;

export const NavbarDiv = styled.div`
	nax-width: 1440px;
	height: 100px;
	background-color: ${(props) => props.theme.bgColor};
	color: white;
	padding-left: 2rem;
	display: flex;
	margin: 0 auto;
`;

export const LogoDiv = styled.div`
	font-weight: 700;
	font-size: 40px;
	line-height: 150%;
	display: flex;
	align-items: center;
`;

export const LinksContainer = styled.div`
	margin-left: auto;
	margin-right: 65px;
	margin-top: 25px;

	@media screen and (max-width: 900px) {
		margin-right: 2rem;
	}
	@media screen and (max-width: 1155px) {
		visibility: hidden;
	}
`;

export const StyledLink = styled(Link)<LinksProps>`
	position: relative;
	font-weight: 400;
	font-size: 32px;
	line-height: 150%;
	margin-left: 65px;
	color: ${(props) => (props.isActive ? props.theme.primaryColor : "white")};
	@media screen and (max-width: 900px) {
		margin-left: 2rem;
	}
	@media screen and (max-width: 1320px) {
		visibility: hidden;
	}
	&:hover {
		color: ${(props) => props.theme.primaryColor};
		border-bottom: 1px solid #ff4f0a;
	}

	&:active {
		color: ${(props) => props.theme.primaryColor};
		position: relative;
		font-weight: 400;
		font-size: 32px;
		line-height: 150%;
		margin-left: 65px;
		sup {
			position: absolute;
			top: -10px; /* adjust this value to position the beta symbol */
			right: -30px;
			font-size: 16px;
		}
		@media screen and (max-width: 900px) {
			margin-left: 2rem;
		}
	}

	sup {
		position: absolute;
		top: -10px; /* adjust this value to position the beta symbol */
		right: -30px;
		font-size: 16px;
	}
`;
export const StyedLinkLogo = styled(StyledLink)`
	&:hover {
		border-bottom: none;
	}
`;

export const ButtonContainer = styled.div`
	height: 100px;
	margin-top: 25px;
	margin-bottom: 25px;
	margin-right: 2rem;
	width: 100px;
	@media screen and (max-width: 1320px) {
		visibility: hidden;
	}
	@media screen and (min-width: 700px) {
		min-width: 200px;
	}
`;

// export const Hamburger_menu = styled.span.attrs<HamburgerProps>((props) => ({
// 	showModal: props.showModal ? CrossIcon : HamburgerIcon,
// }))<HamburgerProps>`
// 	width: 0px;
// 	visibility: hidden;
// 	@media screen and (max-width: 1320px) {
// 		visibility: visible;
// 		width: auto;
// 		position: fixed;
// 		top: 40px;
// 		right: 20px;
// `;
const sharedIconStyles = css`
    width: 0px;
	
	@media screen and (max-width: 1320px) {
		visibility: show;
		width: auto;
		position: fixed;
		top: 40px;
		right: 20px;
`;

export const Hamburger_menu = styled(HamburgerIcon)`
	${sharedIconStyles}
`;

export const Cross_Icon = styled(CrossIcon)`
	${sharedIconStyles}
`;
