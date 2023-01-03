import React from 'react';
import useFetch from '../../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, CLIENTES_ONE_GET} from '../../../api/endpoints/geral.js'
import {UserContex} from '../../../Context/UserContex.js'

const Pesquisar = ({idCliente, setDataCliente, setCarregandoDadosCliente})=>{
	const {getToken, dataUser} = React.useContext(UserContex);

	const {data, error, request, loading} = useFetch();
	setCarregandoDadosCliente(loading)
	React.useEffect(()=>{
		
		const getCliente = async ()=>{
			if(idCliente > 0){
				const {url, options} = CLIENTES_ONE_GET(idCliente, getToken());
				const {response, json} = await request(url, options);
				if(json){
					
					setDataCliente(json)
					 
		        }else{
		        	setDataCliente([])
		        }
			}
		}

		getCliente();
		
	}, [idCliente])
	/*
		atualizarCadastro && 
                <Atualizar setCarregandoDadosCliente={null} atualizarCadastro={setAtualizarCadastro} idCliente={clientChoice} setDataCliente={null} setShowModalCriarCliente={setShowModalAtualizarCliente} />
	*/
	return(
		<>

		</>
	)
}

export default Pesquisar;