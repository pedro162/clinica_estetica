import React from 'react';
import useFetch from '../../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, PROFISSIONAIS_ONE_GET} from '../../../api/endpoints/geral.js'
import {UserContex} from '../../../Context/UserContex.js'

const Pesquisar = ({idProfissionais, setDataProfissionais, setCarregandoDadosProfissionais})=>{
	const {getToken, dataUser} = React.useContext(UserContex);

	const {data, error, request, loading} = useFetch();
	setCarregandoDadosProfissionais(loading)
	React.useEffect(()=>{
		
		const getProfissionais = async ()=>{
			if(idProfissionais > 0){
				const {url, options} = PROFISSIONAIS_ONE_GET(idProfissionais, getToken());
				const {response, json} = await request(url, options);
				if(json){
					
					setDataProfissionais(json)
					 
		        }else{
		        	setDataProfissionais([])
		        }
			}
		}

		getProfissionais();
		
	}, [idProfissionais])
	/*
		atualizarCadastro && 
                <Atualizar setCarregandoDadosProfissionais={null} atualizarCadastro={setAtualizarCadastro} idProfissionais={clientChoice} setDataProfissionais={null} setShowModalCriarCliente={setShowModalAtualizarCliente} />
	*/
	return(
		<>

		</>
	)
}

export default Pesquisar;