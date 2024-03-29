import React from 'react';
import useFetch from '../../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, CLIENTES_ONE_GET, CATEGORIA_EVENTO_ALL_POST} from '../../../api/endpoints/geral.js'
import {UserContex} from '../../../Context/UserContex.js'
import FormAgendaEvento from '../FormAgendaEvento/index.js'
import Pesquisar from '../Pesquisar/index.js'
import Modal from '../../Utils/Modal/index.js'
import Load from '../../Utils/Load/index.js'

const Cadastrar = ({idAgendaEvento, setIdAgendaEvento, callback, atualizarCadastro, setAtualizarCadastro, cadastrarAgendaEvento, setCadastrarAgendaEvento})=>{

    
    const [showModalAtualizarAgendaEvento, setShowModalAtualizarAgendaEvento] = React.useState(false)
    const [carregando, setCarregando] = React.useState(false)
    const [dataAgendaEvento, setDataAgendaEvento] = React.useState(null)
    const [dataCategoria, setDataCategoria] = React.useState(null)
	const {getToken, dataUser} = React.useContext(UserContex);

	const {data, error, request, loading} = useFetch();
	React.useEffect(()=>{
		
		const getCategoria = async ()=>{
			const {url, options} = CATEGORIA_EVENTO_ALL_POST({}, getToken());

	        const {response, json} = await request(url, options);
	        console.log('All estado here')
	        console.log(json)
	        if(json){
	            setDataCategoria(json)
	            setShowModalAtualizarAgendaEvento(true)
	        }else{
	        	setDataCategoria(null)
	        }
		}
		if(cadastrarAgendaEvento == true){
			getCategoria();
		}
		
		
	}, [cadastrarAgendaEvento])

	/*
		atualizarCadastro && 
                <Atualizar setCarregandoDadosCliente={null} atualizarCadastro={setAtualizarCadastro} idAgendaEvento={clientChoice} setDataAgendaEvento={null} setShowModalCriarAgendaEvento={setShowModalAtualizarAgendaEvento} />
	*/
	//<Pesquisar idAgendaEvento={idAgendaEvento} setDataAgendaEvento={setDataAgendaEvento} setCarregandoDadosCliente={setCarregando} />
	return(
		<>
			{! dataCategoria &&
				<Modal noBtnCancelar={true} noBtnConcluir={true} handleConcluir={()=>null}  title={'Cadastrar AgendaEvento'} size="xs" propsConcluir={{}} labelConcluir={''} dialogClassName={'modal-90w'} aria-labelledby={'aria-labelledby'} labelCanelar="" show={setShowModalAtualizarAgendaEvento} showHide={()=>{setShowModalAtualizarAgendaEvento();}}>
					<Load/>
				</Modal>
			}
			{dataCategoria &&
				<FormAgendaEvento dataCategoria={dataCategoria} setIdAgendaEvento={setIdAgendaEvento} idAgendaEvento={idAgendaEvento} carregando={false} dataAgendaEventoChoice={dataAgendaEvento} setAtualizarCadastro={setAtualizarCadastro} atualizarCadastro={atualizarCadastro} showModalCriarAgendaEvento={showModalAtualizarAgendaEvento} setShowModalCriarAgendaEvento={()=>{setShowModalAtualizarAgendaEvento();setCadastrarAgendaEvento()}} callback={callback} />
			}
		</>
	)
}

export default Cadastrar;