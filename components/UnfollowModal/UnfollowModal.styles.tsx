import styled from "styled-components";
export const ModalContainer = styled.div`
	position: fixed;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	background: rgba(38, 41, 44, 0.5);
	backdrop-filter: blur(10px);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 2;
	width: 100vw;
	height: 100vh;
`;
export const Container = styled.div`
	display: flex;
	width: 468px;
	padding: 40px 0px;
	flex-direction: column;
	align-items: center;
	background: #fff;
	border-radius: 8px;
`;

export const Title = styled.h1`
	color: #171717;
	text-align: center;
	font-family: Patrick Hand;
	font-size: 40px;
	font-style: normal;
	font-weight: 400;
	line-height: 110%;
	letter-spacing: -0.44px;
`;

export const Subtitle = styled.p`
	color: #171717;
	text-align: center;
	font-family: Patrick Hand;
	font-size: 22px;
	font-style: normal;
	font-weight: 400;
	line-height: 24px;
`;
export const ContentContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	h1 {
		color: #171717;
		text-align: center;
		font-family: Patrick Hand;
		font-size: 40px;
		font-style: normal;
		font-weight: 400;
		line-height: 0%;
		letter-spacing: -0.44px;
	}
	p {
		color: #171717;
		text-align: center;
		font-family: Patrick Hand;
		font-size: 22px;
		font-style: normal;
		font-weight: 400;
		line-height: 0px;
	}
`;
export const ButtonContainer = styled.div`
	display: flex;
	justify-content: space-between;
	flex-direction: row;
	gap: 70px;
	margin-top: 20px;
`;
export const CancelButton = styled.button`
	color: #ff4f0a;
	text-align: center;
	font-family: Patrick Hand;
	font-size: 24px;
	font-style: normal;
	font-weight: 400;
	background: none;
	border: none;
	cursor: pointer;

	text-decoration-line: underline;
`;
export const ConfirmButton = styled.button`
	cursor: pointer;
	display: flex;
	height: 40px;
	padding: 8px 16px;
	justify-content: center;
	align-items: center;
	color: #fff;
	text-align: center;
	font-family: Patrick Hand;
	font-size: 24px;
	font-style: normal;
	font-weight: 400;

	border-radius: 6px;
	border: 1px solid #fff;
	background: #ff4f0a;
	cursor: pointer;
`;
