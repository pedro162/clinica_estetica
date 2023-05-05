import React from 'react';
import useFetch from '../../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, FORMULARIO_ITEM_ONE_GET} from '../../../api/endpoints/geral.js'
import {UserContex} from '../../../Context/UserContex.js'

const Pesquisar = ({idRegistro, setDataRegistro, setCarregandoDadosRegistro})=>{
	const {getToken, dataUser} = React.useContext(UserContex);

	const {data, error, request, loading} = useFetch();
	setCarregandoDadosRegistro(loading)
	React.useEffect(()=>{
		
		const getCliente = async ()=>{
			if(idRegistro > 0){
				const {url, options} = FORMULARIO_ITEM_ONE_GET(idRegistro, getToken());
				const {response, json} = await request(url, options);
				if(json){
					
					setDataRegistro(json)
					 
		        }else{
		        	setDataRegistro([])
		        }
			}
		}

		getCliente();
		
	}, [idRegistro])
	/*
		atualizarCadastro && 
                <Atualizar setCarregandoDadosRegistro={null} atualizarCadastro={setAtualizarCadastro} idRegistro={clientChoice} setDataRegistro={null} setShowModalCriarCliente={setShowModalAtualizarCliente} />
	*/
	return(
		<>

		</>
	)
}

export default Pesquisar;