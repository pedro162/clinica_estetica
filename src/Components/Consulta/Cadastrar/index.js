import React from 'react';
import useFetch from '../../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, CONSULTA_ONE_GET, GRUPOS_ALL_POST} from '../../../api/endpoints/geral.js'
import {UserContex} from '../../../Context/UserContex.js'
import FormConsulta from '../FormConsulta/index.js'
import Pesquisar from '../Pesquisar/index.js'
import Modal from '../../Utils/Modal/index.js'
import Load from '../../Utils/Load/index.js'

const Cadastrar = ({idConsulta, setIdConsulta, callback, atualizarConsulta, setAtualizarConsulta, cadastrarConsulta, setCadastrarConsulta})=>{

    
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
	            setShowModalAtualizarConsulta(true)
	        }else{
	        	setDataGrupo(null)
	        }
		}
		if(cadastrarConsulta == true){
			getGrupo();
		}
		
		
	}, [cadastrarConsulta])

	/*
		atualizarConsulta && 
                <Atualizar setCarregandoDadosConsulta={null} atualizarConsulta={setAtualizarConsulta} idConsulta={clientChoice} setDataConsulta={null} setShowModalCriarConsulta={setShowModalAtualizarConsulta} />
	*/
	//<Pesquisar idConsulta={idConsulta} setDataConsulta={setDataConsulta} setCarregandoDadosConsulta={setCarregando} />
	return(
		<>
			{! dataGrupo &&
				<Modal noBtnCancelar={true} noBtnConcluir={true} handleConcluir={()=>null}  title={'Cadastrar atendimento'} size="log" propsConcluir={{}} labelConcluir={''} dialogClassName={''} aria-labelledby={'aria-labelledby'} labelCanelar="" show={setShowModalAtualizarConsulta} showHide={()=>{setShowModalAtualizarConsulta();}}>
					<Load/>
				</Modal>
			}
			{dataGrupo &&
				<FormConsulta dataGrupo={dataGrupo} setIdConsulta={setIdConsulta} idConsulta={idConsulta} carregando={false} dataConsultaChoice={dataConsulta} setAtualizarConsulta={setAtualizarConsulta} atualizarConsulta={atualizarConsulta} showModalCriarConsulta={showModalAtualizarConsulta} setShowModalCriarConsulta={()=>{setShowModalAtualizarConsulta();setCadastrarConsulta()}} callback={callback} />
			}
		</>
	)
}

export default Cadastrar;