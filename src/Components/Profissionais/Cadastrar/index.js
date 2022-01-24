import React from 'react';
import useFetch from '../../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, CLIENTES_ONE_GET, CLIENTES_ALL_POST} from '../../../api/endpoints/geral.js'
import {UserContex} from '../../../Context/UserContex.js'
import FormProfissionais from '../FormProfissionais/index.js'
import Pesquisar from '../Pesquisar/index.js'
import Modal from '../../Utils/Modal/index.js'
import Load from '../../Utils/Load/index.js'

const Cadastrar = ({idProfissionais, setIdProfissionais, callback, atualizarCadastro, setAtualizarCadastro, cadastrarProfissionais, setCadastrarProfissionais})=>{

    
    const [showModalAtualizarProfissionais, setShowModalAtualizarProfissionais] = React.useState(false)
    const [carregando, setCarregando] = React.useState(false)
    const [dataProfissionais, setDataProfissionais] = React.useState(null)
    const [dataPessoa, setDataPessoa] = React.useState(null)
	const {getToken, dataUser} = React.useContext(UserContex);

	const {data, error, request, loading} = useFetch();
	React.useEffect(()=>{
		
		const getPessoa = async ()=>{
			const {url, options} = CLIENTES_ALL_POST({}, getToken());

	        const {response, json} = await request(url, options);
	        console.log('All estado here')
	        console.log(json)
	        if(json){
	            setDataPessoa(json)
	            setShowModalAtualizarProfissionais(true)
	        }else{
	        	setDataPessoa(null)
	        }
		}
		if(cadastrarProfissionais == true){
			getPessoa();
		}
		
		
	}, [cadastrarProfissionais])

	/*
		atualizarCadastro && 
                <Atualizar setCarregandoDadosCliente={null} atualizarCadastro={setAtualizarCadastro} idProfissionais={clientChoice} setDataProfissionais={null} setShowModalCriarProfissionais={setShowModalAtualizarProfissionais} />
	*/
	//<Pesquisar idProfissionais={idProfissionais} setDataProfissionais={setDataProfissionais} setCarregandoDadosCliente={setCarregando} />
	return(
		<>
			{! dataPessoa &&
				<Modal noBtnCancelar={true} noBtnConcluir={true} handleConcluir={()=>null}  title={'Cadastrar Profissionais'} size="xs" propsConcluir={{}} labelConcluir={''} dialogClassName={'modal-90w'} aria-labelledby={'aria-labelledby'} labelCanelar="" show={setShowModalAtualizarProfissionais} showHide={()=>{setShowModalAtualizarProfissionais();}}>
					<Load/>
				</Modal>
			}
			{dataPessoa &&
				<FormProfissionais dataPessoa={dataPessoa} setIdProfissionais={setIdProfissionais} idProfissionais={idProfissionais} carregando={false} dataProfissionaisChoice={dataProfissionais} setAtualizarCadastro={setAtualizarCadastro} atualizarCadastro={atualizarCadastro} showModalCriarProfissionais={showModalAtualizarProfissionais} setShowModalCriarProfissionais={()=>{setShowModalAtualizarProfissionais();setCadastrarProfissionais()}} callback={callback} />
			}
		</>
	)
}

export default Cadastrar;