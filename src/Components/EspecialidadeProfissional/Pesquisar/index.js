import React from 'react';
import useFetch from '../../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, AGENDA_EVENTO_ONE_GET} from '../../../api/endpoints/geral.js'
import {UserContex} from '../../../Context/UserContex.js'

const Pesquisar = ({idEspecialidade, setDataEspecialidade, setCarregandoDadosEspecialidade})=>{
	const {getToken, dataUser} = React.useContext(UserContex);

	const {data, error, request, loading} = useFetch();
	setCarregandoDadosEspecialidade(loading)
	React.useEffect(()=>{
		
		const getEspecialidade = async ()=>{
			if(idEspecialidade > 0){
				const {url, options} = AGENDA_EVENTO_ONE_GET(idEspecialidade, getToken());
				const {response, json} = await request(url, options);
				if(json){
					
					setDataEspecialidade(json)
					 
		        }else{
		        	setDataEspecialidade([])
		        }
			}
		}

		getEspecialidade();
		
	}, [idEspecialidade])
	/*
		atualizarCadastro && 
                <Atualizar setCarregandoDadosEspecialidade={null} atualizarCadastro={setAtualizarCadastro} idEspecialidade={clientChoice} setDataEspecialidade={null} setShowModalCriarCliente={setShowModalAtualizarCliente} />
	*/
	return(
		<>

		</>
	)
}

export default Pesquisar;