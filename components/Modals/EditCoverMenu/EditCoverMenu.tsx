import {
	MenuContainer,
	MenuOption,
	RemovePhoto,
	UploadPhoto,
} from "./EditCoverMenu.styles";

export const EditCoverMenu = () => {
	return (
		<>
			<MenuContainer>
				<MenuOption>
					<UploadPhoto />
					Upload photo
				</MenuOption>
				<MenuOption>
					<RemovePhoto />
					Remove
				</MenuOption>
			</MenuContainer>
		</>
	);
};
