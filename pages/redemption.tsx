import { useEffect, useState } from "react";
import RedemptionPageComponent from "../components/DynamicPages/RedemptionPage";
export default function Redemption() {
	const [shouldRender, setShouldRender] = useState(false);
	useEffect(() => {
		if (typeof window !== "undefined") {
			setShouldRender(true);
		}
	}, []);

	return shouldRender ? <RedemptionPageComponent /> : null;
}

// const wallet = useAccount();
// const { address } = useStarknetWallet();
// const { open } = useWeb3Modal();
// const router = useRouter();
// const selectProject = (project: CollabProject) => {
// 	if (wallet.isConnected && wallet.address) {
// 		router.push("/nftOwned?project=" + project.contract_address);
// 	} else {
// 		open();
// 	}
// };

// return (
// 	<RedemptionPageContainer>
// 		{address ? (
// 			<ContentContainer>
// 				<ContentWrapper>
// 					<HeaderContainer>
// 						<HeaderText>Redemption</HeaderText>
// 						<ContentText>
// 							Introducing our NFT Redemption Page. We are thrilled to present
// 							members of different communities and projects that we love, the
// 							unique opportunity to claim exclusive traits!
// 						</ContentText>
// 					</HeaderContainer>
// 					<ButtonContainer>
// 						<Web3Button />
// 					</ButtonContainer>
// 				</ContentWrapper>
// 				<CardContainer>
// 					{COLLAB_PROJECTS.map((project, index) => (
// 						<ProjectCard
// 							project={project}
// 							key={index}
// 							onClick={() => selectProject(project)}
// 						/>
// 					))}
// 				</CardContainer>
// 			</ContentContainer>
// 		) : (
// 			<Disconnected text="To access your redemptions, please link your wallet first." />
// 		)}
// 	</RedemptionPageContainer>
// );
