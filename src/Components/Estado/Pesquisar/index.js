import React from 'react';
import useFetch from '../../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, ESTADO_ONE_GET} from '../../../api/endpoints/geral.js'
import {UserContex} from '../../../Context/UserContex.js'

const Pesquisar = ({idEstado, setDataEstado, setCarregandoDadosEstado})=>{
	const {getToken, dataUser} = React.useContext(UserContex);

	const {data, error, request, loading} = useFetch();
	setCarregandoDadosEstado(loading)
	React.useEffect(()=>{
		
		const getEstado = async ()=>{
			if(idEstado > 0){
				const {url, options} = ESTADO_ONE_GET(idEstado, getToken());
				const {response, json} = await request(url, options);
				if(json){
					
					setDataEstado(json)
					 
		        }else{
		        	setDataEstado([])
		        }
			}
		}

		getEstado();
		
	}, [idEstado])
	/*
		atualizarCadastro && 
                <Atualizar setCarregandoDadosEstado={null} atualizarCadastro={setAtualizarCadastro} idEstado={clientChoice} setDataEstado={null} setShowModalCriarEstado={setShowModalAtualizarEstado} />
	*/
	return(
		<>

		</>
	)
}

export default Pesquisar;