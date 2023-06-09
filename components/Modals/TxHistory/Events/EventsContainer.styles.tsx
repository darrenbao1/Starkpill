import styled, { css } from "styled-components";
import DownArrowIcon from "../../../../public/svgs/DownArrowIcon.svg";
import LinkImage from "../../../../public/svgs/TransferLinkIcon.svg";

interface DropdownProps {
	showDropdown: boolean;
}
export const Container = styled.div`
	display: flex;
	flex-direction: column;
	padding-left: 20px;
	padding-right: 12px;
	padding-top: 12px;

	background: #f5f5f5;
	width: 287px;
	height: fit-content;

	border-radius: 6px;
	color: #262626;
	min-height: 48px;

	h1 {
		font-weight: 400;
		font-size: 18px;
		line-height: 24px;

		color: #262626;
	}
`;
export const Header = styled.div<DropdownProps>`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;

	padding-bottom: ${(props: DropdownProps) =>
		props.showDropdown ? "8px" : "0px"};

	box-shadow: ${(props: DropdownProps) =>
		props.showDropdown ? "inset 0px -1px 0px rgba(0, 0, 0, 0.25)" : "none"};
`;
export const DropdownContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: fit-content;
	max-height: 129px;

	background: #f5f5f5;
`;

export const DropdownItem = styled.div`
	width: 100%;
	height: 40px;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;

	align-items: center;
`;
export const DropdownItem2 = styled(DropdownItem)`
	justify-content: space-between;
	align-items: center;
`;

export const IconsContainer = styled.div`
	display: flex;
	flex-direction: row;
	gap: 6px;
	align-items: center;
	height: fit-content;
`;
export const DropdownItemWrapper = styled(IconsContainer)``;
export const DropdownTimeIconContainer = styled(IconsContainer)`
	color: #ff4f0a;
`;

export const HighlightedText = styled.text`
	font-weight: 400;
	font-size: 18px;
	line-height: 24px;

	color: #ff4f0a;
`;

export const MintedWrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;

//ICONS
export const StyledIcons = css`
	&:hover {
		cursor: pointer;
	}
`;

export const DownArrow = styled(DownArrowIcon)`
	${StyledIcons}
`;

export const LinkIcon = styled(LinkImage)`
	${StyledIcons}
`;
