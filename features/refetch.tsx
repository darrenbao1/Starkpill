import { createSlice } from "@reduxjs/toolkit";

interface RefetchState {
	value: number;
	imageModalShown: boolean;
	editPillModalShown: boolean;
}
const initialState: RefetchState = {
	value: 0,
	imageModalShown: false,
	editPillModalShown: false,
};

export const refetchSlice = createSlice({
	name: "refetch",
	initialState,
	reducers: {
		increment: (state) => {
			state.value += 1;
		},
		showImageModalRedux: (state, action) => {
			state.imageModalShown = action.payload;
		},
		showEditPillModalRedux: (state, action) => {
			state.editPillModalShown = action.payload;
		},
	},
});

export const { increment, showImageModalRedux, showEditPillModalRedux } =
	refetchSlice.actions;
export default refetchSlice.reducer;
