import React from 'react'

const useFetch = () => {
    const [data, setData] = React.useState(null);
    const [error, setError] = React.useState(null);
    const [loading, setLoading] = React.useState(false);

    const request = React.useCallback(async (url, options) => {
        let response;
        let json;

        try {

            setError(null);
            setLoading(true);

            response = await fetch(url, options);

            if (response.status !== 204) {
                json = await response.json();
            } else {
                json = null
            }

            if (response.ok == false) {
                let message = json.mensagem
                ? json.mensagem
                : json.message;

                if(json?.errors){
                    for(let prop in json.errors){
                        if(json.errors[prop].length > 0){
                            message += json.errors[prop] + ', ';
                        }
                    }
                    
                    message = message.trim()
                    message = message.substring(0, message.length - 1);
                }                
                
                throw new Error(message);
            }

        } catch (err) {

            json = null;
            console.log({message:err.message})
            setError(err.message);

        } finally {

            setData(json)
            setLoading(false)
        }

        return { response, json }

    }, [])

    React.useEffect(() => {
        if (error) {
            const timer = setTimeout(() => setError(null), 10000);
            return () => clearTimeout(timer);
        }
    }, [error]);
    
    return {
        data, error, loading,
        request, setError

    }
}


export default useFetch
