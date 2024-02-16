import React from 'react';
import useFetch from '../../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, CONSULTA_ONE_GET, GRUPOS_ALL_POST, PROFISSIONAIS_ALL_POST, ESPECIALIDADE_ALL_POST, PROFISSIONAL_HORARIOS_ALL_POST, PROFISSIONAL_DIAS_EXPEDIENTE_ALL_POST} from '../../../api/endpoints/geral.js'
import {UserContex} from '../../../Context/UserContex.js'
import FormConsultaExterno from '../FormConsulta/FormConsultaExterno.js'
import Pesquisar from '../Pesquisar/index.js'
import Modal from '../../Utils/Modal/index.js'
import Load from '../../Utils/Load/index.js'

const CadastroExterno = ({idConsulta, setIdConsulta, callback, atualizarConsulta, setAtualizarConsulta, cadastrarConsulta, setCadastrarConsulta})=>{

    
    const [showModalAtualizarConsulta, setShowModalAtualizarConsulta] = React.useState(false)
    const [carregando, setCarregando] = React.useState(false)
    const [dataConsulta, setDataConsulta] = React.useState(null)
    const [dataGrupo, setDataGrupo] = React.useState(null)
    const [dataProfissionais, setProfissionais] = React.useState(null)
    const [dataEspecializacoes, setEspecializacoes] = React.useState(null)
    const [dataProfissionalHorarios, setDataProfissionalHorarios] = React.useState(null)
    const [dataProfissionalDiasExprediente, setDataProfissionalDiasExprediente] = React.useState(null)
	const {getToken, dataUser} = React.useContext(UserContex);

	const {data, error, request, loading} = useFetch();
	React.useEffect(()=>{
		
		const getProfissionais = async ()=>{
			const {url, options} = PROFISSIONAIS_ALL_POST({}, getToken());
			const {response, json} = await request(url, options);
			if(json){
				
				setProfissionais(json)
				//setShowModalAtualizarProfissionais(true)
				 //s
	        }else{
	        	setProfissionais([])
	        }
		}

		const getProfissionalHorarios = async ()=>{
			const {url, options} = PROFISSIONAL_HORARIOS_ALL_POST({}, getToken());
			const {response, json} = await request(url, options);
			if(json){
				
				setDataProfissionalHorarios(json)
				//setShowModalAtualizarProfissionais(true)
				 //s
	        }else{
	        	setDataProfissionalHorarios([])
	        }
		}


		const getProfissionalDiaExpediente = async ()=>{
			const {url, options} = PROFISSIONAL_DIAS_EXPEDIENTE_ALL_POST({}, getToken());
			const {response, json} = await request(url, options);
			if(json){
				
				setDataProfissionalDiasExprediente(json)
				//setShowModalAtualizarProfissionais(true)
				 //s
	        }else{
	        	setDataProfissionalDiasExprediente([])
	        }
		}

		//

		const getProEspecializacoes = async ()=>{
			const {url, options} = ESPECIALIDADE_ALL_POST({}, getToken());
			const {response, json} = await request(url, options);
			if(json){
				
				setEspecializacoes(json)
				//setShowModalAtualizarProfissionais(true)
				 //setShowModalAtualizarConsulta(true)
	        }else{
	        	setEspecializacoes([])
	        }
		}

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
		if(cadastrarConsulta == true){
			getGrupo();
		}
		getProfissionais();
		//getProEspecializacoes();
		//getProfissionalHorarios();	
		//getProfissionalDiaExpediente();		

		setShowModalAtualizarConsulta(true)
		
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
				<FormConsultaExterno dataProfissionalDiasExprediente={dataProfissionalDiasExprediente} dataProfissionalHorarios={dataProfissionalHorarios} dataProfissionais={dataProfissionais} dataEspecializacoes={dataEspecializacoes} dataGrupo={dataGrupo} setIdConsulta={setIdConsulta} idConsulta={idConsulta} carregando={false} dataConsultaChoice={dataConsulta} setAtualizarConsulta={setAtualizarConsulta} atualizarConsulta={atualizarConsulta} showModalCriarConsulta={showModalAtualizarConsulta} setShowModalCriarConsulta={()=>{setShowModalAtualizarConsulta();setCadastrarConsulta()}} callback={callback} />
			}
		</>
	)
}

export default CadastroExterno;