import styled from "styled-components";
import Href from "../../public/hrefIcon.svg";
import Copy from "../../public/svgs/CopyIcon.svg";
import Link from "next/link";
export const Container = styled.div`
	width: 100%;
	margin-left: 0.5rem;
	padding-right: 1rem;
	padding-bottom: 1rem;
	h1 {
		margin-bottom: 0.5rem;
		font-size: 20px;
		margin-left: 17px;
	}

	h2 {
		font-size: 20px;
		margin-left: 17px;
		margin-bottom: -20px;
	}
	span {
		display: flex;
		color: #acacac;
		font-size: 20px;
		border: 1px solid #e0e0e0;
		border-radius: 6px;
		font-size: 18px;
		padding-left: 18px;
		padding-top: 8px;
		padding-bottom: 8px;
		margin-right: 17px;
		margin-left: 1rem;
	}
`;
export const StatusContainer = styled.div<{ color: string }>`
	display: flex;
	flex-direction: row;
	margin-top: 0px;
	margin-bottom: 4px;
	margin-right: 20px;
	align-items: center;
	text {
		margin-left: 5px;
		align-self: center;
		color: ${(props) => props.color};
	}
`;
export const Dot = styled.div<{ color: string }>`
	height: 8px;
	width: 8px;
	border-radius: 50%;
	background-color: ${(props) => props.color};

	margin-left: auto;
`;

export const TransactionItems = styled.div`
	display: flex;
	border-radius: 6px;
	border: 1px solid #e0e0e0;
	padding: 10px 12px 10px 0px;
	margin-left: 17px;
	margin-right: 17px;
	margin-bottom: 10px;
`;

export const IconContainer = styled.picture`
	margin-left: 0px;
	margin-right: 0px;
`;
export const CopyIcon = styled(Copy)`
	margin-left: 10px;
	align-self: center;
	&:hover {
		cursor: pointer;
	}
`;

export const HrefStyled = styled(Href)`
	color: #ffffff;
	margin-top: 6px;
`;

export const TxAddress = styled.div`
	margin-right: auto;
	margin-left: 14px;
	font-size: 18px;
`;
