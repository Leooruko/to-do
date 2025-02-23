import { Activity } from "@/constants/interfaceList";

export const GET_ACTIVITIES_LOADING = "GET_ACTIVITES_LOADING";
export const GET_ACTIVITIES_SUCCESS = "GET_ACTIVITIES_SUCCESS";
export const GET_ACTIVITIES_FAILURE = "GET_ACTIVITIES_FAILURE";
export const REMOVE_ACTIVITY = "REMOVE_ACTIVITY";
export const ADD_ACTIVITY = "ADD_ACTIVITY";
export const UPDATE_ACTIVITY = "UPDATE_ACTIVITY";


export interface ActivityAction{
    type:string,
    payload:Array<Activity> | Activity | null,
    error:string | null
}