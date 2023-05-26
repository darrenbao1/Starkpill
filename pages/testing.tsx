import { getRedemptionSignature } from "../types/utils";

export default function testing() {
	return (
		<div>
			<button
				onClick={() =>
					getRedemptionSignature(
						"0xf4a7c105cfdc6aabe9ae65bdf2d0df0a567a7ade",
						3
					)
				}>
				testing
			</button>
		</div>
	);
}
