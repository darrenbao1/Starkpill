import Image from "next/image";
import { ConnectWalletButton } from "../ConnectWalletButton";
import {
	DisconnectButton,
	DisconnectTextContent,
	DisconnectedText,
	DisconnectedWrapper,
	Footer,
} from "./Disconnected.styles";

export const Disconnected = (props: { text: string }) => {
	return (
		<>
			<DisconnectedWrapper>
				<DisconnectedText>
					<DisconnectTextContent>{props.text}</DisconnectTextContent>
					<DisconnectButton>
						<ConnectWalletButton />
					</DisconnectButton>
				</DisconnectedText>
			</DisconnectedWrapper>
			<Footer>
				<a href="https://www.seraphlabs.io/" target="_blank" rel="noreferrer">
					<Image
						src="/companyLogo.png"
						height={56}
						width={210}
						alt="seraphLabs"></Image>
				</a>
			</Footer>
		</>
	);
};
