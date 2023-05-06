import React from 'react';
import useFetch from '../../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, CONSULTA_ONE_GET} from '../../../api/endpoints/geral.js'
import {UserContex} from '../../../Context/UserContex.js'

const Pesquisar = ({idServico, setDataServico, setCarregandoDadosServico})=>{
	const {getToken, dataUser} = React.useContext(UserContex);

	const {data, error, request, loading} = useFetch();
	setCarregandoDadosServico(loading)
	React.useEffect(()=>{
		
		const getServico = async ()=>{
			if(idServico > 0){
				const {url, options} = CONSULTA_ONE_GET(idServico, getToken());
				const {response, json} = await request(url, options);
				if(json){
					
					setDataServico(json)
					 
		        }else{
		        	setDataServico([])
		        }
			}
		}

		getServico();
		
	}, [idServico])
	
	return(
		<>

		</>
	)
}

export default Pesquisar;