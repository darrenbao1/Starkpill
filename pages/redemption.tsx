import { useEffect, useState } from "react";
import RedemptionPageComponent from "../components/DynamicPages/RedemptionPage";
import sharedBackgroundStyles from "../styles/sharedBackground.module.css";
export default function Redemption() {
	const [shouldRender, setShouldRender] = useState(false);
	useEffect(() => {
		let timeoutId: NodeJS.Timeout | null = null;

		if (typeof window !== "undefined") {
			timeoutId = setTimeout(() => {
				setShouldRender(true);
			}, 100);
		}

		return () => {
			if (timeoutId) {
				clearTimeout(timeoutId);
			}
		};
	}, []);

	return shouldRender ? (
		<RedemptionPageComponent />
	) : (
		<div
			className={`container ${sharedBackgroundStyles.extendedBackground}`}></div>
	);
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
