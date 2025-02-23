import { ADD_ACTIVITY, GET_ACTIVITIES_FAILURE, GET_ACTIVITIES_LOADING } from "./constants";
import db from "@/lib/actions";
import { Activity } from "@/constants/interfaceList";
import { AppDispatch } from "@/store";


export const getActivitesLoading = ()=>(
    {type:GET_ACTIVITIES_LOADING}
)

export const getActivitiesFailure = (error:string) =>(
    {
        type:GET_ACTIVITIES_FAILURE,
        error
    }
)

export const getActivitiesSuccess = (payload:Array<Activity> | Activity | null) =>(
    {
        type:GET_ACTIVITIES_LOADING,
        payload
    }
)


export const addActivity = (payload:Activity)=>(
    {
        type:ADD_ACTIVITY,
        payload
    }
)
export const addActivityToDatabase = (activity:Activity) =>async (dispatch:AppDispatch) =>{
    try{

    }
    catch(error:any){}
}
export const getActivities = () => async (dispatch:AppDispatch) =>{
    try {
        const activities = await db.fetchActivities();
        
        dispatch(getActivitiesSuccess(activities));
      } catch (error:any) {
        console.error("Error fetching activities:", error);
        dispatch(getActivitiesFailure(error.message || "Something went wrong"));
      }
}