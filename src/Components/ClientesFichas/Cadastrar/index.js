import React from 'react';
import useFetch from '../../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, CONSULTA_ONE_GET, GRUPOS_ALL_POST} from '../../../api/endpoints/geral.js'
import {UserContex} from '../../../Context/UserContex.js'
import FormClientesFichas from '../FormClientesFichas/index.js'
import Pesquisar from '../Pesquisar/index.js'
import Modal from '../../Utils/Modal/index.js'
import Load from '../../Utils/Load/index.js'

const Cadastrar = ({idClientesFichas, setIdClientesFichas, callback, atualizarClientesFichas, setAtualizarClientesFichas, cadastrarClientesFichas, setCadastrarClientesFichas})=>{

    
    const [showModalAtualizarClientesFichas, setShowModalAtualizarClientesFichas] = React.useState(false)
    const [carregando, setCarregando] = React.useState(false)
    const [dataClientesFichas, setDataClientesFichas] = React.useState(null)
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
	            setShowModalAtualizarClientesFichas(true)
	        }else{
	        	setDataGrupo(null)
	        }
		}
		if(cadastrarClientesFichas == true){
			getGrupo();
		}
		
		
	}, [cadastrarClientesFichas])

	/*
		atualizarClientesFichas && 
                <Atualizar setCarregandoDadosClientesFichas={null} atualizarClientesFichas={setAtualizarClientesFichas} idClientesFichas={clientChoice} setDataClientesFichas={null} setShowModalCriarClientesFichas={setShowModalAtualizarClientesFichas} />
	*/
	//<Pesquisar idClientesFichas={idClientesFichas} setDataClientesFichas={setDataClientesFichas} setCarregandoDadosClientesFichas={setCarregando} />
	return(
		<>
			{! dataGrupo &&
				<Modal noBtnCancelar={true} noBtnConcluir={true} handleConcluir={()=>null}  title={'Cadastrar ClientesFichas'} size="xs" propsConcluir={{}} labelConcluir={''} dialogClassName={''} aria-labelledby={'aria-labelledby'} labelCanelar="" show={setShowModalAtualizarClientesFichas} showHide={()=>{setShowModalAtualizarClientesFichas();}}>
					<Load/>
				</Modal>
			}
			{dataGrupo &&
				<FormClientesFichas dataGrupo={dataGrupo} setIdClientesFichas={setIdClientesFichas} idClientesFichas={idClientesFichas} carregando={false} dataClientesFichasChoice={dataClientesFichas} setAtualizarClientesFichas={setAtualizarClientesFichas} atualizarClientesFichas={atualizarClientesFichas} showModalCriarClientesFichas={showModalAtualizarClientesFichas} setShowModalCriarClientesFichas={()=>{setShowModalAtualizarClientesFichas();setCadastrarClientesFichas()}} callback={callback} />
			}
		</>
	)
}

export default Cadastrar;