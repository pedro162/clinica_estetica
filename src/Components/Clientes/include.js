import React from 'react';
import estilos from './Clientes.module.css'
import useFetch from '../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, CLIENTES_ALL_POST} from '../../api/endpoints/geral.js'
import {Col, Row } from 'react-bootstrap';
import Table from '../Relatorio/Table/index.js'
import Filter from '../Relatorio/Filter/index.js'
import Breadcrumbs from '../Helper/Breadcrumbs.js'
import { faHome, faSearch, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from '../Utils/Modal/index.js'
import Load from '../Utils/Load/index.js'
import Cadastrar from './Cadastrar/index.js'
import Atualizar from './Atualizar/index.js'
import Ficha from './Ficha/index.js'
import CadastrarFicha from '../ClientesFichas/Cadastrar/index.js'
import {UserContex} from '../../Context/UserContex.js'
import FormCliente from './FormCliente/index.js'


const Include = ({dataEstado, loadingData, callBack, setMostarFiltros, idOrdemCriada, ...props})=>{

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
    const [ficha, setFicha] = React.useState(false)      
    const [cadastrarFicha, setCadastrarFicha] = React.useState(false)    
    const [dataGrupo, setDataGrupo] = React.useState(null)
    const [acao, setAcao] = React.useState(null)


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
                                {acao:()=>novoAtendimento(atual.id), label:'Atendimento', propsOption:{}, propsLabel:{}},
                                {acao:()=>cadastrarFichaAtendimento(atual.id), label:'Gerar ficha', propsOption:{}, propsLabel:{}},
                                {acao:()=>fichaAtendimento(atual.id), label:'Ficha', propsOption:{}, propsLabel:{}},
                                {acao:()=>alert('Agenda qui: '+(atual.id)), label:'Agenda', propsOption:{}, propsLabel:{}},
                                {acao:()=>alert('Histórico de atentimentos: '+(atual.id)), label:'Histórico de atendimentos', propsOption:{}, propsLabel:{}},
                                {acao:()=>alert('Central do cliente: '+(atual.id)), label:'Central do cliente', propsOption:{}, propsLabel:{}},
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
        setAtualizarCadastro(true);
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
    

    React.useEffect(()=>{
        setClientes(dataEstado)
    }, [dataEstado])
    
    const rowsTableArr = gerarTableClientes();    
    const titulosTableArr = gerarTitleTable();
	return(
		<>

            <Row>
                
                <Col  xs="12" sm="12" md="12">
                    <Table
                        titulosTableArr={titulosTableArr}
                        rowsTableArr={rowsTableArr}
                        loading={loadingData}
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
                <Atualizar marcarConsulta={marcarConsulta} setMarcarConsulta={setMarcarConsulta}  idCliente={clientChoice} setIdcliente={setClienteChoice} callback={requestAllClients} />
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
