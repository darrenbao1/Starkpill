import React, {
	createContext,
	useContext,
	useState,
	ReactNode,
	useCallback,
} from "react";

interface LoaderContextType {
	showLoader: () => void;
	hideLoader: () => void;
	isLoading: boolean;
}

const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

export const useLoader = (): LoaderContextType => {
	const context = useContext(LoaderContext);
	if (!context) {
		throw new Error("useLoader must be used within a LoaderProvider");
	}
	return context;
};

interface LoaderProviderProps {
	children: ReactNode;
}

export const LoaderProvider: React.FC<LoaderProviderProps> = ({ children }) => {
	const [isLoading, setIsLoading] = useState(false);

	// Memoize the showLoader and hideLoader functions
	const showLoader = useCallback(() => {
		setIsLoading(true);
	}, []);

	const hideLoader = useCallback(() => {
		setIsLoading(false);
	}, []);

	return (
		<LoaderContext.Provider value={{ showLoader, hideLoader, isLoading }}>
			{children}
		</LoaderContext.Provider>
	);
};
