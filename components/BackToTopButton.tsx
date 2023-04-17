import { useState } from "react";
import BackToTopIcon from "../public/svgs/backToTop.svg";

type ScrollTopFunction = () => void;
export const BackToTopButton = (props: {
	scrollTopFunc: ScrollTopFunction;
}) => {
	return (
		<div onClick={props.scrollTopFunc} className="backToTopButton">
			<BackToTopIcon />
		</div>
	);
};
