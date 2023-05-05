import React from 'react';
import useFetch from '../../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, CIDADE_ONE_GET, ESTADO_ALL_POST} from '../../../api/endpoints/geral.js'
import {UserContex} from '../../../Context/UserContex.js'
import FormCidade from '../FormCidade/index.js'
import Pesquisar from '../Pesquisar/index.js'
import Modal from '../../Utils/Modal/index.js'
import Load from '../../Utils/Load/index.js'

const Atualizar = ({idCidade, setIdCidade, callback, atualizarCadastro, setAtualizarCadastro})=>{

    
    const [showModalAtualizarCidade, setShowModalAtualizarCidade] = React.useState(false)
    const [carregando, setCarregando] = React.useState(false)
    const [dataCidade, setDataCidade] = React.useState(null)
    const [dataEstado, setDataEstado] = React.useState(null)
	const {getToken, dataUser} = React.useContext(UserContex);

	const {data, error, request, loading} = useFetch();
	React.useEffect(()=>{
		
		const getEstado = async ()=>{
			const {url, options} = ESTADO_ALL_POST({}, getToken());

	        const {response, json} = await request(url, options);
	        console.log('All estados here')
	        console.log(json)
	        if(json){
	            setDataEstado(json)
	        }else{
	        	setDataEstado(null)
	        }
		}

		const getCidade = async ()=>{
			if(idCidade > 0){
				const {url, options} = CIDADE_ONE_GET(idCidade, getToken());
				const {response, json} = await request(url, options);
				if(json){
					
					setDataCidade(json)
					setShowModalAtualizarCidade(true)
					 
		        }else{
		        	setDataCidade([])
		        }
			}
		}

		

		getEstado();
		getCidade();
		
	}, [idCidade])

	/*
		atualizarCadastro && 
                <Atualizar setCarregandoDadosCliente={null} atualizarCadastro={setAtualizarCadastro} idCidade={clientChoice} setDataCidade={null} setShowModalCriarCidade={setShowModalAtualizarCidade} />
	*/
	//<Pesquisar idCidade={idCidade} setDataCidade={setDataCidade} setCarregandoDadosCliente={setCarregando} />
	return(
		<>
			{! dataCidade &&
				<Modal noBtnCancelar={true} noBtnConcluir={true} handleConcluir={()=>null}  title={'Atualizar Cidade'} size="xs" propsConcluir={{}} labelConcluir={''} dialogClassName={''} aria-labelledby={'aria-labelledby'} labelCanelar="" show={setShowModalAtualizarCidade} showHide={()=>{setShowModalAtualizarCidade();}}>
					<Load/>
				</Modal>
			}
			{dataCidade &&
				<FormCidade dataEstado={dataEstado} setIdCidade={setIdCidade} idCidade={idCidade} carregando={false} dataCidadeChoice={dataCidade} setAtualizarCadastro={setAtualizarCadastro} atualizarCadastro={atualizarCadastro} showModalCriarCidade={showModalAtualizarCidade} setShowModalCriarCidade={setShowModalAtualizarCidade} callback={callback} />
			}
		</>
	)
}

export default Atualizar;