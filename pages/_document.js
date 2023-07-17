import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
	render() {
		return (
			<Html>
				<Head>
					<script
						async
						dangerouslySetInnerHTML={{
							__html: `
                window.danteEmbed = "https://chat.dante-ai.com/embed?kb_id=a9bcad50-3f83-439d-8208-9822d3e20d78&token=0ed90700-ef6e-4cce-bbfd-f9db0fb02adc&modeltype=gpt-4&mode=undefined&bubble=true&image=null&bubbleopen=false";
              `,
						}}
					/>
					<script
						async
						src="https://chat.dante-ai.com/bubble-embed.js"
						onLoad={() => {
							// Additional code to execute after script is loaded (if needed)
						}}
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
