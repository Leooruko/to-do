import { combineReducers } from "@reduxjs/toolkit";
import { ActivitiesReducer } from "./common/activities/reducer";

const rootReducer = combineReducers({
    activities:ActivitiesReducer
})

export default rootReducer;