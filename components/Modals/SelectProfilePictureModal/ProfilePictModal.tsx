import { useQuery } from "@apollo/client";
import { GET_USER_TOKENS_FOR_PROFILE_PICT } from "../../../types/constants";
import {
	ModalContainer,
	Container,
	Title,
	Subtitle,
	CloseButton,
	PillContainer,
} from "./ProfilePictModal.style";
import { updateProfilePicture } from "../../../types/utils";
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
				<Title>NEED DESIGN*</Title>
				<Subtitle>Select from the pills you own</Subtitle>
				<PillContainer>
					{userTokens.map((token: any) => {
						return (
							<div onClick={() => handlePillClick(token.id)} key={token.id}>
								<img src={token.metadata.imageUrl} width={100} height={100} />
							</div>
						);
					})}
				</PillContainer>
			</Container>
		</ModalContainer>
	);
};
