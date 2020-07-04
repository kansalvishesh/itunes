import * as actionTypes from "../actionTypes";
import axios from "axios";

export const saveSearch =  (name) => {
    console.log("Actions data",name)
    return async (dispatch) => {
        dispatch({
            type:actionTypes.SEARCH_INIT
        })
        try{
            const response = await axios.get(`https://itunes.apple.com/search?term=${name}`)
            console.log("My response",response.data.results)
            const searchData =  response.data.results;
            // searchData.map((myname,i)=>{
            //     console.log(myname.artistName)
            //     console.log("index",i)
            // })

            dispatch({
                type:actionTypes.SEARCH_DONE,
                payload:searchData
            })
        
        }catch(err){

        }
    }
}