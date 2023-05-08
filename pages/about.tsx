import { AboutSection } from "../components/About/components/AboutSection";
import { FaqSection } from "../components/About/components/FaqSection";
export default function about() {
	return (
		<div className="pageContainer">
			<AboutSection />
			<FaqSection />
		</div>
	);
}
