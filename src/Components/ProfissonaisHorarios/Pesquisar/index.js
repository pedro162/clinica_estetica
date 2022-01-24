import React from 'react';
import useFetch from '../../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, AGENDA_EVENTO_ONE_GET} from '../../../api/endpoints/geral.js'
import {UserContex} from '../../../Context/UserContex.js'

const Pesquisar = ({idAgendaEvento, setDataAgendaEvento, setCarregandoDadosAgendaEvento})=>{
	const {getToken, dataUser} = React.useContext(UserContex);

	const {data, error, request, loading} = useFetch();
	setCarregandoDadosAgendaEvento(loading)
	React.useEffect(()=>{
		
		const getAgendaEvento = async ()=>{
			if(idAgendaEvento > 0){
				const {url, options} = AGENDA_EVENTO_ONE_GET(idAgendaEvento, getToken());
				const {response, json} = await request(url, options);
				if(json){
					
					setDataAgendaEvento(json)
					 
		        }else{
		        	setDataAgendaEvento([])
		        }
			}
		}

		getAgendaEvento();
		
	}, [idAgendaEvento])
	/*
		atualizarCadastro && 
                <Atualizar setCarregandoDadosAgendaEvento={null} atualizarCadastro={setAtualizarCadastro} idAgendaEvento={clientChoice} setDataAgendaEvento={null} setShowModalCriarCliente={setShowModalAtualizarCliente} />
	*/
	return(
		<>

		</>
	)
}

export default Pesquisar;