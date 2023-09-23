// import { useState } from "react";
// import {
// 	AIface,
// 	ChatLog,
// 	ChatLogEntry,
// 	ChatLogEntryContainer,
// 	ChatStartedContainer,
// 	Container,
// 	DummyAIAnswer,
// 	ExampleQuestion,
// 	HeaderContainer,
// 	InputForm,
// 	Inputbox,
// 	LowerContainer,
// 	RegenIcon,
// 	RegenerateButton,
// 	SubmitButton,
// 	SubmitButtonGreen,
// 	UpperContainer,
// 	UserFace,
// } from "../styles/Testing.styles";

import { Loader } from "../components/Loader/Loader";
import { CommentsModal } from "../components/Modals/CommentsModal";

// type ChatLogEntry = {
// 	user: string;
// 	text: string;
// };

// type ChatBoxProps = {
// 	aiPrompter: (input: string) => string;
// };

// const ChatBox = ({ aiPrompter }: ChatBoxProps) => {
// 	const [inputValue, setInputValue] = useState("");
// 	const [chatLog, setChatLog] = useState<ChatLogEntry[]>([]);
// 	const [chatStarted, setChatStarted] = useState(false);
// 	const [isInputFilled, setIsInputFilled] = useState(false);

// 	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
// 		setInputValue(event.target.value);
// 		setIsInputFilled(event.target.value.length > 0);
// 	};

// 	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
// 		event.preventDefault();

// 		setChatLog((oldChatLog) => [
// 			...oldChatLog,
// 			{ user: "user", text: inputValue },
// 		]);
// 		setInputValue("");
// 		setChatStarted(true);
// 		setIsInputFilled(false);
// 	};

// 	return (
// 		<Container>
// 			<HeaderContainer>Starkpill's prompter</HeaderContainer>
// 			<UpperContainer>
// 				{!chatStarted ? (
// 					<>
// 						<p>Start chatting!</p>
// 						<p>Here are some of the examples of how you can chat with me</p>
// 						<ExampleQuestion>
// 							"Give me all the transactions from 2 hours ago"
// 						</ExampleQuestion>
// 						<ExampleQuestion>
// 							"Give me all the wallet addresses that have more than 10
// 							Starkpills"
// 						</ExampleQuestion>
// 						<ExampleQuestion>
// 							"How many Starkpills have been minted in the last 24 hours?"
// 						</ExampleQuestion>
// 					</>
// 				) : (
// 					<ChatStartedContainer>
// 						<ChatLog>
// 							{chatLog.map((entry, index) => (
// 								<ChatLogEntryContainer>
// 									<ChatLogEntry key={index}>
// 										<UserFace /> {` ${entry.text}`}
// 									</ChatLogEntry>
// 									<DummyAIAnswer>
// 										<AIface />
// 										Here are the transactions from 2 hours ago: 1. 0x01...234 2.
// 										0x01...234 3. 0x01...234 Feel free to ask anything else or
// 										provide more examples if you need further assistance!
// 									</DummyAIAnswer>
// 								</ChatLogEntryContainer>
// 							))}
// 						</ChatLog>

// 						<RegenerateButton>
// 							<RegenIcon /> Regenerate response
// 						</RegenerateButton>
// 					</ChatStartedContainer>
// 				)}
// 			</UpperContainer>
// 			<LowerContainer>
// 				<InputForm onSubmit={handleSubmit}>
// 					<Inputbox
// 						type="text"
// 						value={inputValue}
// 						onChange={handleInputChange}
// 						placeholder="Send a message"
// 					/>
// 					{isInputFilled ? (
// 						<SubmitButtonGreen onClick={handleSubmit} />
// 					) : (
// 						<SubmitButton />
// 					)}
// 				</InputForm>
// 			</LowerContainer>
// 		</Container>
// 	);
// };

// export default ChatBox;

export default function Testing() {
	return <></>;
}
