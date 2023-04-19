import React from 'react';
import useFetch from '../../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, CLIENTES_ONE_GET, ESTADO_ALL_POST} from '../../../api/endpoints/geral.js'
import {UserContex} from '../../../Context/UserContex.js'
import FormAgenda from '../FormAgenda/index.js'
import Pesquisar from '../Pesquisar/index.js'
import Modal from '../../Utils/Modal/index.js'
import Load from '../../Utils/Load/index.js'

const Cadastrar = ({idAgenda, setIdAgenda, callback, atualizarCadastro, setAtualizarCadastro, cadastrarAgenda, setCadastrarAgenda})=>{

    
    const [showModalAtualizarAgenda, setShowModalAtualizarAgenda] = React.useState(false)
    const [carregando, setCarregando] = React.useState(false)
    const [dataAgenda, setDataAgenda] = React.useState(null)
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
	            setShowModalAtualizarAgenda(true)
	        }else{
	        	setDataEstado(null)
	        }
		}
		if(cadastrarAgenda == true){
			getEstado();
		}
		
		
	}, [cadastrarAgenda])

	/*
		atualizarCadastro && 
                <Atualizar setCarregandoDadosCliente={null} atualizarCadastro={setAtualizarCadastro} idAgenda={clientChoice} setDataAgenda={null} setShowModalCriarAgenda={setShowModalAtualizarAgenda} />
	*/
	//<Pesquisar idAgenda={idAgenda} setDataAgenda={setDataAgenda} setCarregandoDadosCliente={setCarregando} />
	return(
		<>
			{! dataEstado &&
				<Modal noBtnCancelar={true} noBtnConcluir={true} handleConcluir={()=>null}  title={'Cadastrar Agenda'} size="xs" propsConcluir={{}} labelConcluir={''} dialogClassName={'modal-90w'} aria-labelledby={'aria-labelledby'} labelCanelar="" show={setShowModalAtualizarAgenda} showHide={()=>{setShowModalAtualizarAgenda();}}>
					<Load/>
				</Modal>
			}
			{dataEstado &&
				<FormAgenda dataEstado={dataEstado} setIdAgenda={setIdAgenda} idAgenda={idAgenda} carregando={false} dataAgendaChoice={dataAgenda} setAtualizarCadastro={setAtualizarCadastro} atualizarCadastro={atualizarCadastro} showModalCriarAgenda={showModalAtualizarAgenda} setShowModalCriarAgenda={()=>{setShowModalAtualizarAgenda();setCadastrarAgenda()}} callback={callback} />
			}
		</>
	)
}

export default Cadastrar;