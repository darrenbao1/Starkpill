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
      <div
        className={`${styles.questionContainer} ${!showAnswer ? "active" : ""}`}
      >
        <div
          className={`${styles.question}`}
          onClick={() => {
            setShowAnswer(!showAnswer);
          }}
        >
          {props.faq.question}
          <div className={styles.button}>
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
        <h1 style={{ color: "#FF4F0A", fontSize: 40 }}>
          frequently asked questions
        </h1>
        <ul>
          {FAQ_QUESTIONS.map((faq, index) => (
            <FaqItem faq={faq} key={index} />
          ))}
        </ul>
      </div>
    </div>
  );
}
