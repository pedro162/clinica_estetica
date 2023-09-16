import React from 'react';
import useFetch from '../../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, ORDEM_SERVICO_ONE_GET, GRUPOS_ALL_POST} from '../../../api/endpoints/geral.js'
import {UserContex} from '../../../Context/UserContex.js'
import CancelarForm from '../FormClientesFichas/CancelarForm.js'
import Pesquisar from '../Pesquisar/index.js'
import Modal from '../../Utils/Modal/index.js'
import Load from '../../Utils/Load/index.js'
import {Col, Row} from 'react-bootstrap';
import AlertaDismissible from '../../Utils/Alerta/AlertaDismissible.js'

const Cancelar = ({idClientesFichas, setIdClientesFichas, callback, atualizarClientesFichas, setCancelarClientesFichas})=>{

    
    const [showModalCancelarClientesFichas, setShowModalCancelarClientesFichas] = React.useState(false)
    const [carregando, setCarregando] = React.useState(false)
    const [dataClientesFichas, setDataClientesFichas] = React.useState(null)
    const [dataGrupo, setDataGrupo] = React.useState(null)
	const {getToken, dataUser} = React.useContext(UserContex);

	const {data, error, request, loading} = useFetch();
	React.useEffect(()=>{
		
		const getClientesFichas = async ()=>{
			if(idClientesFichas > 0){
				const {url, options} = ORDEM_SERVICO_ONE_GET(idClientesFichas, getToken());
				const {response, json} = await request(url, options);
				if(json){
					
					setDataClientesFichas(json)
					setShowModalCancelarClientesFichas(true)
					 
		        }else{
		        	setDataClientesFichas([])
		        }
			}
		}

		getClientesFichas();
		
	}, [idClientesFichas])

	/*
		atualizarClientesFichas && 
                <Cancelar setCarregandoDadosClientesFichas={null} atualizarClientesFichas={setCancelarClientesFichas} idClientesFichas={clientChoice} setDataClientesFichas={null} setShowModalCriarClientesFichas={setShowModalCancelarClientesFichas} />
	*/
	//<Pesquisar idClientesFichas={idClientesFichas} setDataClientesFichas={setDataClientesFichas} setCarregandoDadosClientesFichas={setCarregando} />
	return(
		<>
			{! dataClientesFichas &&
				<Modal noBtnCancelar={true} noBtnConcluir={true} handleConcluir={()=>null}  title={'Cancelar ClientesFichas'} size="xs" propsConcluir={{}} labelConcluir={''} dialogClassName={''} aria-labelledby={'aria-labelledby'} labelCanelar="" show={setShowModalCancelarClientesFichas} showHide={()=>{setShowModalCancelarClientesFichas();}}>
					<Load/>
				</Modal>
			}

			{dataClientesFichas && 
				<CancelarForm setDataClientesFichas={setDataClientesFichas} setIdClientesFichas={setIdClientesFichas} idClientesFichas={idClientesFichas} carregando={false} dataClientesFichasChoice={dataClientesFichas} setCancelarClientesFichas={setCancelarClientesFichas} atualizarClientesFichas={atualizarClientesFichas} showModalCriarClientesFichas={showModalCancelarClientesFichas} setShowModalCriarClientesFichas={setShowModalCancelarClientesFichas} callback={callback} />
			}
		</>
	)
}

export default Cancelar;