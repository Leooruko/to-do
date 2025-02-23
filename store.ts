import { configureStore } from "@reduxjs/toolkit";
import { ActivitiesReducer } from "./common/activities/reducer";
import rootReducer from "./reducers";

export const store = configureStore({
    reducer:rootReducer
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;