import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../../styles/LinksModal.module.css";
import { PAGES, USERPAGES } from "../../types/constants";
import { useAccount } from "@starknet-react/core";
export const LinksModal = (props: { close: any }) => {
	const router = useRouter();
	const { address } = useAccount();
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
				{address &&
					USERPAGES.map(
						(page, index) =>
							page.isActive && (
								<li key={index}>
									<Link
										className={
											router.pathname == page.link
												? styles.navbar_link_active
												: styles.navbar_link
										}
										href={
											page.paramName
												? page.link + page.paramName + address
												: page.link
										}
										onClick={props.close}
									>
										{page.title}
									</Link>
								</li>
							)
					)}
			</ul>
		</div>
	);
};
