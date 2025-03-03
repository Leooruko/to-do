
import { Activity } from "@/constants/interfaceList";
import { ADD_ACTIVITY, GET_ACTIVITIES_FAILURE, GET_ACTIVITIES_LOADING, GET_ACTIVITIES_SUCCESS, REMOVE_ACTIVITY, UPDATE_ACTIVITY} from "./constants";
import { ActivityAction } from "./constants";

const initialState = {
    loading:false,
    activities:[],
    error:null,
}



export function ActivitiesReducer (state = initialState ,action:ActivityAction){
    const {type,payload,error} = action;

    switch(type){
        case GET_ACTIVITIES_LOADING:
            return {...state,loading:true}
        case GET_ACTIVITIES_SUCCESS:
            return {...state,activities: Array.isArray(payload) && [...payload],loading:false}
        case GET_ACTIVITIES_FAILURE:
            return {...state,loading:false,error:error}
        case ADD_ACTIVITY:
            return {...state,activities:[...state.activities,payload]}
        case REMOVE_ACTIVITY:
            return{...state,activities:[...state.activities.filter((activity)=>activity !== payload)]}
        case UPDATE_ACTIVITY:
            return{...state,activities:[...state.activities.map((activity:Activity)=>{
                if(payload && !Array.isArray(payload) && activity.id === payload.id){
                    console.log(payload)
                    return {...activity,...payload}
                }
                else{
                    console.log("GONE")
                    return activity
                }
            })]}            
        default:
            return state;
    }
}
