export default function testing() {
	return (
		<div>
			<button
				onClick={() => console.log(process.env.SECRET_KEY, "secretkey bro")}>
				testing
			</button>
		</div>
	);
}
