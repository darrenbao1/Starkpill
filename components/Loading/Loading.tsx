import { LoadingContainer } from "./Loading.styles";
import Lottie from "react-lottie";
import loadingAnimation from "../../public/assets/JSON/loading.json";
export default function Loading() {
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
			<Lottie options={lottieOptions} height={400} width={400} />
		</>
	);
}
