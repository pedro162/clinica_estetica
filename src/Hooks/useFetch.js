import React from 'react'
import {api} from '../api/baseApi.js'
//const cors = require('cors');

const useFetch = () => {
    const [data, setData] = React.useState(null);
    const [error, setError] = React.useState(null);
    const [loading, setLoading] = React.useState(false);

    const request = React.useCallback(async (body)=>{
        let response;
        let json;

        try{

            setError(null);
            setLoading(true);
            response = await api(body);
            json = await response.data.json();
            
        }catch(err){
            
            json = null;
            setError(err.message);

        }finally{

            setData(json)
            setLoading(false)
        }

        return {response, json}

    }, [])

    return {
        data,error,loading,
        request

    }
}


export default useFetch
