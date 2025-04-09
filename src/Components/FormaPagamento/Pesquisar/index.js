import React from 'react';
import useFetch from '../../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, CONSULTA_ONE_GET} from '../../../api/endpoints/geral.js'
import {UserContex} from '../../../Context/UserContex.js'

const Pesquisar = ({idFormaPagamento, setDataFormaPagamento, setCarregandoDadosFormaPagamento})=>{
	const {getToken, dataUser} = React.useContext(UserContex);

	const {data, error, request, loading} = useFetch();
	setCarregandoDadosFormaPagamento(loading)
	React.useEffect(()=>{
		
		const getFormaPagamento = async ()=>{
			if(idFormaPagamento > 0){
				const {url, options} = CONSULTA_ONE_GET(idFormaPagamento, getToken());
				const {response, json} = await request(url, options);
				if(json){
					
					setDataFormaPagamento(json)
					 
		        }else{
		        	setDataFormaPagamento([])
		        }
			}
		}

		getFormaPagamento();
		
	}, [idFormaPagamento])
	
	return(
		<>

		</>
	)
}

export default Pesquisar;