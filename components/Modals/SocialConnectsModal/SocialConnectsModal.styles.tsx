import styled from "styled-components";
import CloseIcon from "../../../public/SocialConnectsCLOSE.svg";
import SearchbarImage from "../../../public/SearchIconSocialConnects.svg";
import Image from "next/image";
export const ModalContainer = styled.div`
	position: fixed;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.75);
	backdrop-filter: blur(2px);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 2;
	width: 100vw;
	height: 100vh;
`;

export const Container = styled.div`
	display: flex;
	width: 509px;
	height: 771px;
	flex-direction: column;
	align-items: center;
	background: #fff;
	border-radius: 12px;
	gap: 24px;
`;

export const HeaderContainer = styled.div`
	display: flex;

	width: 100%;
	height: 56px;
	align-items: center;
	border-bottom: 1px solid #e5e5e5;
	justify-content: flex-end;
	box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.12);
	padding-right: 16px;
	padding-bottom: 12px;
	padding-top: 13px;
`;

export const CloseButton = styled(CloseIcon)`
	display: flex;

	width: 31px;
	height: 31px;
	cursor: pointer;
`;
export const Header = styled.div`
	display: flex;
	color: #000;
	font-family: Poppins;
	font-size: 20px;
	font-style: normal;
	font-weight: 700;
	line-height: 24px;
	text-align: center;
`;
export const HeaderContent = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	gap: 120px;
`;

export const ContentContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	width: 100%;

	padding-left: 16px;
	padding-right: 16px;
`;

export const TabContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	gap: 155px;
	color: #000;
	font-family: Poppins;
	font-size: 20px;
	font-style: normal;
	font-weight: 600;
	line-height: normal;
	border-bottom: 1px solid #e5e5e5;
`;

export const SearchbarContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	padding-left: 16px;
	padding-right: 16px;
	border-radius: 8px;
	background: #f0f2f5;
	height: 48px;
	margin-top: 24px;

	border: none;
	gap: 8px;
`;
export const Searchbar = styled.input`
	display: flex;
	border: none;
	background: none;

	&:focus {
		outline: none;
	}

	color: #6c6c6c;
	font-family: Poppins;
	font-size: 20px;
`;

export const SearchbarIcon = styled(SearchbarImage)`
	width: 32px;
	height: 32px;
`;

export const ListContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 24px;

	height: 100%;
	max-height: 555px;

	overflow: overlay;

	gap: 16px;
	&::-webkit-scrollbar {
		width: 4px;
	}
	&::-webkit-scrollbar-thumb {
		background: #757575;
		border-radius: 8px;
	}
`;
export const ProfileContainer = styled.div`
	display: flex;
	height: 50px;
	width: 100%;
	flex-direction: row;
	border-radius: 8px;

	&:hover {
		cursor: pointer;
		background: #f8f8ff;
	}
`;
export const ProfileImageDisplay = styled(Image)`
	width: 58px;
	height: 50px;
	border-radius: 50%;
	&:hover {
		cursor: pointer;
		opacity: 0.8;
	}
`;

export const ProfileNameContainer = styled.div`
	display: flex;

	flex-direction: column;
`;

export const DisplayName = styled.h1`
	color: #0f1419;
	font-family: Poppins;
	font-size: 18px;
	font-style: normal;
	font-weight: 700;
	line-height: 20px;
	margin-top: 0px;
	&:hover {
		cursor: pointer;
		text-decoration: underline;
	}
`;
export const HandleName = styled.p`
	margin-top: -5px;
	color: #5b7083;
	font-family: Poppins;
	font-size: 16px;
	font-style: normal;
	font-weight: 400;
	line-height: 20px;
`;
export const RemoveButton = styled.button`
	display: flex;
	height: 40px;
	width: 87px;
	padding: 8px 16px;
	justify-content: center;
	align-items: center;
	border-radius: 6px;
	border: 1px solid #ff4f0a;
	background: #fff;
	color: #ff4f0a;
	text-align: center;
	font-family: Patrick Hand;
	font-size: 20px;
	font-style: normal;
	font-weight: 400;
	line-height: 100%;
	cursor: pointer;
	&:hover {
		cursor: pointer;
		background: #ffeaea;
	}
`;
export const NameRemoveWrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	width: 100%;
	margin-left: 12px;
	margin-right: 10px;
`;

export const ProfilePicNameWrapperClickable = styled.div`
	display: flex;
	width: 100%;
	height: 100%;
`;
