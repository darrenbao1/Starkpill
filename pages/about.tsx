import Head from "next/head";
import { AboutSection } from "../components/About/components/AboutSection";
import { FaqSection } from "../components/About/components/FaqSection";
export default function about() {
	return (
		<div className="pageContainer">
			<Head>
				<script
					dangerouslySetInnerHTML={{
						__html: `
            (function() {
              var script = document.createElement('script');
              script.src = 'https://chat.dante-ai.com/bubble-embed.js';
              script.async = true;
              document.body.appendChild(script);
            })();
          `,
					}}
				/>
				<script
					dangerouslySetInnerHTML={{
						__html: `
            window.danteEmbed = "https://chat.dante-ai.com/embed?kb_id=a9bcad50-3f83-439d-8208-9822d3e20d78&token=d89ae89a-b19f-40dc-9a8b-07e5bc963f96&modeltype=gpt-4&mode=undefined&bubble=true&image=null&bubbleopen=false";
          `,
					}}
				/>
			</Head>
			<AboutSection />
			<FaqSection />
		</div>
	);
}
