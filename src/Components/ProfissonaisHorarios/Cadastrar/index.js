import React from 'react';
import useFetch from '../../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, CLIENTES_ONE_GET, ESTADO_ALL_POST} from '../../../api/endpoints/geral.js'
import {UserContex} from '../../../Context/UserContex.js'
import FormAgendaEvento from '../FormAgendaEvento/index.js'
import Pesquisar from '../Pesquisar/index.js'
import Modal from '../../Utils/Modal/index.js'
import Load from '../../Utils/Load/index.js'

const Cadastrar = ({idAgendaEvento, setIdAgendaEvento, callback, atualizarCadastro, setAtualizarCadastro, cadastrarAgendaEvento, setCadastrarAgendaEvento})=>{

    
    const [showModalAtualizarAgendaEvento, setShowModalAtualizarAgendaEvento] = React.useState(false)
    const [carregando, setCarregando] = React.useState(false)
    const [dataAgendaEvento, setDataAgendaEvento] = React.useState(null)
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
	            setShowModalAtualizarAgendaEvento(true)
	        }else{
	        	setDataEstado(null)
	        }
		}
		if(cadastrarAgendaEvento == true){
			getEstado();
		}
		
		
	}, [cadastrarAgendaEvento])

	/*
		atualizarCadastro && 
                <Atualizar setCarregandoDadosCliente={null} atualizarCadastro={setAtualizarCadastro} idAgendaEvento={clientChoice} setDataAgendaEvento={null} setShowModalCriarAgendaEvento={setShowModalAtualizarAgendaEvento} />
	*/
	//<Pesquisar idAgendaEvento={idAgendaEvento} setDataAgendaEvento={setDataAgendaEvento} setCarregandoDadosCliente={setCarregando} />
	return(
		<>
			{! dataEstado &&
				<Modal noBtnCancelar={true} noBtnConcluir={true} handleConcluir={()=>null}  title={'Cadastrar AgendaEvento'} size="xs" propsConcluir={{}} labelConcluir={''} dialogClassName={'modal-90w'} aria-labelledby={'aria-labelledby'} labelCanelar="" show={setShowModalAtualizarAgendaEvento} showHide={()=>{setShowModalAtualizarAgendaEvento();}}>
					<Load/>
				</Modal>
			}
			{dataEstado &&
				<FormAgendaEvento dataEstado={dataEstado} setIdAgendaEvento={setIdAgendaEvento} idAgendaEvento={idAgendaEvento} carregando={false} dataAgendaEventoChoice={dataAgendaEvento} setAtualizarCadastro={setAtualizarCadastro} atualizarCadastro={atualizarCadastro} showModalCriarAgendaEvento={showModalAtualizarAgendaEvento} setShowModalCriarAgendaEvento={()=>{setShowModalAtualizarAgendaEvento();setCadastrarAgendaEvento()}} callback={callback} />
			}
		</>
	)
}

export default Cadastrar;