import React from 'react';
import useFetch from '../../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, CONSULTA_ONE_GET, GRUPOS_ALL_POST, PROFISSIONAIS_ALL_POST, ESPECIALIDADE_ALL_POST, PROFISSIONAL_HORARIOS_ALL_POST, PROFISSIONAL_DIAS_EXPEDIENTE_ALL_POST} from '../../../api/endpoints/geral.js'
import {UserContex} from '../../../Context/UserContex.js'
import FormFormaPagamentoExterno from '../FormFormaPagamento/FormFormaPagamentoExterno.js'
import Pesquisar from '../Pesquisar/index.js'
import Modal from '../../Utils/Modal/index.js'
import Load from '../../Utils/Load/index.js'
import {Col, Row, Button } from 'react-bootstrap';
import Breadcrumbs from '../../Helper/Breadcrumbs.js'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const CadastrarExternoSimples = ({idFormaPagamento, setIdFormaPagamento, callback, atualizarFormaPagamento, setAtualizarFormaPagamento, cadastrarFormaPagamento, setCadastrarFormaPagamento})=>{

    
    const [showModalAtualizarFormaPagamento, setShowModalAtualizarFormaPagamento] = React.useState(false)
    const [carregando, setCarregando] = React.useState(false)
    const [dataFormaPagamento, setDataFormaPagamento] = React.useState(null)
    const [dataGrupo, setDataGrupo] = React.useState(null)
    const [dataProfissionais, setProfissionais] = React.useState(null)
    const [dataEspecializacoes, setEspecializacoes] = React.useState(null)
    const [dataProfissionalHorarios, setDataProfissionalHorarios] = React.useState(null)
    const [dataProfissionalDiasExprediente, setDataProfissionalDiasExprediente] = React.useState(null)
	const {getToken, dataUser, historyUser} = React.useContext(UserContex);

	const {data, error, request, loading} = useFetch();
	React.useEffect(()=>{
		
		const getProfissionais = async ()=>{
			const {url, options} = PROFISSIONAIS_ALL_POST({}, getToken());
			const {response, json} = await request(url, options);
			
			if(json){				
				setProfissionais(json)
	        }else{
	        	setProfissionais([])
	        }
		}

		const getProfissionalHorarios = async ()=>{
			const {url, options} = PROFISSIONAL_HORARIOS_ALL_POST({}, getToken());
			const {response, json} = await request(url, options);
			
			if(json){
				
				setDataProfissionalHorarios(json)
	        }else{
	        	setDataProfissionalHorarios([])
	        }
		}


		const getProfissionalDiaExpediente = async ()=>{
			const {url, options} = PROFISSIONAL_DIAS_EXPEDIENTE_ALL_POST({}, getToken());
			const {response, json} = await request(url, options);
			
			if(json){
				
				setDataProfissionalDiasExprediente(json)
	        }else{
	        	setDataProfissionalDiasExprediente([])
	        }
		}

		const getProEspecializacoes = async ()=>{
			const {url, options} = ESPECIALIDADE_ALL_POST({}, getToken());
			const {response, json} = await request(url, options);
			
			if(json){
				
				setEspecializacoes(json)
	        }else{
	        	setEspecializacoes([])
	        }
		}

		const getGrupo = async ()=>{
			const {url, options} = GRUPOS_ALL_POST({}, getToken());
	        const {response, json} = await request(url, options);
	        
	        if(json){
	            setDataGrupo(json)
	            
	        }else{
	        	setDataGrupo(null)
	        }
		}

		if(cadastrarFormaPagamento == true){
			getGrupo();
		}

		getProfissionais();
		setShowModalAtualizarFormaPagamento(true)
		
	}, [cadastrarFormaPagamento])

	const loadFormaPagamentos = ()=>{
		historyUser.push('/consulta/index');		
	}

	return(
		<>
            <Breadcrumbs
                items={[
                        {
                            props:{},
                            label:<> <Link className={null}  to={'/'}>Início</Link></>
                        },
                        {
                            props:{},
                            label:'Forma de Pagamento'
                        }
                    ]}
                buttonFiltroMobile={true}
                setMostarFiltros={()=>null}
                mostarFiltros={false}
            />
            <Row className={'mobile_card_report pb-4'}  style={{backgroundColor:'#FFF', minHeight:'100vh'}}>
                
                 <Col  xs="12" sm="12" md={12}>
				    <FormFormaPagamentoExterno noUseModal={true} dataProfissionalDiasExprediente={dataProfissionalDiasExprediente} dataProfissionalHorarios={dataProfissionalHorarios} dataProfissionais={dataProfissionais} dataEspecializacoes={dataEspecializacoes} dataGrupo={dataGrupo} setIdFormaPagamento={setIdFormaPagamento} idFormaPagamento={idFormaPagamento} carregando={false} dataFormaPagamentoChoice={dataFormaPagamento} setAtualizarFormaPagamento={setAtualizarFormaPagamento} atualizarFormaPagamento={atualizarFormaPagamento} showModalCriarFormaPagamento={showModalAtualizarFormaPagamento} setShowModalCriarFormaPagamento={()=>{setShowModalAtualizarFormaPagamento();setCadastrarFormaPagamento()}} callback={loadFormaPagamentos} />
                </Col>
            </Row>
		</>
	)
}

export default CadastrarExternoSimples;