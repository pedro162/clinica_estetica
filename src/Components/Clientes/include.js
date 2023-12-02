import React from 'react';
import estilos from './Clientes.module.css'
import useFetch from '../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, CLIENTES_ALL_POST} from '../../api/endpoints/geral.js'
import {Col, Row } from 'react-bootstrap';
import Table from '../Relatorio/Table/index.js'
import Filter from '../Relatorio/Filter/index.js'
import Breadcrumbs from '../Helper/Breadcrumbs.js'
import { faHome, faSearch, faPlus, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from '../Utils/Modal/index.js'
import ListMobile from '../Relatorio/ListMobile/index.js'
import Load from '../Utils/Load/index.js'
import Cadastrar from './Cadastrar/index.js'
import Atualizar from './Atualizar/index.js'
import Consulta from '../Consulta/index.js'
import CadastrarConsulta from '../Consulta/Cadastrar/index.js'
import Ficha from './Ficha/index.js'
import CadastrarFicha from '../ClientesFichas/Cadastrar/index.js'
import {UserContex} from '../../Context/UserContex.js'
import FormCliente from './FormCliente/index.js'
import Home from '../Home/index.js'


const Include = ({dataEstado, loadingData, nadaEncontrado, callBack, setMostarFiltros, idOrdemCriada, ...props})=>{

	const {data, error, request, loading} = useFetch();
    const [clientes, setClientes] = React.useState([])
    const [exemplos, setExemplos] = React.useState([])
    const [exemplosTitleTable, setExemplosTitleTable] = React.useState([])
    const [showModalCriarCliente, setShowModalCriarCliente] = React.useState(false)
    const [showModalAtualizarCliente, setShowModalAtualizarCliente] = React.useState(false)
    const [clientChoice, setClienteChoice] = React.useState(null);
    const [atualizarCadastro, setAtualizarCadastro] = React.useState(false)    
    const [cadastrarCliente, setCadastrarCliente] = React.useState(false)     
    const [marcarConsulta, setMarcarConsulta] = React.useState(false)     
    const [visualizarConsultas, setVisualizarConsultas] = React.useState(false)  
    const [ficha, setFicha] = React.useState(false)      
    const [cadastrarFicha, setCadastrarFicha] = React.useState(false)    
    const [dataGrupo, setDataGrupo] = React.useState(null)
    const [acao, setAcao] = React.useState(null)
    const [defaultFiltersConsulta, setDefaultFiltersConsulta] = React.useState({})
    const [defaultFiltersAgendaCalendario, setDefaultFiltersAgendaCalendario] = React.useState({})
    const [visualizarCalendarioAgenda, setVisualizarCalendarioAgenda] = React.useState(false)  

    //nadaEncontrado
    const {getToken} = React.useContext(UserContex);

    const alerta = (target)=>{
        console.log(target)
    }

    const gerarTableClientes = ()=>{
       
        let data = [];
        let dataClientes = clientes.mensagem
        if(dataClientes && Array.isArray(dataClientes) && dataClientes.length > 0){
            for(let i=0; !(i == dataClientes.length); i++){
                let atual = dataClientes[i];
                if(atual){

                    data.push(

                        {
                            propsRow:{id:(atual.id)},
                            acoes:[
                                {acao:()=>atualizarCliente(atual.id), label:'Editar', propsOption:{}, propsLabel:{}},
                                {acao:()=>novoAtendimento(atual.id), label:'Novo atendimento', propsOption:{}, propsLabel:{}},
                                {acao:()=>consultaTodosAtendimentos(atual.id), label:'Histórico de atendimentos', propsOption:{}, propsLabel:{}},
                                {acao:()=>cadastrarFichaAtendimento(atual.id), label:'Nova ficha', propsOption:{}, propsLabel:{}},
                                {acao:()=>fichaAtendimento(atual.id), label:'Visualizar ficha', propsOption:{}, propsLabel:{}},
                                {acao:()=>consultaAgendaCalendario(atual.id), label:'Calendário da agenda', propsOption:{}, propsLabel:{}},
                                //{acao:()=>alert('Histórico de atentimentos: '+(atual.id)), label:'Histórico de atendimentos', propsOption:{}, propsLabel:{}},
                                //{acao:()=>alert('Central do cliente: '+(atual.id)), label:'Central do cliente', propsOption:{}, propsLabel:{}},
                            ],
                            celBodyTableArr:[
                                {

                                    label:atual.id,
                                    propsRow:{}
                                },
                                {

                                    label:atual.name,
                                    propsRow:{}
                                },
                                {

                                    label:atual.name_opcional,
                                    propsRow:{}
                                },
                                {

                                    label:atual.email,
                                    propsRow:{}
                                },
                                {

                                    label:atual.sexo,
                                    propsRow:{}
                                }
                            ]
                        }

                    )

                }

            }
        }

        return data;
    }

    const gerarTitleTable = ()=>{
        let tableTitle = [
            {
                label:'Código',
                props:{}
            },
            {
                label:'Nome',
                props:{}
            },
            {
                label:'Sobremone',
                props:{}
            },
            {
                label:'Email',
                props:{}
            },
            {
                label:'Sexo',
                props:{}
            },
        ]

        return tableTitle;
    }


    const gerarListMobileRelatorio = ()=>{
       
        let data = [];
        let dataClientes = clientes.mensagem
        if(dataClientes && Array.isArray(dataClientes) && dataClientes.length > 0){
            for(let i=0; !(i == dataClientes.length); i++){
                let atual = dataClientes[i];
                if(atual){
                    let acoesArr = [
                        {acao:()=>atualizarCliente(atual.id), label:'Editar', propsOption:{}, propsLabel:{}},
                        {acao:()=>novoAtendimento(atual.id), label:'Novo atendimento', propsOption:{}, propsLabel:{}},
                        {acao:()=>consultaTodosAtendimentos(atual.id), label:'Histórico de atendimentos', propsOption:{}, propsLabel:{}},
                        {acao:()=>cadastrarFichaAtendimento(atual.id), label:'Nova ficha', propsOption:{}, propsLabel:{}},
                        {acao:()=>fichaAtendimento(atual.id), label:'Visualizar ficha', propsOption:{}, propsLabel:{}},
                        {acao:()=>consultaAgendaCalendario(atual.id), label:'Calendário da agenda', propsOption:{}, propsLabel:{}},
                    ];
                    let btnEditar                   = true;
                    let btnIniciarProcedimento      = true;
                    let btnFinalizar                = true;
                    let btnVisualizarFinanceiro     = true;
                    let btnVisualizar               = true;
                    let btnCotinuarDigitacao        = true;
                    let btnCancelar                 = true;

                    

                    let line_style = {}
                    /*if(atual.status == 'cancelado'){
                        line_style.color = 'red';
                    }else if(atual.status == 'concluido'){
                        line_style.color = 'green';
                    } */

                    //propsContainerTitulo, propsContainerButtons
                    data.push(

                        {
                            propsRow:{id:(atual.id), titleRow:atual?.name},
                            acoes:[
                                ...acoesArr
                            ],
                            title:<> <div style={{display:'flex', justifyContent:'space-between',fontSize:'18pt', fontWeight:'bolder'}} ><span><FontAwesomeIcon size={'lg'} icon={faUserCircle}/> {atual?.name} </span> </div> </>,
                            propsContainerTitulo:{md:'11', sm:'9', xs:'9'},
                            propsContainerButtons:{md:'1', sm:'4', xs:'2'},
                            acoesBottomCard:[
                              
                            ],
                            celBodyTableArr:[
                                [
                                    
                                    {
                                        title:<span style={{fontWeight:'480'}}>Cpf: </span>,
                                        label:atual?.documento,
                                        props:{style:{textAlign:'left'}},
                                        toSum:1,
                                        isCoin:1,
                                    },
                                    {
                                        title:<span style={{fontWeight:'480'}}>Contato: </span>,
                                        label:'(99)99999-9999',
                                        props:{style:{textAlign:'left'}},
                                        toSum:1,
                                        isCoin:1,
                                    },

                                ],
                                
                               
                               
                            ]
                        }

                    )

                }

            }
        }

        return data;
    }
    //------------

    const requestAllClients = async() =>{
       
        const {url, options} = CLIENTES_ALL_POST({}, getToken());


        const {response, json} = await request(url, options);
        console.log('All clients here')
        console.log(json)
        if(json){
               setClientes(json)
        }

            
    }

    React.useEffect(()=>{
        switch(acao){
            case 'editar':
                if(clientChoice > 0){
                    setAtualizarCadastro(true);
                }else{
                    setAtualizarCadastro(false);
                }
                break;
            case 'consultar':
                if(clientChoice > 0){
                    setMarcarConsulta(true);
                }else{
                    setMarcarConsulta(false);
                }
            break;
            case 'consultas':
                if(clientChoice > 0){
                    setVisualizarConsultas(true);
                }else{
                    setVisualizarConsultas(false);
                }
            break;
            case 'ficha':
                if(clientChoice > 0){
                    setFicha(true);
                }else{
                    setFicha(false);
                }
            break;
            case 'cadastrar_ficha':
                if(clientChoice > 0){
                    setCadastrarFicha(true);
                }else{
                    setCadastrarFicha(false);
                }
            break;            
            case 'agenda_calendario':
                if(clientChoice > 0){
                    setVisualizarCalendarioAgenda(true);
                }else{
                    setVisualizarCalendarioAgenda(false);
                }
            break;
            default:
                setAtualizarCadastro(false);
                setMarcarConsulta(false);
                setFicha(false);
                break;

        }
        
    }, [clientChoice, acao])
    

    const atualizarCliente = (idCliente)=>{
        setClienteChoice(idCliente)
        setAcao('editar')
        setAtualizarCadastro(true);
    }

    const novoAtendimento = (idCliente)=>{
        setClienteChoice(idCliente)
        setAcao('consultar')
        setMarcarConsulta(true);
    }

    const consultaTodosAtendimentos = (idCliente)=>{
        setClienteChoice(idCliente)
        setAcao('consultas')
        setVisualizarConsultas(true);
    }

    const fichaAtendimento = (idCliente)=>{
        setClienteChoice(idCliente)
        setAcao('ficha')
        setFicha(true);
    }

    const cadastrarFichaAtendimento = (idCliente)=>{
        setClienteChoice(idCliente)
        setAcao('cadastrar_ficha')
        setCadastrarFicha(true);
    }

    const consultaAgendaCalendario = (idCliente)=>{
        setClienteChoice(idCliente)
        setAcao('agenda_calendario')
        setVisualizarCalendarioAgenda(true);
    }
    
    
    React.useEffect(()=>{
        setClientes(dataEstado)
    }, [dataEstado])
    
    const rowsTableArr = gerarTableClientes();    
    const titulosTableArr = gerarTitleTable();
	return(
		<>

            <Row>
                <Col  xs="12" sm="12" md="12" className={'mobile_card_report py-4'}  style={{backgroundColor:'#FFF',}}>

                   
                    
                    <ListMobile
                        titulosTableArr={null}
                        rowsTableArr={gerarListMobileRelatorio()}
                        loading={loadingData}
                        nadaEncontrado={nadaEncontrado}
                        botoesHeader={[{acao:()=>setMostarFiltros(mostar=>!mostar), label:'', propsAcoes:{className:'btn btn-sm btn-secondary', style:{'justifyContent': 'flex-end'}}, icon:<FontAwesomeIcon icon={faSearch} /> }]}
                    />

                    {
                    /*
                    <CardMobile
                        titulosTableArr={null}
                        rowsTableArr={gerarCardContasReceber()}
                        loading={loadingData}
                        botoesHeader={[{acao:()=>setMostarFiltros(mostar=>!mostar), label:'', propsAcoes:{className:'btn btn-sm btn-secondary', style:{'justifyContent': 'flex-end'}}, icon:<FontAwesomeIcon icon={faSearch} /> }]}
                    />
                    */
                    }
                </Col>

                <Col  xs="12" sm="12" md="12"  className={'default_card_report'}>
                    <Table
                        titulosTableArr={titulosTableArr}
                        rowsTableArr={rowsTableArr}
                        loading={loadingData}
                        nadaEncontrado={nadaEncontrado}
                        botoesHeader={[{acao:()=>setMostarFiltros(mostar=>!mostar), label:'', propsAcoes:{className:'btn btn-sm btn-secondary', style:{'justifyContent': 'flex-end'}}, icon:<FontAwesomeIcon icon={faSearch} /> }]}

                    />
                </Col>
            </Row>
           
            {
                atualizarCadastro &&
                <Atualizar atualizarCadastro={atualizarCadastro} setAtualizarCadastro={setAtualizarCadastro}  idCliente={clientChoice} setIdcliente={setClienteChoice} callback={requestAllClients} />
            }

            {
                marcarConsulta && 
                <CadastrarConsulta  cadastrarConsulta={marcarConsulta} setCadastrarConsulta={setMarcarConsulta} atualizarConsulta={null} setAtualizarConsulta={()=>null}  idConsulta={clientChoice} setIdConsulta={setClienteChoice} callback={()=>{setAcao(null);requestAllClients();setMarcarConsulta(false)}}  />
            }
            
            {
                visualizarConsultas &&
                <Modal noBtnCancelar={false} noBtnConcluir={true} handleConcluir={()=>null}  title={'Atendimentos'} size="lg" propsConcluir={{}} labelConcluir={''} dialogClassName={'modal-90w'} aria-labelledby={'aria-labelledby'} labelCanelar="Fechar" show={visualizarConsultas} showHide={()=>{setVisualizarConsultas(false);setAcao(null)}}>
					
                    <Consulta defaultFilters={defaultFiltersConsulta} visualizarConsultas={visualizarConsultas} setVisualizarConsultas={setVisualizarConsultas}  idReferencia={null} referencia={''}  idCliente={null} setIdcliente={null} callback={()=>{setAcao(null);callBack();setVisualizarConsultas(false)}} />
                
				</Modal>
            }


            {
                visualizarCalendarioAgenda &&
                <Modal noBtnCancelar={false} noBtnConcluir={true} handleConcluir={()=>null}  title={'Calendário da agenda'} size="lg" propsConcluir={{}} labelConcluir={''} dialogClassName={'modal-90w'} aria-labelledby={'aria-labelledby'} labelCanelar="Fechar" show={visualizarCalendarioAgenda} showHide={()=>{setVisualizarCalendarioAgenda(false);setAcao(null);setClienteChoice(null)}}>
					
                    <Home defaultFilters={defaultFiltersAgendaCalendario} visualizarCalendarioAgenda={visualizarCalendarioAgenda} setVisualizarCalendarioAgenda={setVisualizarCalendarioAgenda}  setAtualizarCadastro={setAtualizarCadastro} idReferencia={null} referencia={null}  clientChoice={clientChoice} setClienteChoice={setClienteChoice} callback={callBack} />
                
				</Modal>
            }

            {
                ficha &&
                <Ficha ficha={ficha} setFicha={setFicha}  idCliente={clientChoice} setIdcliente={setClienteChoice} callback={requestAllClients} />
            }

            {
                cadastrarFicha &&
                <CadastrarFicha  cadastrarClientesFichas={cadastrarFicha} setCadastrarFicha={atualizarCadastro} setCadastrarClientesFichas={setCadastrarFicha} atualizarClientesFichas={setCadastrarFicha} setAtualizarClientesFichas={setAtualizarCadastro} setIdClientesFichas={setClienteChoice} callback={requestAllClients} />
            }

         </>

	)
}

export default Include;

//<FormCliente dataGrupo={dataGrupo} dataClienteChoice={[]}  atualizarCadastro={false} setAtualizarCadastro={setAtualizarCadastro}  idCliente={null} setIdcliente={setClienteChoice}  showModalCriarCliente={showModalCriarCliente} setShowModalCriarCliente={setShowModalCriarCliente} callback={requestAllClients} />
