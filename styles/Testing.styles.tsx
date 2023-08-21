import styled from "styled-components";
import SubmitIcon from "../public/svgs/SubmitIcon.svg";
import SubmitGreen from "../public/svgs/SubmitButtonGreen.svg";
import UserIcon from "../public/svgs/UserIcon.svg";
import AiIcon from "../public/svgs/AiIcon.svg";
import Regen from "../public/svgs/regenIcon.svg";
export const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100vh;
	width: 100vw;
`;
export const HeaderContainer = styled.div`
	display: flex;
	justify-content: flex-start;

	height: 15vh;
	width: 100vw;
	background-color: #2b2b2b;
	font-size: 38px;
	letter-spacing: 0.379px;
	padding-left: 34px;
	padding-top: 32px;
`;
export const UpperContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	height: 70vh;
	width: 100vw;
	background-color: #2b2b2b;

	p {
		color: white;
		font-size: 20px;
		margin: 0;
		font-family: Poppins;
		font-style: normal;
		line-height: 150%;
		letter-spacing: 0.2px;
	}
`;
export const ExampleQuestion = styled.div`
	display: flex;
	padding: 16px 24px;
	justify-content: center;
	align-items: center;
	border-radius: 4px;
	background-color: #fff;
	width: 567px;
	height: 48px;
	color: #000;
	font-family: Poppins;
	font-size: 18px;
	line-height: 150%;
	letter-spacing: 0.18px;
	margin-top: 16px;
`;

export const ChatLog = styled.ul`
	list-style-type: none;
	background-color: none;
	width: 100%;
	padding: 0;
`;
export const ChatLogEntry = styled.li`
	display: flex;
	flex-direction: row;
	align-items: center;

	font-size: 20px;
	color: #323232;
	font-family: Poppins;

	background-color: white;

	padding: 32px 24px 32px 40px;
	width: 100%;
	gap: 20px;
`;
export const ChatLogEntryContainer = styled.div`
	display: flex;
	flex-direction: column;
`;
export const LowerContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 20vh;
	padding-bottom: 100px;

	width: 100vw;
	background-color: #2e2e2e;
`;

export const InputForm = styled.form`
	display: flex;
	border-radius: 8px;
	background-color: white;
	padding: 12px 16px;

	flex-direction: row;
	justify-content: space-between;
`;
export const Inputbox = styled.input`
	display: flex;
	flex-direction: row;
	align-items: center;
	width: 946px;
	height: 35px;
	border: none;
	font-size: 18px;

	&::placeholder {
		color: #a7a7a7;
	}
	&:focus {
		outline: none;
	}
`;
export const UserFace = styled(UserIcon)`
	height: 32px;
	width: 32px;
`;

export const SubmitButton = styled(SubmitIcon)`
	height: 32px;
	width: 32px;

	cursor: pointer;
`;

export const SubmitButtonGreen = styled(SubmitGreen)`
	height: 32px;
	width: 32px;

	cursor: pointer;
	&:hover {
		opacity: 0.8;
	}
`;

export const DummyAIAnswer = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	background-color: #f3f3f3;
	padding: 32px 24px 32px 40px;
	gap: 20px;

	height: fit-content;
	color: #000;
	font-family: Poppins;
	font-size: 20px;
`;

export const AIface = styled(AiIcon)`
	height: 32px;
	width: 32px;
`;

export const ChatStartedContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	height: 100%;
	width: 100%;
`;
export const RegenerateButton = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-end;
	background-color: #2a2a2a;
	border: 1px solid #fff;
	border-radius: 8px;
	padding: 12px 8px;
	color: #fff;
	font-family: Poppins;
	font-size: 16px;
	font-weight: 400;
	line-height: 150%;
	letter-spacing: 0.16px;
	gap: 4px;
	cursor: pointer;
	&:hover {
		opacity: 0.7;
	}
	margin-bottom: 24px;
`;

export const RegenIcon = styled(Regen)`
	width: 24px;
	height: 24px;
`;
