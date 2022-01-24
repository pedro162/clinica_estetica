import React from 'react';
import useFetch from '../../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, ESPECIALIDADE_ONE_GET, ESTADO_ALL_POST} from '../../../api/endpoints/geral.js'
import {UserContex} from '../../../Context/UserContex.js'
import FormEspecialidade from '../FormEspecialidade/index.js'
import Pesquisar from '../Pesquisar/index.js'
import Modal from '../../Utils/Modal/index.js'
import Load from '../../Utils/Load/index.js'

const Atualizar = ({idEspecialidade, setIdEspecialidade, callback, atualizarCadastro, setAtualizarCadastro})=>{

    
    const [showModalAtualizarEspecialidade, setShowModalAtualizarEspecialidade] = React.useState(false)
    const [carregando, setCarregando] = React.useState(false)
    const [dataEspecialidade, setDataEspecialidade] = React.useState(null)
    const [dataEstado, setDataEstado] = React.useState(null)
	const {getToken, dataUser} = React.useContext(UserContex);

	const {data, error, request, loading} = useFetch();
	React.useEffect(()=>{
		
		const getEspecialidade = async ()=>{
			if(idEspecialidade > 0){
				const {url, options} = ESPECIALIDADE_ONE_GET(idEspecialidade, getToken());
				const {response, json} = await request(url, options);
				if(json){
					
					setDataEspecialidade(json)
					setShowModalAtualizarEspecialidade(true)
					 
		        }else{
		        	setDataEspecialidade([])
		        }
			}
		}

		getEspecialidade();
		
	}, [idEspecialidade])

	/*
		atualizarCadastro && 
                <Atualizar setCarregandoDadosCliente={null} atualizarCadastro={setAtualizarCadastro} idEspecialidade={clientChoice} setDataEspecialidade={null} setShowModalCriarEspecialidade={setShowModalAtualizarEspecialidade} />
	*/
	//<Pesquisar idEspecialidade={idEspecialidade} setDataEspecialidade={setDataEspecialidade} setCarregandoDadosCliente={setCarregando} />
	return(
		<>
			{! dataEspecialidade &&
				<Modal noBtnCancelar={true} noBtnConcluir={true} handleConcluir={()=>null}  title={'Atualizar Especialidade'} size="xs" propsConcluir={{}} labelConcluir={''} dialogClassName={'modal-90w'} aria-labelledby={'aria-labelledby'} labelCanelar="" show={setShowModalAtualizarEspecialidade} showHide={()=>{setShowModalAtualizarEspecialidade();}}>
					<Load/>
				</Modal>
			}
			{dataEspecialidade &&
				<FormEspecialidade setIdEspecialidade={setIdEspecialidade} idEspecialidade={idEspecialidade} carregando={false} dataEspecialidadeChoice={dataEspecialidade} setAtualizarCadastro={setAtualizarCadastro} atualizarCadastro={atualizarCadastro} showModalCriarEspecialidade={showModalAtualizarEspecialidade} setShowModalCriarEspecialidade={setShowModalAtualizarEspecialidade} callback={callback} />
			}
		</>
	)
}

export default Atualizar;