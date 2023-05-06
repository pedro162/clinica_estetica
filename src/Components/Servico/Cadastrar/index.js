import React from 'react';
import useFetch from '../../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, CONSULTA_ONE_GET, GRUPOS_ALL_POST} from '../../../api/endpoints/geral.js'
import {UserContex} from '../../../Context/UserContex.js'
import FormServico from '../FormServico/index.js'
import Pesquisar from '../Pesquisar/index.js'
import Modal from '../../Utils/Modal/index.js'
import Load from '../../Utils/Load/index.js'

const Cadastrar = ({idServico, setIdServico, callback, atualizarServico, setAtualizarServico, cadastrarServico, setCadastrarServico})=>{

    
    const [showModalAtualizarServico, setShowModalAtualizarServico] = React.useState(false)
    const [carregando, setCarregando] = React.useState(false)
    const [dataServico, setDataServico] = React.useState(null)
    const [dataGrupo, setDataGrupo] = React.useState(null)
	const {getToken, dataUser} = React.useContext(UserContex);

	const {data, error, request, loading} = useFetch();
	React.useEffect(()=>{
		
		const getGrupo = async ()=>{
			const {url, options} = GRUPOS_ALL_POST({}, getToken());

	        const {response, json} = await request(url, options);
	        console.log('All grupos here')
	        console.log(json)
	        if(json){
	            setDataGrupo(json)
	            setShowModalAtualizarServico(true)
	        }else{
	        	setDataGrupo(null)
	        }
		}
		if(cadastrarServico == true){
			getGrupo();
		}
		
		
	}, [cadastrarServico])

	/*
		atualizarServico && 
                <Atualizar setCarregandoDadosServico={null} atualizarServico={setAtualizarServico} idServico={clientChoice} setDataServico={null} setShowModalCriarServico={setShowModalAtualizarServico} />
	*/
	//<Pesquisar idServico={idServico} setDataServico={setDataServico} setCarregandoDadosServico={setCarregando} />
	return(
		<>
			{! dataGrupo &&
				<Modal noBtnCancelar={true} noBtnConcluir={true} handleConcluir={()=>null}  title={'Cadastrar Servico'} size="xs" propsConcluir={{}} labelConcluir={''} dialogClassName={''} aria-labelledby={'aria-labelledby'} labelCanelar="" show={setShowModalAtualizarServico} showHide={()=>{setShowModalAtualizarServico();}}>
					<Load/>
				</Modal>
			}
			{dataGrupo &&
				<FormServico dataGrupo={dataGrupo} setIdServico={setIdServico} idServico={idServico} carregando={false} dataServicoChoice={dataServico} setAtualizarServico={setAtualizarServico} atualizarServico={atualizarServico} showModalCriarServico={showModalAtualizarServico} setShowModalCriarServico={()=>{setShowModalAtualizarServico();setCadastrarServico()}} callback={callback} />
			}
		</>
	)
}

export default Cadastrar;