import { useRouter } from "next/router";
import { useState } from "react";
import { PAGES, USERPAGES } from "../../../types/constants";
import { ConnectWalletButton } from "../../ConnectWalletButton";
import Hamburger from "../../../../public/hamburger.svg";

import { LinksModal } from "../../Modals/LinksModal";
import Image from "next/image";

import { useAccount } from "@starknet-react/core";
import { convertToStandardWalletAddress } from "../../../types/utils";
import {
	ButtonContainer,
	Hamburger_menu,
	LinksContainer,
	LogoDiv,
	NavbarContainer,
	NavbarDiv,
	StyledLink,
	StyedLinkLogo,
	Cross_Icon,
} from "./Navbar.styles";
import Link from "next/link";

export const Navbar = () => {
	const router = useRouter();
	const [showModal, setShowModal] = useState(false);
	const { address } = useAccount();

	return (
		<>
			<NavbarContainer>
				<NavbarDiv>
					<StyedLinkLogo
						isActive={false}
						href="/mint"
						onClick={() => setShowModal(false)}>
						<LogoDiv>
							<Image
								src="/logo.png"
								alt={""}
								width={267}
								height={83}
								style={{ marginTop: "10px" }}
							/>
						</LogoDiv>
					</StyedLinkLogo>
					<LinksContainer>
						{PAGES.map(
							(page, index) =>
								page.isActive && (
									<StyledLink
										isActive={router.pathname === page.link}
										href={page.link}
										key={index}>
										{page.title} {page.isBeta && <sup>Beta</sup>}
									</StyledLink>
								)
						)}
						{address &&
							USERPAGES.map(
								(page, index) =>
									page.isActive && (
										<StyledLink
											isActive={router.pathname === page.link}
											href={
												page.paramName
													? page.link +
													  page.paramName +
													  convertToStandardWalletAddress(address)
													: page.link
											}
											key={index}>
											{page.title}
										</StyledLink>
									)
							)}
					</LinksContainer>
					<ButtonContainer>
						<ConnectWalletButton />
					</ButtonContainer>
					{showModal ? (
						<Cross_Icon onClick={() => setShowModal(false)} />
					) : (
						<Hamburger_menu onClick={() => setShowModal(true)} />
					)}
				</NavbarDiv>
			</NavbarContainer>
			{showModal && <LinksModal close={() => setShowModal(false)} />}
		</>
	);
};
