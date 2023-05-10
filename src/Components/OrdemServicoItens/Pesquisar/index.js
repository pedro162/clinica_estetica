import React from 'react';
import useFetch from '../../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, CONSULTA_ONE_GET} from '../../../api/endpoints/geral.js'
import {UserContex} from '../../../Context/UserContex.js'

const Pesquisar = ({idOrdemServicoItens, setDataOrdemServicoItens, setCarregandoDadosOrdemServicoItens})=>{
	const {getToken, dataUser} = React.useContext(UserContex);

	const {data, error, request, loading} = useFetch();
	setCarregandoDadosOrdemServicoItens(loading)
	React.useEffect(()=>{
		
		const getOrdemServicoItens = async ()=>{
			if(idOrdemServicoItens > 0){
				const {url, options} = CONSULTA_ONE_GET(idOrdemServicoItens, getToken());
				const {response, json} = await request(url, options);
				if(json){
					
					setDataOrdemServicoItens(json)
					 
		        }else{
		        	setDataOrdemServicoItens([])
		        }
			}
		}

		getOrdemServicoItens();
		
	}, [idOrdemServicoItens])
	
	return(
		<>

		</>
	)
}

export default Pesquisar;