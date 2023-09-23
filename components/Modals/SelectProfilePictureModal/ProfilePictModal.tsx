import { useQuery } from "@apollo/client";
import { GET_USER_TOKENS_FOR_PROFILE_PICT } from "../../../types/constants";
import {
	ModalContainer,
	Container,
	Title,
	Subtitle,
	CloseButton,
	PillContainer,
	HeaderContainer,
} from "./ProfilePictModal.style";
import { updateProfilePicture } from "../../../types/utils";
import Image from "next/image";
interface Props {
	ownerAddress: string;
	close: () => void;
	refetch: () => void;
}
export const ProfilePictModal = ({ ownerAddress, close, refetch }: Props) => {
	//graphql query to get user tokens
	const { data, loading, error } = useQuery(GET_USER_TOKENS_FOR_PROFILE_PICT, {
		variables: {
			address: ownerAddress,
		},
	});
	if (loading) {
		return <div>Loading...</div>;
	}
	if (error) {
		return <div>Error: {error.message}</div>;
	}
	if (!data) {
		return <div>No data</div>;
	}
	const userTokens = data.user.tokens;
	const handlePillClick = async (tokenId: number) => {
		await updateProfilePicture(tokenId).then(() => {
			refetch();
			close();
		});
	};
	return (
		<ModalContainer>
			<Container>
				<CloseButton onClick={close} />
				<HeaderContainer>
					<Title>Set profile picture </Title>
				</HeaderContainer>

				<PillContainer>
					{userTokens.map((token: any) => {
						return (
							<div onClick={() => handlePillClick(token.id)} key={token.id}>
								<Image
									src={token.metadata.imageUrl}
									width={147}
									height={153}
									alt={token.id}
									style={{ boxShadow: "1px 2px 4px 1px rgba(0, 0, 0, 0.12)" }}
								/>
							</div>
						);
					})}
				</PillContainer>
			</Container>
		</ModalContainer>
	);
};
