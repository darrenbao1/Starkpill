import styles from "../styles/Gameboy.module.css";

export default function Gameboy() {
	return (
		<div className={styles.gameboy} id="GameBoy">
			<div className={styles["screen-area"]}>
				<div className={styles.power}>
					<div className={styles.indicator}>
						<div className={styles.led}></div>
						<span className={styles.arc} style={{ zIndex: 2 }}></span>
						<span className={styles.arc} style={{ zIndex: 1 }}></span>
						<span className={styles.arc} style={{ zIndex: 0 }}></span>
					</div>
					POWER
				</div>

				<canvas className={styles.display} id="mainCanvas">
					{/* TODO add SnakeGame component */}
					{/* <SnakeGame/> */}
				</canvas>
				<div className={styles.label}>
					<div className={styles.title}>Get Stark</div>
					<div className={styles.subtitle}>
						<span className={styles.c}>P</span>
						<span className={styles.o1}>I</span>
						<span className={styles.l}>L</span>
						<span className={styles.o2}>L</span>
						<span className={styles.r}>E</span>
						<span className={styles.r}>D</span>
					</div>
				</div>
			</div>

			<div className={styles.nintendo}>Seraph</div>

			<div className={styles.controls}>
				<div className={styles.dpad}>
					<div className={styles.up}>
						<i className="fa fa-caret-up"></i>
					</div>
					<div className={styles.right}>
						<i className="fa fa-caret-right"></i>
					</div>
					<div className={styles.down}>
						<i className="fa fa-caret-down"></i>
					</div>
					<div className={styles.left}>
						<i className="fa fa-caret-left"></i>
					</div>
					<div className={styles.middle}></div>
				</div>
				<div className={styles["a-b"]}>
					<div className={styles.b}>B</div>
					<div className={styles.a}>A</div>
				</div>
			</div>

			<div className={styles["start-select"]}>
				<div className={styles.select}>SELECT</div>
				<div className={styles.start}>START</div>
				{/* TODO add SnakeGame Start Button */}
			</div>

			<div className="speaker">
				<div className={styles["dot placeholder"]}></div>
				<div className={styles["dot open"]}></div>
				<div className={styles["dot closed"]}></div>
				<div className={styles["dot open"]}></div>
				<div className={styles["dot closed"]}></div>
				<div className={styles["dot open"]}></div>
				<div className={styles["dot closed"]}></div>
				<div className={styles["dot placeholder"]}></div>

				<div className={styles["dot open"]}></div>
				<div className={styles["dot closed"]}></div>
				<div className={styles["dot open"]}></div>
				<div className={styles["dot closed"]}></div>
				<div className={styles["dot open"]}></div>
				<div className={styles["dot closed"]}></div>
				<div className={styles["dot open"]}></div>
				<div className={styles["dot closed"]}></div>

				<div className={styles["dot closed"]}></div>
				<div className={styles["dot open"]}></div>
				<div className={styles["dot closed"]}></div>
				<div className={styles["dot open"]}></div>
				<div className={styles["dot closed"]}></div>
				<div className={styles["dot open"]}></div>
				<div className={styles["dot closed"]}></div>
				<div className={styles["dot open"]}></div>

				<div className={styles["dot open"]}></div>
				<div className={styles["dot closed"]}></div>
				<div className={styles["dot open"]}></div>
				<div className={styles["dot closed"]}></div>
				<div className={styles["dot open"]}></div>
				<div className={styles["dot closed"]}></div>
				<div className={styles["dot open"]}></div>
				<div className={styles["dot closed"]}></div>

				<div className={styles["dot closed"]}></div>
				<div className={styles["dot open"]}></div>
				<div className={styles["dot closed"]}></div>
				<div className={styles["dot open"]}></div>
				<div className={styles["dot closed"]}></div>
				<div className={styles["dot open"]}></div>
				<div className={styles["dot closed"]}></div>
				<div className={styles["dot open"]}></div>

				<div className={styles["dot open"]}></div>
				<div className={styles["dot closed"]}></div>
				<div className={styles["dot open"]}></div>
				<div className={styles["dot closed"]}></div>
				<div className={styles["dot open"]}></div>
				<div className={styles["dot closed"]}></div>
				<div className={styles["dot open"]}></div>
				<div className={styles["dot closed"]}></div>

				<div className={styles["dot closed"]}></div>
				<div className={styles["dot open"]}></div>
				<div className={styles["dot closed"]}></div>
				<div className={styles["dot open"]}></div>
				<div className={styles["dot closed"]}></div>
				<div className={styles["dot open"]}></div>
				<div className={styles["dot closed"]}></div>
				<div className={styles["dot open"]}></div>

				<div className={styles["dot placeholder"]}></div>
				<div className={styles["dot closed"]}></div>
				<div className={styles["dot open"]}></div>
				<div className={styles["dot closed"]}></div>
				<div className={styles["dot open"]}></div>
				<div className={styles["dot closed"]}></div>
				<div className={styles["dot open"]}></div>
				<div className={styles["dot placeholder"]}></div>
			</div>
		</div>
	);
}
