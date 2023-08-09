import React from 'react';
import useFetch from '../../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, ORDEM_SERVICO_ONE_GET, GRUPOS_ALL_POST} from '../../../api/endpoints/geral.js'
import {UserContex} from '../../../Context/UserContex.js'
import FormOrdemServico from '../FormOrdemServico/index.js'
import Pesquisar from '../Pesquisar/index.js'
import Modal from '../../Utils/Modal/index.js'
import Load from '../../Utils/Load/index.js'
import {Col, Row} from 'react-bootstrap';
import AlertaDismissible from '../../Utils/Alerta/AlertaDismissible.js'

const Digitacao = ({idOrdemServico, setIdOrdemServico, callback, atualizarOrdemServico, setDigitacaoOrdemServico})=>{

    
    const [showModalDigitacaoOrdemServico, setShowModalDigitacaoOrdemServico] = React.useState(false)
    const [carregando, setCarregando] = React.useState(false)
    const [dataOrdemServico, setDataOrdemServico] = React.useState(null)
    const [dataGrupo, setDataGrupo] = React.useState(null)
	const {getToken, dataUser} = React.useContext(UserContex);

	const {data, error, request, loading} = useFetch();
	React.useEffect(()=>{
		
		const getOrdemServico = async ()=>{
			if(idOrdemServico > 0){
				const {url, options} = ORDEM_SERVICO_ONE_GET(idOrdemServico, getToken());
				const {response, json} = await request(url, options);
				if(json){
					
					setDataOrdemServico(json)
					setShowModalDigitacaoOrdemServico(true)
					 
		        }else{
		        	setDataOrdemServico([])
		        }
			}
		}

		getOrdemServico();
		
	}, [idOrdemServico])

	/*
		atualizarOrdemServico && 
                <Digitacao setCarregandoDadosOrdemServico={null} atualizarOrdemServico={setDigitacaoOrdemServico} idOrdemServico={clientChoice} setDataOrdemServico={null} setShowModalCriarOrdemServico={setShowModalDigitacaoOrdemServico} />
	*/
	//<Pesquisar idOrdemServico={idOrdemServico} setDataOrdemServico={setDataOrdemServico} setCarregandoDadosOrdemServico={setCarregando} />
	return(
		<>
			{! dataOrdemServico &&
				<Modal noBtnCancelar={true} noBtnConcluir={true} handleConcluir={()=>null}  title={'Digitacao OrdemServico'} size="xs" propsConcluir={{}} labelConcluir={''} dialogClassName={''} aria-labelledby={'aria-labelledby'} labelCanelar="" show={setShowModalDigitacaoOrdemServico} showHide={()=>{setShowModalDigitacaoOrdemServico();}}>
					<Load/>
				</Modal>
			}

			{dataOrdemServico && 
				<FormOrdemServico setDataOrdemServico={setDataOrdemServico} setIdOrdemServico={setIdOrdemServico} idOrdemServico={idOrdemServico} carregando={false} dataOrdemServicoChoice={dataOrdemServico} setDigitacaoOrdemServico={setDigitacaoOrdemServico} atualizarOrdemServico={atualizarOrdemServico} showModalCriarOrdemServico={showModalDigitacaoOrdemServico} setShowModalCriarOrdemServico={setShowModalDigitacaoOrdemServico} callback={callback} />
			}
		</>
	)
}

export default Digitacao;