import React from 'react';
import { useHistory, Route } from 'react-router';
import {UserContex} from '../../Context/UserContex.js';
import Login from '../User/Login.js'

const ProtectedRoute = (props)=>{
    const history = useHistory();
    const {isAuthenticated} = React.useContext(UserContex)
   
    if(isAuthenticated() === true){
        return <Route
            {...props}
        />
    }else if(isAuthenticated() === false){
       history.push('/usuario/login')
       return null;
    }else{
        history.push('/usuario/login')
        return null;
    }
}

export default ProtectedRoute;