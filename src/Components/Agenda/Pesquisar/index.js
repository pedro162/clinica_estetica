import React from 'react';
import useFetch from '../../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, CIDADE_ONE_GET} from '../../../api/endpoints/geral.js'
import {UserContex} from '../../../Context/UserContex.js'

const Pesquisar = ({idCidade, setDataCidade, setCarregandoDadosCidade})=>{
	const {getToken, dataUser} = React.useContext(UserContex);

	const {data, error, request, loading} = useFetch();
	setCarregandoDadosCidade(loading)
	React.useEffect(()=>{
		
		const getCidade = async ()=>{
			if(idCidade > 0){
				const {url, options} = CIDADE_ONE_GET(idCidade, getToken());
				const {response, json} = await request(url, options);
				if(json){
					
					setDataCidade(json)
					 
		        }else{
		        	setDataCidade([])
		        }
			}
		}

		getCidade();
		
	}, [idCidade])
	/*
		atualizarCadastro && 
                <Atualizar setCarregandoDadosCidade={null} atualizarCadastro={setAtualizarCadastro} idCidade={clientChoice} setDataCidade={null} setShowModalCriarCliente={setShowModalAtualizarCliente} />
	*/
	return(
		<>

		</>
	)
}

export default Pesquisar;