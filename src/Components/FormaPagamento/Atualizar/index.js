import React from 'react';
import useFetch from '../../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, CONSULTA_ONE_GET, GRUPOS_ALL_POST} from '../../../api/endpoints/geral.js'
import {UserContex} from '../../../Context/UserContex.js'
import FormFormaPagamento from '../FormFormaPagamento/index.js'
import Pesquisar from '../Pesquisar/index.js'
import Modal from '../../Utils/Modal/index.js'
import Load from '../../Utils/Load/index.js'
import {Col, Row} from 'react-bootstrap';
import AlertaDismissible from '../../Utils/Alerta/AlertaDismissible.js'

const Atualizar = ({idFormaPagamento, setIdFormaPagamento, callback, atualizarFormaPagamento, setAtualizarFormaPagamento})=>{

    
    const [showModalAtualizarFormaPagamento, setShowModalAtualizarFormaPagamento] = React.useState(false)
    const [carregando, setCarregando] = React.useState(false)
    const [dataFormaPagamento, setDataFormaPagamento] = React.useState(null)
    const [dataGrupo, setDataGrupo] = React.useState(null)
	const {getToken, dataUser} = React.useContext(UserContex);

	const {data, error, request, loading} = useFetch();
	React.useEffect(()=>{
		
		const getFormaPagamento = async ()=>{
			if(idFormaPagamento > 0){
				const {url, options} = CONSULTA_ONE_GET(idFormaPagamento, getToken());
				const {response, json} = await request(url, options);
				if(json){
					
					setDataFormaPagamento(json)
					setShowModalAtualizarFormaPagamento(true)
					 
		        }else{
		        	setDataFormaPagamento([])
		        }
			}
		}

		getFormaPagamento();
		
	}, [idFormaPagamento])

	return(
		<>
			{! dataFormaPagamento &&
				<Modal noBtnCancelar={true} noBtnConcluir={true} handleConcluir={()=>null}  title={'Atualizar Forma de Pagamento'} size="xs" propsConcluir={{}} labelConcluir={''} dialogClassName={'modal-90w'} aria-labelledby={'aria-labelledby'} labelCanelar="" show={setShowModalAtualizarFormaPagamento} showHide={()=>{setShowModalAtualizarFormaPagamento();}}>
					<Load/>
				</Modal>
			}

			{dataFormaPagamento && 
				<FormFormaPagamento setIdFormaPagamento={setIdFormaPagamento} idFormaPagamento={idFormaPagamento} carregando={false} dataFormaPagamentoChoice={dataFormaPagamento} setAtualizarFormaPagamento={setAtualizarFormaPagamento} atualizarFormaPagamento={atualizarFormaPagamento} showModalCriarFormaPagamento={showModalAtualizarFormaPagamento} setShowModalCriarFormaPagamento={setShowModalAtualizarFormaPagamento} callback={callback} />
			}
		</>
	)
}

export default Atualizar;