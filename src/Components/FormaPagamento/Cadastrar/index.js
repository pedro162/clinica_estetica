import React from 'react';
import useFetch from '../../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, CONSULTA_ONE_GET, GRUPOS_ALL_POST} from '../../../api/endpoints/geral.js'
import {UserContex} from '../../../Context/UserContex.js'
import FormFormaPagamento from '../FormFormaPagamento/index.js'
import Pesquisar from '../Pesquisar/index.js'
import Modal from '../../Utils/Modal/index.js'
import Load from '../../Utils/Load/index.js'

const Cadastrar = ({idFormaPagamento, setIdFormaPagamento, callback, atualizarFormaPagamento, setAtualizarFormaPagamento, cadastrarFormaPagamento, setCadastrarFormaPagamento})=>{

    
    const [showModalAtualizarFormaPagamento, setShowModalAtualizarFormaPagamento] = React.useState(false)
    const [carregando, setCarregando] = React.useState(false)
    const [dataFormaPagamento, setDataFormaPagamento] = React.useState(null)
    const [dataGrupo, setDataGrupo] = React.useState(null)
	const {getToken, dataUser} = React.useContext(UserContex);

	const {data, error, request, loading} = useFetch();

	React.useEffect(()=>{
		
		const getGrupo = async ()=>{
			const {url, options} = GRUPOS_ALL_POST({}, getToken());
	        const {response, json} = await request(url, options);

	        if(json){
	            setDataGrupo(json)
	            setShowModalAtualizarFormaPagamento(true)
	        }else{
	        	setDataGrupo(null)
	        }
		}

		if(cadastrarFormaPagamento == true){
			getGrupo();
		}
				
	}, [cadastrarFormaPagamento])

	return(
		<>
			{! dataGrupo &&
				<Modal noBtnCancelar={true} noBtnConcluir={true} handleConcluir={()=>null}  title={'Cadastrar forma de pagamento'} size="log" propsConcluir={{}} labelConcluir={''} dialogClassName={''} aria-labelledby={'aria-labelledby'} labelCanelar="" show={setShowModalAtualizarFormaPagamento} showHide={()=>{setShowModalAtualizarFormaPagamento();}}>
					<Load/>
				</Modal>
			}
			{dataGrupo &&
				<FormFormaPagamento dataGrupo={dataGrupo} setIdFormaPagamento={setIdFormaPagamento} idFormaPagamento={idFormaPagamento} carregando={false} dataFormaPagamentoChoice={dataFormaPagamento} setAtualizarFormaPagamento={setAtualizarFormaPagamento} atualizarFormaPagamento={atualizarFormaPagamento} showModalCriarFormaPagamento={showModalAtualizarFormaPagamento} setShowModalCriarFormaPagamento={()=>{setShowModalAtualizarFormaPagamento();setCadastrarFormaPagamento()}} callback={callback} />
			}
		</>
	)
}

export default Cadastrar;