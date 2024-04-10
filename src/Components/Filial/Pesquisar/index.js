import React from 'react';
import useFetch from '../../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, CONSULTA_ONE_GET} from '../../../api/endpoints/geral.js'
import {UserContex} from '../../../Context/UserContex.js'

const Pesquisar = ({idFilial, setDataFilial, setCarregandoDadosFilial})=>{
	const {getToken, dataUser} = React.useContext(UserContex);

	const {data, error, request, loading} = useFetch();
	setCarregandoDadosFilial(loading)
	React.useEffect(()=>{
		
		const getFilial = async ()=>{
			if(idFilial > 0){
				const {url, options} = CONSULTA_ONE_GET(idFilial, getToken());
				const {response, json} = await request(url, options);
				if(json){
					
					setDataFilial(json)
					 
		        }else{
		        	setDataFilial([])
		        }
			}
		}

		getFilial();
		
	}, [idFilial])
	
	return(
		<>

		</>
	)
}

export default Pesquisar;