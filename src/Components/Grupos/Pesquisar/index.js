import React from 'react';
import useFetch from '../../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, GRUPOS_ONE_GET} from '../../../api/endpoints/geral.js'
import {UserContex} from '../../../Context/UserContex.js'

const Pesquisar = ({idGrupo, setDataGrupo, setCarregandoDadosGrupo})=>{
	const {getToken, dataUser} = React.useContext(UserContex);

	const {data, error, request, loading} = useFetch();
	setCarregandoDadosGrupo(loading)
	React.useEffect(()=>{
		
		const getGrupo = async ()=>{
			if(idGrupo > 0){
				const {url, options} = GRUPOS_ONE_GET(idGrupo, getToken());
				const {response, json} = await request(url, options);
				if(json){
					
					setDataGrupo(json)
					 
		        }else{
		        	setDataGrupo([])
		        }
			}
		}

		getGrupo();
		
	}, [idGrupo])
	/*
		atualizarCadastro && 
                <Atualizar setCarregandoDadosGrupo={null} atualizarCadastro={setAtualizarCadastro} idGrupo={clientChoice} setDataGrupo={null} setShowModalCriarGrupo={setShowModalAtualizarGrupo} />
	*/
	return(
		<>

		</>
	)
}

export default Pesquisar;