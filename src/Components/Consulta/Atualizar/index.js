import React from 'react';
import useFetch from '../../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, CONSULTA_ONE_GET, GRUPOS_ALL_POST} from '../../../api/endpoints/geral.js'
import {UserContex} from '../../../Context/UserContex.js'
import FormConsulta from '../FormConsulta/index.js'
import Pesquisar from '../Pesquisar/index.js'
import Modal from '../../Utils/Modal/index.js'
import Load from '../../Utils/Load/index.js'

const Atualizar = ({idConsulta, setIdcliente, callback, atualizarCadastro, setAtualizarCadastro})=>{

    
    const [showModalAtualizarConsulta, setShowModalAtualizarConsulta] = React.useState(false)
    const [carregando, setCarregando] = React.useState(false)
    const [dataConsulta, setDataConsulta] = React.useState(null)
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
	        }else{
	        	setDataGrupo(null)
	        }
		}

		const getConsulta = async ()=>{
			if(idConsulta > 0){
				const {url, options} = CONSULTA_ONE_GET(idConsulta, getToken());
				const {response, json} = await request(url, options);
				if(json){
					
					setDataConsulta(json)
					setShowModalAtualizarConsulta(true)
					 
		        }else{
		        	setDataConsulta([])
		        }
			}
		}

		getGrupo();
		getConsulta();
		
	}, [idConsulta])

	/*
		atualizarCadastro && 
                <Atualizar setCarregandoDadosConsulta={null} atualizarCadastro={setAtualizarCadastro} idConsulta={clientChoice} setDataConsulta={null} setShowModalCriarConsulta={setShowModalAtualizarConsulta} />
	*/
	//<Pesquisar idConsulta={idConsulta} setDataConsulta={setDataConsulta} setCarregandoDadosConsulta={setCarregando} />
	return(
		<>
			{! dataConsulta &&
				<Modal noBtnCancelar={true} noBtnConcluir={true} handleConcluir={()=>null}  title={'Atualizar Consulta'} size="xs" propsConcluir={{}} labelConcluir={''} dialogClassName={'modal-90w'} aria-labelledby={'aria-labelledby'} labelCanelar="" show={setShowModalAtualizarConsulta} showHide={()=>{setShowModalAtualizarConsulta();}}>
					<Load/>
				</Modal>
			}
			{dataConsulta &&
				<FormConsulta dataGrupo={dataGrupo} setIdcliente={setIdcliente} idConsulta={idConsulta} carregando={false} dataConsultaChoice={dataConsulta} setAtualizarCadastro={setAtualizarCadastro} atualizarCadastro={atualizarCadastro} showModalCriarConsulta={showModalAtualizarConsulta} setShowModalCriarConsulta={setShowModalAtualizarConsulta} callback={callback} />
			}
		</>
	)
}

export default Atualizar;