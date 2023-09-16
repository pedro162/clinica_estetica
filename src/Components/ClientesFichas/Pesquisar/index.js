import React from 'react';
import useFetch from '../../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, CONSULTA_ONE_GET} from '../../../api/endpoints/geral.js'
import {UserContex} from '../../../Context/UserContex.js'

const Pesquisar = ({idClientesFichas, setDataClientesFichas, setCarregandoDadosClientesFichas})=>{
	const {getToken, dataUser} = React.useContext(UserContex);

	const {data, error, request, loading} = useFetch();
	setCarregandoDadosClientesFichas(loading)
	React.useEffect(()=>{
		
		const getClientesFichas = async ()=>{
			if(idClientesFichas > 0){
				const {url, options} = CONSULTA_ONE_GET(idClientesFichas, getToken());
				const {response, json} = await request(url, options);
				if(json){
					
					setDataClientesFichas(json)
					 
		        }else{
		        	setDataClientesFichas([])
		        }
			}
		}

		getClientesFichas();
		
	}, [idClientesFichas])
	
	return(
		<>

		</>
	)
}

export default Pesquisar;