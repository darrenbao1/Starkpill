import styled from "styled-components";
import CopyIcon from "../../public/svgs/CopyIcon.svg";

interface Props {
	showDropDown: boolean;
}

export const Container = styled.div`
	position: fixed;
	top: 110px;
	align-content: center;
	align-items: center;
	z-index: 3;
	margin-left: -180px;
`;

export const DropdownContainer = styled.div`
	max-width: 1440px;
	overflow: hidden;
`;

export const Dropdown = styled.div`
padding: 1rem 1rem;
	height: fit-content;
	width: 380px;
	float: right;
	background-color: #29296e;
	z-index: 3;
	border-radius: 8px;
	display: flex;
	flex-direction: column;
	align-items: center;
    h1{
        margin: 0;
        width: 100%;
        text-align: center;
    }
    span{
        margin-top: 1rem;
	    margin-bottom: 1rem;
	    margin-left: 0;
	    margin-right: auto;
        fontSize: "1.5em", fontWeight: "400"
}
    }
    `;
export const Disconnect = styled.div`
	width: 100%;
	text-align: center;
	background-color: #ff4f0a;
	font-size: 25px;
	border: 1px solid #ff4f0a;
	border-radius: 5px;
	cursor: pointer;
	&:hover {
		color: #ff4f0a;
		background-color: transparent;
	}
`;
export const AddressContainer = styled.div`
	border-radius: 5px;
	font-size: 20px;
	width: 100%;
	background-color: #3d3d91;
	display: flex;
	padding: 1rem 1rem;
	picture {
		margintop: "5px";
	}
`;
export const EthBalanceContainer = styled(AddressContainer)`
	margin-bottom: 20px;
	font-size: 20px;
`;
export const Copy = styled(CopyIcon)`
	margin-right: 0;
	margin-left: auto;
	cursor: pointer;
`;

export const ConnectWalletText = styled.div`
	border-radius: 6px;
	height: 51px;
	padding: 0 0.7rem;
	padding-top: 13px;
	cursor: pointer;
	background-color: #ff4f0a;
	border: 1px solid rgba(228, 228, 228, 0.6);
	width: 200px;
	text-align: center;
	font-size: 32px;
	line-height: 75%;
`;

export const DownArrow = styled.img<Props>`
	transform: ${(props) => (props.showDropDown ? "rotate(180deg)" : {})};
	margin-bottom: 3px;
	width: 21px;
	height: 15px;
`;
