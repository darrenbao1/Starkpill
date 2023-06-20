import { CollabProject } from "../types/interfaces";
import { Web3Button, useWeb3Modal } from "@web3modal/react";
import { useAccount } from "wagmi";
import { useAccount as useStarknetWallet } from "@starknet-react/core";
import { COLLAB_PROJECTS } from "../types/constants";
import { ProjectCard } from "../components/Redemption/ProjectCard.tsx/ProjectCard";
import { useRouter } from "next/router";
import {
	ButtonContainer,
	ContentContainer,
	ContentText,
	ContentWrapper,
	HeaderContainer,
	HeaderText,
	RedemptionPageContainer,
	CardContainer,
} from "../styles/Redemption.styles";
import { Disconnected } from "../components/DisconnectedPage.tsx/Disconnected";
export default function Redemption() {
	const wallet = useAccount();
	const { address } = useStarknetWallet();
	const { open } = useWeb3Modal();
	const router = useRouter();
	const selectProject = (project: CollabProject) => {
		if (wallet.isConnected && wallet.address) {
			router.push("/nftOwned?project=" + project.contract_address);
		} else {
			open();
		}
	};
	return (
		<RedemptionPageContainer>
			{address ? (
				<ContentContainer>
					<ContentWrapper>
						<HeaderContainer>
							<HeaderText>Redemption</HeaderText>
							<ContentText>
								Introducing our NFT Redemption Page. We are thrilled to present
								members of different communities and projects that we love, the
								unique opportunity to claim exclusive traits!
							</ContentText>
						</HeaderContainer>
						<ButtonContainer>
							<Web3Button />
						</ButtonContainer>
					</ContentWrapper>
					<CardContainer>
						{COLLAB_PROJECTS.map((project, index) => (
							<ProjectCard
								project={project}
								key={index}
								onClick={() => selectProject(project)}
							/>
						))}
					</CardContainer>
				</ContentContainer>
			) : (
				<Disconnected text="To access your redemptions, please link your wallet first." />
			)}
		</RedemptionPageContainer>
	);
}
