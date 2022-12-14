import styles from "../styles/faq.module.css";
import Cross from "../public/svgs/cross2.svg";
import Plus from "../public/svgs/plus.svg";
import { FAQ_QUESTIONS } from "../types/constants";
import { FAQ } from "../types/interfaces";
import { useState } from "react";
export default function faq() {
	const FaqItem = (props: { faq: FAQ }) => {
		const [showAnswer, setShowAnswer] = useState(false);
		return (
			<div className={styles.questionContainer}>
				<div className={styles.question}>
					{props.faq.question}
					<div
						className={styles.button}
						onClick={() => setShowAnswer(!showAnswer)}
					>
						{showAnswer ? <Cross /> : <Plus />}
					</div>
				</div>
				{showAnswer && (
					<>
						<div className={styles.divider}></div>
						<div className={styles.answer}>{props.faq.answer}</div>
					</>
				)}
			</div>
		);
	};

	return (
		<div
			className="container"
			style={{ background: "white", color: "#000000" }}
		>
			<div className={styles.container}>
				<h1>frequently asked questions</h1>
				<ul>
					{FAQ_QUESTIONS.map((faq, index) => (
						<FaqItem faq={faq} key={index} />
					))}
				</ul>
			</div>
		</div>
	);
}
