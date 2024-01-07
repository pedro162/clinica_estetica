import React from 'react';
import useFetch from '../../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, PAIS_ONE_GET} from '../../../api/endpoints/geral.js'
import {UserContex} from '../../../Context/UserContex.js'

const Pesquisar = ({idPais, setDataPais, setCarregandoDadosPais})=>{
	const {getToken, dataUser} = React.useContext(UserContex);

	const {data, error, request, loading} = useFetch();
	setCarregandoDadosPais(loading)
	React.useEffect(()=>{
		
		const getPais = async ()=>{
			if(idPais > 0){
				const {url, options} = PAIS_ONE_GET(idPais, getToken());
				const {response, json} = await request(url, options);
				if(json){
					
					setDataPais(json)
					 
		        }else{
		        	setDataPais([])
		        }
			}
		}

		getPais();
		
	}, [idPais])
	/*
		atualizarCadastro && 
                <Atualizar setCarregandoDadosPais={null} atualizarCadastro={setAtualizarCadastro} idPais={clientChoice} setDataPais={null} setShowModalCriarPais={setShowModalAtualizarPais} />
	*/
	return(
		<>

		</>
	)
}

export default Pesquisar;