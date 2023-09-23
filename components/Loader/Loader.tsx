import Lottie from "react-lottie";
import loadingAnimation from "../../public/assets/JSON/loading.json";
import { LoaderContainer } from "./Loader.styles";
import { useWindowSize } from "../../types/constants";

export const Loader = () => {
	const size = useWindowSize();
	const lottieOptions = {
		loop: true,
		autoplay: true,
		animationData: loadingAnimation,
		rendererSettings: {
			preserveAspectRatio: "xMidYMid slice",
		},
	};

	return (
		<>
			{size.width <= 768 ? (
				<LoaderContainer>
					<Lottie options={lottieOptions} height={250} width={250} />
				</LoaderContainer>
			) : (
				<LoaderContainer>
					<Lottie options={lottieOptions} height={400} width={400} />
				</LoaderContainer>
			)}
		</>
	);
};
