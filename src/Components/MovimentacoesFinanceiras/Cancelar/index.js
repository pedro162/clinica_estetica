import React from 'react';
import useFetch from '../../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, CONSULTA_ONE_GET, GRUPOS_ALL_POST} from '../../../api/endpoints/geral.js'
import {UserContex} from '../../../Context/UserContex.js'
import FormCancelarMovimentacoesFinanceira from '../FormCancelarMovimentacoesFinanceira/index.js'
import Pesquisar from '../Pesquisar/index.js'
import Modal from '../../Utils/Modal/index.js'
import Load from '../../Utils/Load/index.js'
import {Col, Row} from 'react-bootstrap';
import AlertaDismissible from '../../Utils/Alerta/AlertaDismissible'

const Cancelar = ({idMovimentacoesFinanceira, setIdMovimentacoesFinanceira, callback, cancelarMovimentacoesFinanceira, setCancelarMovimentacoesFinanceira})=>{

    
    const [showModalCancelarMovimentacoesFinanceira, setShowModalCancelarMovimentacoesFinanceira] = React.useState(false)
    const [carregando, setCarregando] = React.useState(false)
    const [dataMovimentacoesFinanceira, setDataMovimentacoesFinanceira] = React.useState(null)
    const [dataGrupo, setDataGrupo] = React.useState(null)
	const {getToken, dataUser} = React.useContext(UserContex);

	const {data, error, request, loading} = useFetch();
	React.useEffect(()=>{
		
		const getMovimentacoesFinanceira = async ()=>{
			if(idMovimentacoesFinanceira > 0){
				const {url, options} = CONSULTA_ONE_GET(idMovimentacoesFinanceira, getToken());
				const {response, json} = await request(url, options);
				if(json){
					
					setDataMovimentacoesFinanceira(json)
					setShowModalCancelarMovimentacoesFinanceira(true)
					 
		        }else{
		        	setDataMovimentacoesFinanceira([])
		        }
			}
		}

		getMovimentacoesFinanceira();
		
	}, [idMovimentacoesFinanceira])

	/*
		cancelarMovimentacoesFinanceira && 
                <Cancelar setCarregandoDadosMovimentacoesFinanceira={null} cancelarMovimentacoesFinanceira={setCancelarMovimentacoesFinanceira} idMovimentacoesFinanceira={clientChoice} setDataMovimentacoesFinanceira={null} setShowModalCancelarMovimentacoesFinanceira={setShowModalCancelarMovimentacoesFinanceira} />
	*/
	//<Pesquisar idMovimentacoesFinanceira={idMovimentacoesFinanceira} setDataMovimentacoesFinanceira={setDataMovimentacoesFinanceira} setCarregandoDadosMovimentacoesFinanceira={setCarregando} />
	return(
		<>
			{! dataMovimentacoesFinanceira &&
				<Modal noBtnCancelar={true} noBtnConcluir={true} handleConcluir={()=>null}  title={'Cancelar MovimentacoesFinanceira'} size="xs" propsConcluir={{}} labelConcluir={''} dialogClassName={''} aria-labelledby={'aria-labelledby'} labelCanelar="" show={setShowModalCancelarMovimentacoesFinanceira} showHide={()=>{setShowModalCancelarMovimentacoesFinanceira();}}>
					<Load/>
				</Modal>
			}

			{dataMovimentacoesFinanceira && 
				<FormCancelarMovimentacoesFinanceira setIdMovimentacoesFinanceira={setIdMovimentacoesFinanceira} idMovimentacoesFinanceira={idMovimentacoesFinanceira} carregando={false} dataMovimentacoesFinanceiraChoice={dataMovimentacoesFinanceira} setCancelarMovimentacoesFinanceira={setCancelarMovimentacoesFinanceira} cancelarMovimentacoesFinanceira={cancelarMovimentacoesFinanceira} showModalCancelarMovimentacoesFinanceira={showModalCancelarMovimentacoesFinanceira} setShowModalCancelarMovimentacoesFinanceira={setShowModalCancelarMovimentacoesFinanceira} callback={callback} />
			}
		</>
	)
}

export default Cancelar;