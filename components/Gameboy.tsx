import { useEffect, useRef, useState } from "react";
import styles from "../styles/Gameboy.module.css";
import useInterval from "@use-it/interval";
type Apple = {
	x: number;
	y: number;
};

type Velocity = {
	dx: number;
	dy: number;
};

export default function Gameboy() {
	// Canvas Settings
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const [canvasWidth, setCanvasWidth] = useState(500);
	const [canvasHeight, setCanvasHeight] = useState(500);
	const [canvasGridSize, setCanvasGridSize] = useState(20);
	useEffect(() => {
		if (canvasRef.current) {
			const width = canvasRef.current?.width;
			const height = canvasRef.current?.height;
			//const minSize = Math.min(width, relativeHeight);
			const gridSize = Math.floor(width / 21);
			setCanvasWidth(gridSize * 21);
			setCanvasHeight(gridSize * 21);
			setCanvasGridSize(gridSize);
		}
	}, []);

	// Game Settings
	const minGameSpeed = 10;
	const maxGameSpeed = 15;

	// Game State
	const [gameDelay, setGameDelay] = useState<number>(1000 / minGameSpeed);
	const [countDown, setCountDown] = useState<number>(4);
	const [running, setRunning] = useState(false);
	const [isLost, setIsLost] = useState(false);
	const [highscore, setHighscore] = useState(0);
	const [newHighscore, setNewHighscore] = useState(false);
	const [score, setScore] = useState(0);
	const [snake, setSnake] = useState<{
		head: { x: number; y: number };
		trail: Array<any>;
	}>({
		head: { x: 11, y: 11 },
		trail: [],
	});
	const [apple, setApple] = useState<Apple>({ x: -1, y: -1 });
	const [velocity, setVelocity] = useState<Velocity>({ dx: 0, dy: 0 });
	const [previousVelocity, setPreviousVelocity] = useState<Velocity>({
		dx: 0,
		dy: 0,
	});

	const clearCanvas = (ctx: CanvasRenderingContext2D) =>
		ctx.clearRect(-1, -1, canvasWidth + 2, canvasHeight + 2);

	const generateApplePosition = (): Apple => {
		const x = Math.floor(Math.random() * (canvasWidth / canvasGridSize));
		const y = Math.floor(Math.random() * (canvasHeight / canvasGridSize));
		// Check if random position interferes with snake head or trail
		if (
			(snake.head.x === x && snake.head.y === y) ||
			snake.trail.some((snakePart) => snakePart.x === x && snakePart.y === y)
		) {
			return generateApplePosition();
		}
		return { x, y };
	};

	// Initialise state and start countdown
	const startGame = () => {
		setGameDelay(1000 / minGameSpeed);
		setIsLost(false);
		setScore(0);
		setSnake({
			head: { x: 11, y: 10 },
			trail: [],
		});
		setApple(generateApplePosition());
		setVelocity({ dx: 0, dy: -1 });
		setRunning(true);
		setNewHighscore(false);
		setCountDown(3);
	};

	// Reset state and check for highscore
	const gameOver = () => {
		if (score > highscore) {
			setHighscore(score);
			localStorage.setItem("highscore", score.toString());
			setNewHighscore(true);
		}
		setIsLost(true);
		setRunning(false);
		setVelocity({ dx: 0, dy: 0 });
		setCountDown(4);
	};

	const fillRect = (
		ctx: CanvasRenderingContext2D,
		x: number,
		y: number,
		w: number,
		h: number
	) => {
		ctx.fillRect(x, y, w, h);
	};

	const strokeRect = (
		ctx: CanvasRenderingContext2D,
		x: number,
		y: number,
		w: number,
		h: number
	) => {
		ctx.strokeRect(x + 0.5, y + 0.5, w, h);
	};

	const drawSnake = (ctx: CanvasRenderingContext2D) => {
		ctx.fillStyle = "#0F380F";
		ctx.strokeStyle = "#306230";

		fillRect(
			ctx,
			snake.head.x * canvasGridSize,
			snake.head.y * canvasGridSize,
			canvasGridSize,
			canvasGridSize
		);

		strokeRect(
			ctx,
			snake.head.x * canvasGridSize,
			snake.head.y * canvasGridSize,
			canvasGridSize,
			canvasGridSize
		);

		snake.trail.forEach((snakePart) => {
			fillRect(
				ctx,
				snakePart.x * canvasGridSize,
				snakePart.y * canvasGridSize,
				canvasGridSize,
				canvasGridSize
			);

			strokeRect(
				ctx,
				snakePart.x * canvasGridSize,
				snakePart.y * canvasGridSize,
				canvasGridSize,
				canvasGridSize
			);
		});
	};

	const drawApple = (ctx: CanvasRenderingContext2D) => {
		ctx.fillStyle = "#DC3030"; // '#38C172' // '#F4CA64'
		ctx.strokeStyle = "#881A1B"; // '#187741' // '#8C6D1F

		if (
			apple &&
			typeof apple.x !== "undefined" &&
			typeof apple.y !== "undefined"
		) {
			fillRect(
				ctx,
				apple.x * canvasGridSize,
				apple.y * canvasGridSize,
				canvasGridSize,
				canvasGridSize
			);

			strokeRect(
				ctx,
				apple.x * canvasGridSize,
				apple.y * canvasGridSize,
				canvasGridSize,
				canvasGridSize
			);
		}
	};

	// Update snake.head, snake.trail and apple positions. Check for collisions.
	const updateSnake = () => {
		// Check for collision with walls
		const nextHeadPosition = {
			x: snake.head.x + velocity.dx,
			y: snake.head.y + velocity.dy,
		};
		if (
			nextHeadPosition.x < 0 ||
			nextHeadPosition.y < 0 ||
			nextHeadPosition.x >= canvasWidth / canvasGridSize ||
			nextHeadPosition.y >= canvasHeight / canvasGridSize
		) {
			gameOver();
		}

		// Check for collision with apple
		if (nextHeadPosition.x === apple.x && nextHeadPosition.y === apple.y) {
			setScore((prevScore) => prevScore + 1);
			setApple(generateApplePosition());
		}

		const updatedSnakeTrail = [...snake.trail, { ...snake.head }];
		// Remove trail history beyond snake trail length (score + 2)
		while (updatedSnakeTrail.length > score + 2) updatedSnakeTrail.shift();
		// Check for snake colliding with itsself
		if (
			updatedSnakeTrail.some(
				(snakePart) =>
					snakePart.x === nextHeadPosition.x &&
					snakePart.y === nextHeadPosition.y
			)
		)
			gameOver();

		// Update state
		setPreviousVelocity({ ...velocity });
		setSnake({
			head: { ...nextHeadPosition },
			trail: [...updatedSnakeTrail],
		});
	};

	// Game Hook
	useEffect(() => {
		const canvas = canvasRef?.current;
		const ctx = canvas?.getContext("2d");

		if (ctx && !isLost) {
			clearCanvas(ctx);
			drawApple(ctx);
			drawSnake(ctx);
		}
	}, [snake]);

	// Game Update Interval
	useInterval(
		() => {
			if (!isLost) {
				updateSnake();
			}
		},
		running && countDown === 0 ? gameDelay : null
	);

	// Countdown Interval
	useInterval(
		() => {
			setCountDown((prevCountDown) => prevCountDown - 1);
		},
		countDown > 0 && countDown < 4 ? 800 : null
	);

	// DidMount Hook for Highscore
	useEffect(() => {
		setHighscore(
			localStorage.getItem("highscore")
				? parseInt(localStorage.getItem("highscore")!)
				: 0
		);
	}, []);

	// Score Hook: increase game speed starting at 16
	useEffect(() => {
		if (score > minGameSpeed && score <= maxGameSpeed) {
			setGameDelay(1000 / score);
		}
	}, [score]);

	// Event Listener: Key Presses
	const handleArrowUpClick = () => {
		const event = new KeyboardEvent("keydown", { key: "ArrowUp" });
		document.dispatchEvent(event);
	};
	const handleArrowDownClick = () => {
		const event = new KeyboardEvent("keydown", { key: "ArrowDown" });
		document.dispatchEvent(event);
	};
	const handleArrowLeftClick = () => {
		const event = new KeyboardEvent("keydown", { key: "ArrowLeft" });
		document.dispatchEvent(event);
	};
	const handleArrowRightClick = () => {
		const event = new KeyboardEvent("keydown", { key: "ArrowRight" });
		document.dispatchEvent(event);
	};

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (
				[
					"ArrowUp",
					"ArrowDown",
					"ArrowLeft",
					"ArrowRight",
					"w",
					"a",
					"s",
					"d",
				].includes(e.key)
			) {
				let velocity = { dx: 0, dy: 0 };

				switch (e.key) {
					case "ArrowRight":
						velocity = { dx: 1, dy: 0 };
						break;
					case "ArrowLeft":
						velocity = { dx: -1, dy: 0 };
						break;
					case "ArrowDown":
						velocity = { dx: 0, dy: 1 };
						break;
					case "ArrowUp":
						velocity = { dx: 0, dy: -1 };
						break;
					case "d":
						velocity = { dx: 1, dy: 0 };
						break;
					case "a":
						velocity = { dx: -1, dy: 0 };
						break;
					case "s":
						velocity = { dx: 0, dy: 1 };
						break;
					case "w":
						velocity = { dx: 0, dy: -1 };
						break;
					default:
						console.error("Error with handleKeyDown");
				}
				if (
					!(
						previousVelocity.dx + velocity.dx === 0 &&
						previousVelocity.dy + velocity.dy === 0
					)
				) {
					setVelocity(velocity);
				}
			}
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [previousVelocity]);

	return (
		<div className={styles.gameboy}>
			<div className={styles["screen-area"]}>
				<canvas
					className={styles.display}
					ref={canvasRef}
					width={canvasWidth}
					height={canvasHeight}></canvas>
				{isLost && (
					<div className={styles.gameOverlay}>
						{newHighscore && (
							<>
								<span className={styles.finalScore}>
									New Highscore
									<br />
									<br />
									{score}
									<br />
									<br />
									Press A
									<br />
									To Record
								</span>
							</>
						)}
						{!newHighscore && (
							<span className={styles.finalScore}>Game Over</span>
						)}

						{!running && !isLost && (
							<p>{countDown === 4 ? "Restart Game" : countDown}</p>
						)}
					</div>
				)}
				{!running && !isLost && (
					<div className={styles.gameOverlay}>
						<>
							<span className={styles.finalScore}>Press Start</span>
						</>
					</div>
				)}
				{running && countDown > 0 && (
					<div className={styles.gameOverlay}>
						<>
							<span className={styles.finalScore}>{countDown}</span>
						</>
					</div>
				)}
			</div>

			<div className={styles.nintendo}>Seraph</div>

			<div className={styles.controls}>
				<div className={styles.dpad}>
					<div className={styles.up} onClick={handleArrowUpClick}>
						<i className="fa fa-caret-up"></i>
					</div>
					<div className={styles.right} onClick={handleArrowRightClick}>
						<i className="fa fa-caret-right"></i>
					</div>
					<div className={styles.down} onClick={handleArrowDownClick}>
						<i className="fa fa-caret-down"></i>
					</div>
					<div className={styles.left} onClick={handleArrowLeftClick}>
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
				<div className={styles.select}>CLOSE</div>
				<div className={styles.start} onClick={startGame}>
					START
				</div>
			</div>
		</div>
	);
}
