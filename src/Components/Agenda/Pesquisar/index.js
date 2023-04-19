import React from 'react';
import useFetch from '../../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, AGENDA_ONE_GET} from '../../../api/endpoints/geral.js'
import {UserContex} from '../../../Context/UserContex.js'

const Pesquisar = ({idAgenda, setDataAgenda, setCarregandoDadosAgenda})=>{
	const {getToken, dataUser} = React.useContext(UserContex);

	const {data, error, request, loading} = useFetch();
	setCarregandoDadosAgenda(loading)
	React.useEffect(()=>{
		
		const getAgenda = async ()=>{
			if(idAgenda > 0){
				const {url, options} = AGENDA_ONE_GET(idAgenda, getToken());
				const {response, json} = await request(url, options);
				if(json){
					
					setDataAgenda(json)
					 
		        }else{
		        	setDataAgenda([])
		        }
			}
		}

		getAgenda();
		
	}, [idAgenda])
	/*
		atualizarCadastro && 
                <Atualizar setCarregandoDadosAgenda={null} atualizarCadastro={setAtualizarCadastro} idAgenda={clientChoice} setDataAgenda={null} setShowModalCriarCliente={setShowModalAtualizarCliente} />
	*/
	return(
		<>

		</>
	)
}

export default Pesquisar;