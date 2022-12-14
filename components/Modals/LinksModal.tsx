import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../../styles/LinksModal.module.css";
import { PAGES } from "../../types/constants";
import { ConnectWalletButton } from "../ConnectWalletButton";
export const LinksModal = (props: { close: any }) => {
	const router = useRouter();
	return (
		<div className={styles.modalContainer} style={{ zIndex: 1 }}>
			<ul className={styles.modalItems}>
				{PAGES.map(
					(page, index) =>
						page.isActive && (
							<li key={index}>
								<Link
									className={
										router.pathname == page.link
											? styles.navbar_link_active
											: styles.navbar_link
									}
									href={page.link}
									onClick={props.close}
								>
									{page.title}
								</Link>
							</li>
						)
				)}
				<li style={{ width: "120px" }}>
					<ConnectWalletButton />
				</li>
			</ul>
		</div>
	);
};
