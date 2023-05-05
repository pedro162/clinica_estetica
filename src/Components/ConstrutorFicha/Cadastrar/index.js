import React from 'react';
import useFetch from '../../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, CLIENTES_ONE_GET, GRUPOS_ALL_POST} from '../../../api/endpoints/geral.js'
import {UserContex} from '../../../Context/UserContex.js'
import FormCliente from '../FormCliente/index.js'
import Pesquisar from '../Pesquisar/index.js'
import Modal from '../../Utils/Modal/index.js'
import Load from '../../Utils/Load/index.js'

const Cadastrar = ({idRegistro, setIdRegistro, callback, atualizarCadastro, setAtualizarCadastro, cadastrarRegistro, setCadastrarRegistro})=>{

    
    const [showModalAtualizarRegistro, setShowModalAtualizarRegistro] = React.useState(false)
    const [carregando, setCarregando] = React.useState(false)
    const [dataRegistro, setDataRegistro] = React.useState(null)
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
	            setShowModalAtualizarRegistro(true)
	        }else{
	        	setDataGrupo(null)
	        }
		}
		if(cadastrarRegistro == true){
			getGrupo();
		}
		
		
	}, [cadastrarRegistro])

	/*
		atualizarCadastro && 
                <Atualizar setCarregandoDadosCliente={null} atualizarCadastro={setAtualizarCadastro} idRegistro={clientChoice} setDataRegistro={null} setShowModalCriarRegistro={setShowModalAtualizarRegistro} />
	*/
	//<Pesquisar idRegistro={idRegistro} setDataRegistro={setDataRegistro} setCarregandoDadosCliente={setCarregando} />
	return(
		<>
			{! dataGrupo &&
				<Modal noBtnCancelar={true} noBtnConcluir={true} handleConcluir={()=>null}  title={'Cadastrar Formulário'} size="xs" propsConcluir={{}} labelConcluir={''} dialogClassName={''} aria-labelledby={'aria-labelledby'} labelCanelar="" show={setShowModalAtualizarRegistro} showHide={()=>{setShowModalAtualizarRegistro();}}>
					<Load/>
				</Modal>
			}
			{dataGrupo &&
				<FormCliente dataGrupo={dataGrupo} setIdRegistro={setIdRegistro} idRegistro={idRegistro} carregando={false} dataRegistroChoice={dataRegistro} setAtualizarCadastro={setAtualizarCadastro} atualizarCadastro={atualizarCadastro} showModalCriarRegistro={showModalAtualizarRegistro} setShowModalCriarRegistro={()=>{setShowModalAtualizarRegistro();setCadastrarRegistro()}} callback={callback} />
			}
		</>
	)
}

export default Cadastrar;