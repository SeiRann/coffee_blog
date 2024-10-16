import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { userReducer } from "./features/user/userSlice"

const rootReducer = combineReducers({
	user: userReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export const makeStore = () => {
	return configureStore({
		reducer: rootReducer,
	})
}

export type AppStore = ReturnType<typeof makeStore>
export type AppDispatch = AppStore["dispatch"]
