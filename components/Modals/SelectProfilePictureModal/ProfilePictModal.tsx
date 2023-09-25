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
	PillImage,
} from "./ProfilePictModal.style";
import { GetResponseMessage, updateProfilePicture } from "../../../types/utils";
import { useToast } from "../../Provider/ToastProvider";

interface Props {
	ownerAddress: string;
	close: () => void;
	refetch: () => void;
}
export const ProfilePictModal = ({ ownerAddress, close, refetch }: Props) => {
	const { showToast } = useToast();
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
		await updateProfilePicture(tokenId).then((message) => {
			showToast(GetResponseMessage(message));
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
								<PillImage
									src={token.metadata.imageUrl}
									width={147}
									height={153}
									alt={token.id}
								/>
							</div>
						);
					})}
				</PillContainer>
			</Container>
		</ModalContainer>
	);
};
