import { configureStore } from "@reduxjs/toolkit";
import {
	useSelector as rawUseSelector,
	TypedUseSelectorHook,
} from "react-redux";
import refetchReducer from "./refetch";
export const store = configureStore({
	reducer: {
		// Add your reducers here
		refetch: refetchReducer,
	},
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector;
