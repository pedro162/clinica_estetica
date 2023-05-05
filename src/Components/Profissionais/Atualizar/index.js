import React from 'react';
import useFetch from '../../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, PROFISSIONAIS_ONE_GET, CLIENTES_ALL_POST} from '../../../api/endpoints/geral.js'
import {UserContex} from '../../../Context/UserContex.js'
import FormProfissionais from '../FormProfissionais/index.js'
import Pesquisar from '../Pesquisar/index.js'
import Modal from '../../Utils/Modal/index.js'
import Load from '../../Utils/Load/index.js'

const Atualizar = ({idProfissionais, setIdProfissionais, callback, atualizarCadastro, setAtualizarCadastro})=>{

    
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
	        console.log('All pessoas here')
	        console.log(json)
	        if(json){
	            setDataPessoa(json)
	        }else{
	        	setDataPessoa(null)
	        }
		}

		const getProfissionais = async ()=>{
			if(idProfissionais > 0){
				const {url, options} = PROFISSIONAIS_ONE_GET(idProfissionais, getToken());
				const {response, json} = await request(url, options);
				if(json){
					
					setDataProfissionais(json)
					setShowModalAtualizarProfissionais(true)
					 
		        }else{
		        	setDataProfissionais([])
		        }
			}
		}

		

		getPessoa();
		getProfissionais();
		
	}, [idProfissionais])

	/*
		atualizarCadastro && 
                <Atualizar setCarregandoDadosCliente={null} atualizarCadastro={setAtualizarCadastro} idProfissionais={clientChoice} setDataProfissionais={null} setShowModalCriarProfissionais={setShowModalAtualizarProfissionais} />
	*/
	//<Pesquisar idProfissionais={idProfissionais} setDataProfissionais={setDataProfissionais} setCarregandoDadosCliente={setCarregando} />
	return(
		<>
			{! dataProfissionais &&
				<Modal noBtnCancelar={true} noBtnConcluir={true} handleConcluir={()=>null}  title={'Atualizar Profissionais'} size="xs" propsConcluir={{}} labelConcluir={''} dialogClassName={''} aria-labelledby={'aria-labelledby'} labelCanelar="" show={setShowModalAtualizarProfissionais} showHide={()=>{setShowModalAtualizarProfissionais();}}>
					<Load/>
				</Modal>
			}
			{dataProfissionais &&
				<FormProfissionais dataPessoa={dataPessoa} setIdProfissionais={setIdProfissionais} idProfissionais={idProfissionais} carregando={false} dataProfissionaisChoice={dataProfissionais} setAtualizarCadastro={setAtualizarCadastro} atualizarCadastro={atualizarCadastro} showModalCriarProfissionais={showModalAtualizarProfissionais} setShowModalCriarProfissionais={setShowModalAtualizarProfissionais} callback={callback} />
			}
		</>
	)
}

export default Atualizar;