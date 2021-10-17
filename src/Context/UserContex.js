import React from 'react';
import {TOKEN_POST} from '../api/endpoints/geral.js';
import {useHistory} from 'react-router-dom'
import {login, logout, getToken, isAuthenticated, sandBox} from '../api/Auth/index.js'
import useFetch from '../Hooks/useFetch.js';

export const UserContex = React.createContext();

export const UserStorange = ({children})=>{

    const [loginUser, setLoginUser] = React.useState(null)

    const historyUser = useHistory();
    const {request, loading, data, error} = useFetch();

    const userLogout = ()=>{
        
      
        try{

            logout();
            historyUser.push('/login');

        }catch(error){
            console.log(error)
        }

    }

    const getUser = async ()=>{
       
        try{

            console.log(getToken())
            setLoginUser(isAuthenticated)

        }catch(error){
            console.log(error)
        }
    }

    const userLogin = async (username, password)=>{
        try{
            const token = 'asdf123';
            if(sandBox === false){
                const {body} = TOKEN_POST({username, password});        
                const {token} = await request(body);
            }
            login(token)
            await getUser();

            historyUser.push('/home/painel');

        }catch(error){
            console.log(error)
        }
    }

    return(
        <UserContex.Provider value={{userLogin, getUser,userLogout, isAuthenticated, sandBox,loginUser, setLoginUser, loading, data, error}} >
            {children}
        </UserContex.Provider>
    )
}
