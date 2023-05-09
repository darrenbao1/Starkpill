import { useState } from "react";
import { FAQ } from "../../../types/interfaces";
import {
	FaqItemContainer,
	FaqItemStyle,
	FaqItemButton,
	Divider,
	Answer,
	FaqSectionContainer,
} from "./FaqSection.styles";
import Cross from "../../../public/svgs/crossFAQ.svg";
import Plus from "../../../public/svgs/plus.svg";
import { FAQ_QUESTIONS } from "../../../types/constants";
export const FaqSection = () => {
	const FaqItem = (props: { faq: FAQ }) => {
		const [showAnswer, setShowAnswer] = useState(false);
		return (
			<FaqItemContainer>
				<FaqItemStyle
					showanswer={showAnswer}
					onClick={() => setShowAnswer(!showAnswer)}>
					<span>{props.faq.question}</span>
					<FaqItemButton>{showAnswer ? <Cross /> : <Plus />}</FaqItemButton>
				</FaqItemStyle>
				{showAnswer && (
					<>
						<Divider />
						<Answer>{props.faq.answer}</Answer>
					</>
				)}
			</FaqItemContainer>
		);
	};
	return (
		<FaqSectionContainer>
			<h1>Frequently Asked Questions</h1>
			<ul>
				{FAQ_QUESTIONS.map((faq, index) => (
					<FaqItem faq={faq} key={index} />
				))}
			</ul>
		</FaqSectionContainer>
	);
};
