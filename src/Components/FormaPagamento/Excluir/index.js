import React from 'react';
import useFetch from '../../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, FORMA_PAGAMENTO_ONE_GET, GRUPOS_ALL_POST} from '../../../api/endpoints/geral.js'
import {UserContex} from '../../../Context/UserContex.js'
import FormExcluirFormaPagamento from '../FormExcluirFormaPagamento/index.js'
import Pesquisar from '../Pesquisar/index.js'
import Modal from '../../Utils/Modal/index.js'
import Load from '../../Utils/Load/index.js'
import {Col, Row} from 'react-bootstrap';
import Swal from 'sweetalert2'

const Excluir = ({idFormaPagamento, setIdFormaPagamento, callback, cancelarFormaPagamento, setExcluirFormaPagamento})=>{
    const [showModalExcluirFormaPagamento, setShowModalExcluirFormaPagamento] = React.useState(false)    
    const [dataFormaPagamento, setDataFormaPagamento] = React.useState(null)
	const {getToken, dataUser} = React.useContext(UserContex);
	const {data, error, request, loading} = useFetch();

	React.useEffect(()=>{
		
		const getFormaPagamento = async ()=>{
			if(idFormaPagamento > 0){
				const {url, options} = FORMA_PAGAMENTO_ONE_GET(idFormaPagamento, getToken());
				const {response, json} = await request(url, options);
				
				if(json){
					
					setDataFormaPagamento(json)
					setShowModalExcluirFormaPagamento(true)
					 
		        }else{
		        	setDataFormaPagamento([])
		        }
			}
		}

		getFormaPagamento();
		
	}, [idFormaPagamento])


	if(error){
		Swal.fire({
			icon: "error",
			title: "Oops...",
			text: error,
			footer: '',
			confirmButtonColor: "#07B201",
			//width:'20rem',
		});
	}
	
	return(
		<>
			{! dataFormaPagamento &&
				<Modal noBtnExcluir={true} noBtnConcluir={true} handleConcluir={()=>null}  title={'Excluir FormaPagamento'} size="xs" propsConcluir={{}} labelConcluir={''} dialogClassName={''} aria-labelledby={'aria-labelledby'} labelCanelar="" show={setShowModalExcluirFormaPagamento} showHide={()=>{setShowModalExcluirFormaPagamento();}}>
					<Load/>
				</Modal>
			}

			{dataFormaPagamento && 
				<FormExcluirFormaPagamento setIdFormaPagamento={setIdFormaPagamento} idFormaPagamento={idFormaPagamento} carregando={false} dataFormaPagamentoChoice={dataFormaPagamento} setExcluirFormaPagamento={setExcluirFormaPagamento} cancelarFormaPagamento={cancelarFormaPagamento} showModalExcluirFormaPagamento={showModalExcluirFormaPagamento} setShowModalExcluirFormaPagamento={setShowModalExcluirFormaPagamento} callback={callback} />
			}
		</>
	)
}

export default Excluir;