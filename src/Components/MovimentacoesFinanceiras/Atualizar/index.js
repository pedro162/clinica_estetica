import React from 'react';
import useFetch from '../../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, CONSULTA_ONE_GET, GRUPOS_ALL_POST} from '../../../api/endpoints/geral.js'
import {UserContex} from '../../../Context/UserContex.js'
import FormMovimentacoesFinanceira from '../FormMovimentacoesFinanceira/index.js'
import Pesquisar from '../Pesquisar/index.js'
import Modal from '../../Utils/Modal/index.js'
import Load from '../../Utils/Load/index.js'
import {Col, Row} from 'react-bootstrap';
import AlertaDismissible from '../../Utils/Alerta/AlertaDismissible'

const Atualizar = ({idMovimentacoesFinanceira, setIdMovimentacoesFinanceira, callback, atualizarMovimentacoesFinanceira, setAtualizarMovimentacoesFinanceira})=>{

    
    const [showModalAtualizarMovimentacoesFinanceira, setShowModalAtualizarMovimentacoesFinanceira] = React.useState(false)
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
					setShowModalAtualizarMovimentacoesFinanceira(true)
					 
		        }else{
		        	setDataMovimentacoesFinanceira([])
		        }
			}
		}

		getMovimentacoesFinanceira();
		
	}, [idMovimentacoesFinanceira])

	/*
		atualizarMovimentacoesFinanceira && 
                <Atualizar setCarregandoDadosMovimentacoesFinanceira={null} atualizarMovimentacoesFinanceira={setAtualizarMovimentacoesFinanceira} idMovimentacoesFinanceira={clientChoice} setDataMovimentacoesFinanceira={null} setShowModalCriarMovimentacoesFinanceira={setShowModalAtualizarMovimentacoesFinanceira} />
	*/
	//<Pesquisar idMovimentacoesFinanceira={idMovimentacoesFinanceira} setDataMovimentacoesFinanceira={setDataMovimentacoesFinanceira} setCarregandoDadosMovimentacoesFinanceira={setCarregando} />
	return(
		<>
			{! dataMovimentacoesFinanceira &&
				<Modal noBtnCancelar={true} noBtnConcluir={true} handleConcluir={()=>null}  title={'Atualizar MovimentacoesFinanceira'} size="xs" propsConcluir={{}} labelConcluir={''} dialogClassName={'modal-90w'} aria-labelledby={'aria-labelledby'} labelCanelar="" show={setShowModalAtualizarMovimentacoesFinanceira} showHide={()=>{setShowModalAtualizarMovimentacoesFinanceira();}}>
					<Load/>
				</Modal>
			}

			{dataMovimentacoesFinanceira && 
				<FormMovimentacoesFinanceira setIdMovimentacoesFinanceira={setIdMovimentacoesFinanceira} idMovimentacoesFinanceira={idMovimentacoesFinanceira} carregando={false} dataMovimentacoesFinanceiraChoice={dataMovimentacoesFinanceira} setAtualizarMovimentacoesFinanceira={setAtualizarMovimentacoesFinanceira} atualizarMovimentacoesFinanceira={atualizarMovimentacoesFinanceira} showModalCriarMovimentacoesFinanceira={showModalAtualizarMovimentacoesFinanceira} setShowModalCriarMovimentacoesFinanceira={setShowModalAtualizarMovimentacoesFinanceira} callback={callback} />
			}
		</>
	)
}

export default Atualizar;