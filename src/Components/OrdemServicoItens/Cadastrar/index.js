import React from 'react';
import useFetch from '../../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, CONSULTA_ONE_GET, GRUPOS_ALL_POST} from '../../../api/endpoints/geral.js'
import {UserContex} from '../../../Context/UserContex.js'
import FormOrdemServicoItens from '../FormOrdemServicoItens/index.js'
import Pesquisar from '../Pesquisar/index.js'
import Modal from '../../Utils/Modal/index.js'
import Load from '../../Utils/Load/index.js'

const Cadastrar = ({idOrdemServicoItens, setIdOrdemServicoItens, callback, atualizarOrdemServicoItens, setAtualizarOrdemServicoItens, cadastrarOrdemServicoItens, setCadastrarOrdemServicoItens})=>{

    
    const [showModalAtualizarOrdemServicoItens, setShowModalAtualizarOrdemServicoItens] = React.useState(false)
    const [carregando, setCarregando] = React.useState(false)
    const [dataOrdemServicoItens, setDataOrdemServicoItens] = React.useState(null)
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
	            setShowModalAtualizarOrdemServicoItens(true)
	        }else{
	        	setDataGrupo(null)
	        }
		}
		if(cadastrarOrdemServicoItens == true){
			getGrupo();
		}
		
		
	}, [cadastrarOrdemServicoItens])

	/*
		atualizarOrdemServicoItens && 
                <Atualizar setCarregandoDadosOrdemServicoItens={null} atualizarOrdemServicoItens={setAtualizarOrdemServicoItens} idOrdemServicoItens={clientChoice} setDataOrdemServicoItens={null} setShowModalCriarOrdemServicoItens={setShowModalAtualizarOrdemServicoItens} />
	*/
	//<Pesquisar idOrdemServicoItens={idOrdemServicoItens} setDataOrdemServicoItens={setDataOrdemServicoItens} setCarregandoDadosOrdemServicoItens={setCarregando} />
	return(
		<>
			{! dataGrupo &&
				<Modal noBtnCancelar={true} noBtnConcluir={true} handleConcluir={()=>null}  title={'Cadastrar OrdemServicoItens'} size="xs" propsConcluir={{}} labelConcluir={''} dialogClassName={''} aria-labelledby={'aria-labelledby'} labelCanelar="" show={setShowModalAtualizarOrdemServicoItens} showHide={()=>{setShowModalAtualizarOrdemServicoItens();}}>
					<Load/>
				</Modal>
			}
			{dataGrupo &&
				<FormOrdemServicoItens dataGrupo={dataGrupo} setIdOrdemServicoItens={setIdOrdemServicoItens} idOrdemServicoItens={idOrdemServicoItens} carregando={false} dataOrdemServicoItensChoice={dataOrdemServicoItens} setAtualizarOrdemServicoItens={setAtualizarOrdemServicoItens} atualizarOrdemServicoItens={atualizarOrdemServicoItens} showModalCriarOrdemServicoItens={showModalAtualizarOrdemServicoItens} setShowModalCriarOrdemServicoItens={()=>{setShowModalAtualizarOrdemServicoItens();setCadastrarOrdemServicoItens()}} callback={callback} />
			}
		</>
	)
}

export default Cadastrar;