import React from 'react';
import useFetch from '../../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, CATEGORIA_EVENTO_ONE_GET} from '../../../api/endpoints/geral.js'
import {UserContex} from '../../../Context/UserContex.js'

const Pesquisar = ({idCategoriaEvento, setDataCategoriaEvento, setCarregandoDadosCategoriaEvento})=>{
	const {getToken, dataUser} = React.useContext(UserContex);

	const {data, error, request, loading} = useFetch();
	setCarregandoDadosCategoriaEvento(loading)
	React.useEffect(()=>{
		
		const getCategoriaEvento = async ()=>{
			if(idCategoriaEvento > 0){
				const {url, options} = CATEGORIA_EVENTO_ONE_GET(idCategoriaEvento, getToken());
				const {response, json} = await request(url, options);
				if(json){
					
					setDataCategoriaEvento(json)
					 
		        }else{
		        	setDataCategoriaEvento([])
		        }
			}
		}

		getCategoriaEvento();
		
	}, [idCategoriaEvento])
	/*
		atualizarCadastro && 
                <Atualizar setCarregandoDadosCategoriaEvento={null} atualizarCadastro={setAtualizarCadastro} idCategoriaEvento={clientChoice} setDataCategoriaEvento={null} setShowModalCriarCliente={setShowModalAtualizarCliente} />
	*/
	return(
		<>

		</>
	)
}

export default Pesquisar;