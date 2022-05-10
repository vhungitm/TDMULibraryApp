import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
	name: 'user',
	initialState: {},
	reducers: {
		setUser: (state, action) => {
			return action.payload;
		},
		removeUser: state => {
			state = {};
		}
	}
});

const { reducer, actions } = userSlice;
export const { setUser, removeUser } = actions;
export default reducer;
