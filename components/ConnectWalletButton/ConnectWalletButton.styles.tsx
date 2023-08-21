import styled from "styled-components";
import CopyIcon from "../../public/svgs/CopyIcon.svg";

interface Props {
	showDropDown: boolean;
}

export const Container = styled.div`
	position: fixed;
	top: 77px;
	align-content: center;
	align-items: center;
	z-index: 3;
	margin-left: -180px;
`;

export const DropdownContainer = styled.div`
	max-width: 1440px;
	overflow: hidden;
	border-radius: 8px;
`;

export const Dropdown = styled.div`

	height: fit-content;
	width: 380px;
	float: right;
	background-color: #262233;
	z-index: 3;
	border-radius: 8px;
	display: flex;
	flex-direction: column;
	align-items: center;
   

    }
    `;
export const HeaderContainer = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	padding: 0px 23px 13px 32px;
	margin: 1rem 0rem 0.5rem -0.6rem;
	box-shadow: inset 0px -1px 0px rgba(255, 255, 255, 0.25);
	h1 {
		margin: 0;
		width: 100%;
		font-size: 24px;
		text-align: left;
		line-height: 32px;
	}
`;
export const ContentWrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
`;
export const DisconnectContainer = styled.div`
	display: flex;
	background-color: #3a3649;
	padding: 24px 24px;
`;
export const Disconnect = styled.div`
	width: 100%;

	text-align: center;
	background-color: #fcfcfd;
	color: #667085;
	font-size: 25px;
	padding: 10px 18px;
	border-radius: 5px;
	cursor: pointer;
`;
export const AddressContainer = styled.div`
	display: flex;
	flex-direction: column;
	border-radius: 5px;
	font-size: 20px;
	width: 100%;
	background-color: #262233;
	display: flex;
	padding: 1rem 2.1rem 0rem 0.6rem;
	margin-left: 0.5rem;
	span {
		align-self: flex-start;
		margin-left: 9px;
		margin-bottom: 5px;
		font-size: 20px;
		font-weight: 400;
		line-height: 27px;
	}

	picture {
		margintop: "5px";
	}
`;
export const AddressText = styled.div`
	display: flex;
	border-radius: 6px;
	border: 1px solid #e0e0e0;
	padding: 4px 12px 4px 18px;
	gap: 54px;
	border-radius: 6px;
	max-width: 354px;
	line-height: 40px;
	font-size: 18px;
	margin-left: 8px;
`;
export const EthBalanceContainer = styled.div`
	margin-left: 0rem;
	margin-bottom: 3px;
	margin-top: -14px;
	font-size: 20px;
	flex-direction: column;
	width: 103%;
	display: flex;
	padding: 1rem 1rem 1rem 1rem;
	text {
		margin-left: 8px;
	}
`;
export const TxCrossContainer = styled.div`
	background-color: transparent;
	border: none;
	&:hover {
		cursor: pointer;
	}
`;
export const UserBalanceContainer = styled.div`
	border-radius: 6px;
	border: 1px solid #e0e0e0;
	cursor: pointer;
	margin-top: 8px;
	margin-left: 8px;
	max-width: 354px;
	margin-right: 20px;
	line-height: 40px;
	span {
		font-size: 18px;
		margin-left: 18px;
	}
`;

export const Copy = styled(CopyIcon)`
	margin-right: 0;
	margin-left: auto;
	cursor: pointer;
	align-self: center;
`;

export const ConnectWalletText = styled.div`
	border-radius: 6px;
	height: 40px;
	padding: 8px 16px;

	cursor: pointer;
	background-color: #ff4f0a;
	border: 1px solid rgba(228, 228, 228, 0.6);
	width: 171px;
	text-align: center;
	font-size: 24px;
	line-height: 100%;
`;

export const DownArrow = styled.img<Props>`
	transform: ${(props) => (props.showDropDown ? "rotate(180deg)" : {})};

	width: 15px;
	height: 15px;
`;
