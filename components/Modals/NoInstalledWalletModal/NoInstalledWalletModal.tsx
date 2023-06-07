import {
	Button,
	Menu_text,
	Button_icon,
	Button_text,
	NoInstalledWalletModalWrapper,
	ButtonWrapper,
	Menu_textWrapper,
} from "./NoInstalledWalletModal.styles";
export const NoInstalledWalletModal = () => {
	return (
		<NoInstalledWalletModalWrapper>
			<ButtonWrapper>
				<Button
					href="https://chrome.google.com/webstore/detail/argent-x-starknet-wallet/dlcobpjiigpikoobohmabehhmhfoodbb"
					target="_blank"
					rel="noreferrer">
					<Button_text>Install Argent X</Button_text>
					<picture>
						<Button_icon src="/argent-logo.png" alt="" />
					</picture>
				</Button>
				<Button
					href="https://chrome.google.com/webstore/detail/braavos-wallet/jnlgamecbpmbajjfhmmmlhejkemejdma"
					target="_blank"
					rel="noreferrer">
					<Button_text>Install Braavos</Button_text>
					<picture>
						<Button_icon src="/braavos-logo.png" alt="" />
					</picture>
				</Button>
			</ButtonWrapper>
			<Menu_textWrapper>
				<Menu_text>*You do not have any compatible wallets installed</Menu_text>
			</Menu_textWrapper>
		</NoInstalledWalletModalWrapper>
	);
};
