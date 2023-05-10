import React from 'react';
import useFetch from '../../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, CONSULTA_ONE_GET, GRUPOS_ALL_POST} from '../../../api/endpoints/geral.js'
import {UserContex} from '../../../Context/UserContex.js'
import FormOrdemServico from '../FormOrdemServico/index.js'
import Pesquisar from '../Pesquisar/index.js'
import Modal from '../../Utils/Modal/index.js'
import Load from '../../Utils/Load/index.js'

const Cadastrar = ({idOrdemServico, setIdOrdemServico, callback, atualizarOrdemServico, setAtualizarOrdemServico, cadastrarOrdemServico, setCadastrarOrdemServico})=>{

    
    const [showModalAtualizarOrdemServico, setShowModalAtualizarOrdemServico] = React.useState(false)
    const [carregando, setCarregando] = React.useState(false)
    const [dataOrdemServico, setDataOrdemServico] = React.useState(null)
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
	            setShowModalAtualizarOrdemServico(true)
	        }else{
	        	setDataGrupo(null)
	        }
		}
		if(cadastrarOrdemServico == true){
			getGrupo();
		}
		
		
	}, [cadastrarOrdemServico])

	/*
		atualizarOrdemServico && 
                <Atualizar setCarregandoDadosOrdemServico={null} atualizarOrdemServico={setAtualizarOrdemServico} idOrdemServico={clientChoice} setDataOrdemServico={null} setShowModalCriarOrdemServico={setShowModalAtualizarOrdemServico} />
	*/
	//<Pesquisar idOrdemServico={idOrdemServico} setDataOrdemServico={setDataOrdemServico} setCarregandoDadosOrdemServico={setCarregando} />
	return(
		<>
			{! dataGrupo &&
				<Modal noBtnCancelar={true} noBtnConcluir={true} handleConcluir={()=>null}  title={'Cadastrar OrdemServico'} size="xs" propsConcluir={{}} labelConcluir={''} dialogClassName={''} aria-labelledby={'aria-labelledby'} labelCanelar="" show={setShowModalAtualizarOrdemServico} showHide={()=>{setShowModalAtualizarOrdemServico();}}>
					<Load/>
				</Modal>
			}
			{dataGrupo &&
				<FormOrdemServico dataGrupo={dataGrupo} setIdOrdemServico={setIdOrdemServico} idOrdemServico={idOrdemServico} carregando={false} dataOrdemServicoChoice={dataOrdemServico} setAtualizarOrdemServico={setAtualizarOrdemServico} atualizarOrdemServico={atualizarOrdemServico} showModalCriarOrdemServico={showModalAtualizarOrdemServico} setShowModalCriarOrdemServico={()=>{setShowModalAtualizarOrdemServico();setCadastrarOrdemServico()}} callback={callback} />
			}
		</>
	)
}

export default Cadastrar;