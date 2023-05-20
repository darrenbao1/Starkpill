import styled from "styled-components";
import Image from "next/image";
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
export const CompanyLogo = styled(Image)`
	position: fixed;
	bottom: 0px;
	left: 600px;
	margin: 14px;

	@media screen and (max-width: 750px) {
		visibility: hidden;
	}
`;
