import React from 'react';
import useFetch from '../../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, FORMULARIO_PESSOA_ONE_GET, GRUPOS_ALL_POST} from '../../../api/endpoints/geral.js'
import {UserContex} from '../../../Context/UserContex.js'
import AtualizarForm from '../FormClientesFichas/index.js'
import Pesquisar from '../Pesquisar/index.js'
import Modal from '../../Utils/Modal/index.js'
import Load from '../../Utils/Load/index.js'
import {Col, Row} from 'react-bootstrap';
import AlertaDismissible from '../../Utils/Alerta/AlertaDismissible'

const Atualizar = ({idClientesFichas, setIdClientesFichas, callback, setVisualizarFicha, atualizarClientesFichas, setAtualizarClientesFichas})=>{

    
    const [showModalAtualizarClientesFichas, setShowModalAtualizarClientesFichas] = React.useState(false)
    const [carregando, setCarregando] = React.useState(false)
    const [dataClientesFichas, setDataClientesFichas] = React.useState(null)
    const [dataGrupo, setDataGrupo] = React.useState(null)
	const {getToken, dataUser} = React.useContext(UserContex);

	const {data, error, request, loading} = useFetch();
	React.useEffect(()=>{
		
		const getClientesFichas = async ()=>{
			if(idClientesFichas > 0){
				const {url, options} = FORMULARIO_PESSOA_ONE_GET(idClientesFichas, getToken());
				const {response, json} = await request(url, options);
				if(json){
					
					setDataClientesFichas(json)
					setShowModalAtualizarClientesFichas(true)
					 
		        }else{
		        	setDataClientesFichas([])
		        }
			}
		}

		getClientesFichas();
		
	}, [idClientesFichas])

	/*
		atualizarClientesFichas && 
                <Atualizar setCarregandoDadosClientesFichas={null} atualizarClientesFichas={setAtualizarClientesFichas} idClientesFichas={clientChoice} setDataClientesFichas={null} setShowModalCriarClientesFichas={setShowModalAtualizarClientesFichas} />
	*/
	//<Pesquisar idClientesFichas={idClientesFichas} setDataClientesFichas={setDataClientesFichas} setCarregandoDadosClientesFichas={setCarregando} />
	return(
		<>
			{! dataClientesFichas &&
				<Modal noBtnCancelar={true} noBtnConcluir={true} handleConcluir={()=>null}  title={'Atualizar ClientesFichas'} size="xs" propsConcluir={{}} labelConcluir={''} dialogClassName={''} aria-labelledby={'aria-labelledby'} labelCanelar="" show={setShowModalAtualizarClientesFichas} showHide={()=>{setShowModalAtualizarClientesFichas();}}>
					<Load/>
				</Modal>
			}

			{dataClientesFichas && 
				<AtualizarForm setDataClientesFichas={setDataClientesFichas} setIdClientesFichas={setIdClientesFichas} idClientesFichas={idClientesFichas} carregando={false} dataClientesFichasChoice={dataClientesFichas} setAtualizarClientesFichas={setAtualizarClientesFichas} atualizarClientesFichas={atualizarClientesFichas} showModalCriarClientesFichas={showModalAtualizarClientesFichas} setShowModalCriarClientesFichas={setShowModalAtualizarClientesFichas} setVisualizarFicha={setVisualizarFicha} callback={callback} />
			}
		</>
	)
}

export default Atualizar;