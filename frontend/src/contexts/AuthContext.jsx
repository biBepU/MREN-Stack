import { createContext, useEffect, useReducer } from "react";
import axios from 'axios';
const AuthContext = createContext();

const AuthReducer = (state,action)=>{
    switch (action.type){
        case 'LOG_IN' :
            localStorage.setItem('user',JSON.stringify(action.payload));
            return {user : action.payload};
        case 'LOG_OUT' :
            localStorage.removeItem('user');
            return {user : null};
        default:
            return state;
    }

}

    const AuthContextProvider = ({children})=>{
   let [state,dispatch] = useReducer(AuthReducer,{
    user :null
   });
   useEffect(()=>{
    try{
      axios.get('/api/users/me').then((res)=>{
        let user = res.data
          if(user){
              dispatch({type:"LOG_IN",payload:user})
          }else{
              dispatch({type:"LOG_OUT"})
          }
      })
    }catch(e){
        dispatch({type:"LOG_OUT"})
    }
   },[])
//    dispatch({type:"LOG_IN",payload : "HTETMYAT"})
    return(
        <AuthContext.Provider
        value={{...state,dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}



export {AuthContext,AuthContextProvider};