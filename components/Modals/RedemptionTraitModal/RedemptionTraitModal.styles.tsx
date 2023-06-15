import styled from "styled-components";
import Image from "next/image";
export const ModalContainer = styled.div`
	position: fixed;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	background: rgba(0, 0, 0, 0.55);
	backdrop-filter: blur(10px);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 2;
	width: 100vw;
	height: 100vh;
`;

export const TraitModal = styled.div`
	position: absolute;
	align-self: center;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	background-color: #ffffff;
	z-index: 1;
	width: 100%;
	max-width: 22.188rem;
	height: fit-content;
	max-height: 31.688rem;
	display: flex;
	flex-direction: column;
	color: white;
	border-radius: 12px;
	padding-left: 16px;
	padding-right: 16px;
	padding-top: 16px;
`;

export const TopContainer = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: row;
`;

export const ModalHeader = styled.div`
	display: flex;
	position: relative;
	margin-top: 0.65rem;
	width: 100%;
	color: #ff4f0a;
	align-items: center;
	height: fit-content;
	justify-content: center;

	margin-bottom: 0.4rem;

	max-width: 14.688re;
`;

export const HeaderText = styled.h1`
	align-self: center;
	color: #ff4f0a;
	font-size: 2rem;
	line-height: 34.32px;

	margin: 0;
`;
//keep CrossImage at fixed position relative to parent
export const CrossImage = styled(Image)`
	position: fixed;
	width: 31px;
	height: 31px;
	right: 0;
	margin-right: 16px;
	cursor: pointer;
`;

export const RedeemButton = styled.div`
	position: relative;
	margin-top: 1.313rem;
	margin-bottom: 1.5rem;
	background-color: #ff4f0a;
	width: 20.188rem;
	padding-top: 8px;
	padding-bottom: 8px;
	height: 2.563rem;
	font-size: 24px;
	border-radius: 3px;
	display: flex;
	justify-content: center;
	align-items: center;

	&:hover {
		cursor: pointer;
	}
`;

export const RedeemTraitCard = styled.div`
	border: 2px solid ${(props) => props.theme.primaryColor};
	border-radius: 6px;
	width: 154px;
`;
export const RedeemTraitImage = styled(Image)`
	width: 123px;
	height: 123px;
	margin: 16px;
`;
export const RedeemTraitItemName = styled.div`
	border-top: 1px solid #dadada;
	padding: 4px 16px;
	width: 100%;
	font-family: "Patrick Hand";
	font-style: normal;
	font-weight: 400;
	font-size: 20px;
	line-height: 34px;
	color: ${(props) => props.theme.primaryColor};
`;
export const CardContainer = styled.div`
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: row;
	gap: 12px;
	margin-top: 1.313rem;
`;
