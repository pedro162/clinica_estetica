import React from 'react';
import useFetch from '../../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, GRUPOS_ONE_GET} from '../../../api/endpoints/geral.js'
import {UserContex} from '../../../Context/UserContex.js'
import FormGrupo from '../FormGrupo/index.js'
import Pesquisar from '../Pesquisar/index.js'
import Modal from '../../Utils/Modal/index.js'
import Load from '../../Utils/Load/index.js'

const Atualizar = ({idGrupo, setIdGrupo, callback, atualizarCadastro, setAtualizarCadastro})=>{

    
    const [showModalAtualizarGrupo, setShowModalAtualizarGrupo] = React.useState(false)
    const [carregando, setCarregando] = React.useState(false)
    const [dataGrupo, setDataGrupo] = React.useState(null)
	const {getToken, dataUser} = React.useContext(UserContex);

	const {data, error, request, loading} = useFetch();
	React.useEffect(()=>{
		
		const getGrupo = async ()=>{
			if(idGrupo > 0){
				const {url, options} = GRUPOS_ONE_GET(idGrupo, getToken());
				const {response, json} = await request(url, options);
				if(json){
					
					setDataGrupo(json)
					setShowModalAtualizarGrupo(true)
					 
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
	//<Pesquisar idGrupo={idGrupo} setDataGrupo={setDataGrupo} setCarregandoDadosGrupo={setCarregando} />
	return(
		<>
			{! dataGrupo &&
				<Modal noBtnCancelar={true} noBtnConcluir={true} handleConcluir={()=>null}  title={'Atualizar Grupo'} size="xs" propsConcluir={{}} labelConcluir={''} dialogClassName={'modal-90w'} aria-labelledby={'aria-labelledby'} labelCanelar="" show={setShowModalAtualizarGrupo} showHide={()=>{setShowModalAtualizarGrupo();}}>
					<Load/>
				</Modal>
			}
			{dataGrupo &&
				<FormGrupo setIdGrupo={setIdGrupo} idGrupo={idGrupo} carregando={false} dataGrupoChoice={dataGrupo} setAtualizarCadastro={setAtualizarCadastro} atualizarCadastro={atualizarCadastro} showModalCriarGrupo={showModalAtualizarGrupo} setShowModalCriarGrupo={setShowModalAtualizarGrupo} callback={callback} />
			}
		</>
	)
}

export default Atualizar;