import Link from "next/link";
import styles from "../styles/Navbar.module.css"
import { Constants } from "../types/constants";
import { ConnectWalletButton } from "./ConnectWalletButton";
export const Navbar = () => {
    return ( 
        <div className={styles.navbar}>
            <div className={styles.logo}>getStarkpilled</div>
            <div className={styles.links}>
            {Constants.ACTIVE_PAGES.map((page,index) => (
                page.isActive &&  <Link className={styles.link} href={page.link} key={index}>{page.title}</Link>
            ))}
            </div>
            <div className={styles.buttonContainer}>
             <ConnectWalletButton/>
            </div>
        </div>
    )
}