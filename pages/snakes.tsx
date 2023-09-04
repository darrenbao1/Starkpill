import Gameboy from "../components/Gameboy";
import { signIn } from "next-auth/react";
import { TwitterSignIn } from "../components/TwitterSignIn";
export default function snakes() {
	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}>
			<Gameboy />
		</div>
	);
}
