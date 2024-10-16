import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../store"

export type User = {
	id: string
	username: string
	email: string
	interests: string[]
	posts: string[]
	socials: {}
	dateCreated: null
}

interface UserState {
	user: User
	status: true | false
}

const initialState: UserState = {
	user: {
		id: "",
		username: "",
		email: "",
		interests: [],
		posts: [],
		socials: [],
		dateCreated: null,
	},
	status: false,
}

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<User>) => {
			state.user = action.payload
			state.status = true
		},
		resetUser: (state) => {
			state.user = initialState.user
			state.status = initialState.status
		},
	},
})

// Selector for the `user` object
export const selectUser = (state: RootState) => state.user.user
export const selectStatus = (state: RootState) => state.user.status

export const { setUser, resetUser } = userSlice.actions
export const userReducer = userSlice.reducer
