import styles from "../Toasts/Toast.module.css";
import React, {
	createContext,
	useContext,
	useState,
	ReactNode,
	FC,
	useEffect,
} from "react";
import Completed from "../../public/svgs/Completed.svg";
import Failed from "../../public/svgs/Failed.svg";
import Cross from "../../public/svgs/cross3.svg";
interface ToastMessage {
	id: number;
	message: string;
}

interface ToastContextProps {
	showToast: (msg: string) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const useToast = () => {
	const context = useContext(ToastContext);
	if (!context) {
		throw new Error("useToast must be used within a ToastProvider");
	}
	return context;
};

interface ToastProviderProps {
	children: ReactNode;
}

export const ToastProvider: FC<ToastProviderProps> = ({ children }) => {
	const [toasts, setToasts] = useState<ToastMessage[]>([]);

	const showToast = (message: string) => {
		const id = Date.now(); // or any other method to generate a unique id
		setToasts((prevToasts) => [...prevToasts, { id, message }]);
	};

	const removeToast = (id: number) => {
		setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
	};

	useEffect(() => {
		if (toasts.length > 0) {
			const timer = setTimeout(() => {
				setToasts((prevToasts) => prevToasts.slice(1));
			}, 3000);
			return () => clearTimeout(timer);
		}
	}, [toasts]);

	return (
		<ToastContext.Provider value={{ showToast }}>
			{children}
			<div className={styles.notificationContainer}>
				{toasts.map((toast) => (
					<div
						key={toast.id}
						className={styles.toast}
						style={
							toast.message === "Success"
								? { background: "#EFFFFB" }
								: { background: "#FFEFEF" }
						}>
						<div className={styles.image}>
							{toast.message === "Success" ? <Completed /> : <Failed />}
						</div>
						<div className={styles.title}>
							<div>{toast.message}</div>
						</div>
						<button onClick={() => removeToast(toast.id)}>
							{" "}
							{/* Adjusted this line */}
							<Cross />
						</button>
					</div>
				))}
			</div>
		</ToastContext.Provider>
	);
};
