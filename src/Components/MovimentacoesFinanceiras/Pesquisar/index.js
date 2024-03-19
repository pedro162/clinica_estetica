import React from 'react';
import useFetch from '../../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, CONSULTA_ONE_GET} from '../../../api/endpoints/geral.js'
import {UserContex} from '../../../Context/UserContex.js'

const Pesquisar = ({idMovimentacoesFinanceira, setDataMovimentacoesFinanceira, setCarregandoDadosMovimentacoesFinanceira})=>{
	const {getToken, dataUser} = React.useContext(UserContex);

	const {data, error, request, loading} = useFetch();
	setCarregandoDadosMovimentacoesFinanceira(loading)
	React.useEffect(()=>{
		
		const getMovimentacoesFinanceira = async ()=>{
			if(idMovimentacoesFinanceira > 0){
				const {url, options} = CONSULTA_ONE_GET(idMovimentacoesFinanceira, getToken());
				const {response, json} = await request(url, options);
				if(json){
					
					setDataMovimentacoesFinanceira(json)
					 
		        }else{
		        	setDataMovimentacoesFinanceira([])
		        }
			}
		}

		getMovimentacoesFinanceira();
		
	}, [idMovimentacoesFinanceira])
	
	return(
		<>

		</>
	)
}

export default Pesquisar;