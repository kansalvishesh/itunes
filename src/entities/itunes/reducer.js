import * as actionTypes from "../actionTypes";

const INITIAL_STATE = {
    loading: false,
    error: false,
    data:[]

}

const reducer = (state = INITIAL_STATE, action) => {
  
    switch (action.type) {
        case actionTypes.SEARCH_INIT:
          return {...state,loading:true}
        case actionTypes.SEARCH_DONE:
          return { ...state, loading:false,data:action.payload}

        default:
          return state
      }
}

export default reducer