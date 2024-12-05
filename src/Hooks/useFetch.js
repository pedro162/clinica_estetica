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
                json = {}
            }

            if (response.ok == false) {

                throw new Error(json.mensagem);
            }

        } catch (err) {

            json = null;
            setError(err.message);

        } finally {

            setData(json)
            setLoading(false)
        }

        return { response, json }

    }, [])

    return {
        data, error, loading,
        request, setError

    }
}


export default useFetch
