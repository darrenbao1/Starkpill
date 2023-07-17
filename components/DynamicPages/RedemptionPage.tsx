import { Web3Button, useWeb3Modal } from "@web3modal/react";
import {
	RedemptionPageContainer,
	ContentContainer,
	ContentWrapper,
	HeaderContainer,
	HeaderText,
	ContentText,
	ButtonContainer,
	CardContainer,
} from "../../styles/Redemption.styles";
import { ProjectCard } from "../Redemption/ProjectCard.tsx/ProjectCard";
import { Disconnected } from "../DisconnectedPage.tsx/Disconnected";
import { COLLAB_PROJECTS } from "../../types/constants";
import { CollabProject } from "../../types/interfaces";
import { useAccount } from "wagmi";
import { useRouter } from "next/router";
import { useAccount as useStarknetWallet } from "@starknet-react/core";
const RedemptionPageComponent = () => {
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
};

export default RedemptionPageComponent;
