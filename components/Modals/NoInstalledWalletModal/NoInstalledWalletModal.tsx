import {
	MenuText,
	Button,
	ButtonText,
	ButtonIcon,
	ModalContainer,
} from "./NoInstalledWalletModal.styles";

export const NoInstalledWalletModal = () => {
	return (
		<ModalContainer>
			<Button
				href="https://chrome.google.com/webstore/detail/argent-x-starknet-wallet/dlcobpjiigpikoobohmabehhmhfoodbb"
				target="_blank"
				rel="noreferrer">
				<ButtonText>Install Argent X</ButtonText>
				<picture>
					<ButtonIcon src="/argent-logo.png" alt="" />
				</picture>
			</Button>
			<Button
				href="https://chrome.google.com/webstore/detail/braavos-wallet/jnlgamecbpmbajjfhmmmlhejkemejdma"
				target="_blank"
				rel="noreferrer">
				<ButtonText>Install Braavos</ButtonText>
				<picture>
					<ButtonIcon src="/braavos-logo.png" alt="" />
				</picture>
			</Button>
			<MenuText>
				<b> *You do not have any compatible wallets installed </b>
			</MenuText>
		</ModalContainer>
	);
};
