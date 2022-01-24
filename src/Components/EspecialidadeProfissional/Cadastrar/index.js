import React from 'react';
import useFetch from '../../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, CLIENTES_ONE_GET, ESTADO_ALL_POST} from '../../../api/endpoints/geral.js'
import {UserContex} from '../../../Context/UserContex.js'
import FormEspecialidade from '../FormEspecialidade/index.js'
import Pesquisar from '../Pesquisar/index.js'
import Modal from '../../Utils/Modal/index.js'
import Load from '../../Utils/Load/index.js'

const Cadastrar = ({idEspecialidade, setIdEspecialidade, callback, atualizarCadastro, setAtualizarCadastro, cadastrarEspecialidade, setCadastrarEspecialidade})=>{

    
    const [showModalAtualizarEspecialidade, setShowModalAtualizarEspecialidade] = React.useState(false)
    const [carregando, setCarregando] = React.useState(false)
    const [dataEspecialidade, setDataEspecialidade] = React.useState(null)
    const [dataEstado, setDataEstado] = React.useState(null)
	const {getToken, dataUser} = React.useContext(UserContex);

	const {data, error, request, loading} = useFetch();
	React.useEffect(()=>{
		
		const getEstado = async ()=>{
			const {url, options} = ESTADO_ALL_POST({}, getToken());

	        const {response, json} = await request(url, options);
	        console.log('All estado here')
	        console.log(json)
	        if(json){
	            setDataEstado(json)
	            setShowModalAtualizarEspecialidade(true)
	        }else{
	        	setDataEstado(null)
	        }
		}
		if(cadastrarEspecialidade == true){
			getEstado();
		}
		
		
	}, [cadastrarEspecialidade])

	/*
		atualizarCadastro && 
                <Atualizar setCarregandoDadosCliente={null} atualizarCadastro={setAtualizarCadastro} idEspecialidade={clientChoice} setDataEspecialidade={null} setShowModalCriarEspecialidade={setShowModalAtualizarEspecialidade} />
	*/
	//<Pesquisar idEspecialidade={idEspecialidade} setDataEspecialidade={setDataEspecialidade} setCarregandoDadosCliente={setCarregando} />
	return(
		<>
			{! dataEstado &&
				<Modal noBtnCancelar={true} noBtnConcluir={true} handleConcluir={()=>null}  title={'Cadastrar Especialidade'} size="xs" propsConcluir={{}} labelConcluir={''} dialogClassName={'modal-90w'} aria-labelledby={'aria-labelledby'} labelCanelar="" show={setShowModalAtualizarEspecialidade} showHide={()=>{setShowModalAtualizarEspecialidade();}}>
					<Load/>
				</Modal>
			}
			{dataEstado &&
				<FormEspecialidade dataEstado={dataEstado} setIdEspecialidade={setIdEspecialidade} idEspecialidade={idEspecialidade} carregando={false} dataEspecialidadeChoice={dataEspecialidade} setAtualizarCadastro={setAtualizarCadastro} atualizarCadastro={atualizarCadastro} showModalCriarEspecialidade={showModalAtualizarEspecialidade} setShowModalCriarEspecialidade={()=>{setShowModalAtualizarEspecialidade();setCadastrarEspecialidade()}} callback={callback} />
			}
		</>
	)
}

export default Cadastrar;