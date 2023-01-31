import { createSlice } from "@reduxjs/toolkit";

interface RefetchState {
	value: number;
}
const initialState: RefetchState = {
	value: 0,
};

export const refetchSlice = createSlice({
	name: "refetch",
	initialState,
	reducers: {
		increment: (state) => {
			state.value += 1;
		},
	},
});

export const { increment } = refetchSlice.actions;
export default refetchSlice.reducer;
