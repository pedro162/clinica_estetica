import React from 'react'
import estilos from './ContasReceber.module.css'
import useFetch from '../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, ORDEM_SERVICO_ALL_POST} from '../../api/endpoints/geral.js'
import {FORMAT_DATA_PT_BR} from '../../functions/index.js'
import {Col, Row } from 'react-bootstrap';
import Table from '../Relatorio/Table/index.js'
import Filter from '../Relatorio/Filter/index.js'
import Breadcrumbs from '../Helper/Breadcrumbs.js'
import { faHome, faSearch, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from '../Utils/Modal/index.js'
import Load from '../Utils/Load/index.js'
import {UserContex} from '../../Context/UserContex.js'
import FormContasReceber from './FormContasReceber/index.js'
import Cadastrar from './Cadastrar/index.js'
import Atualizar from './Atualizar/index.js'
import {FORMAT_CALC_COD, FORMAT_MONEY} from '../../functions/index.js'


const Include = ({dataEstado, loadingData, callBack, setMostarFiltros, ...props})=>{
    const {data, error, request, loading} = useFetch();
    const [estado, setContasReceber] = React.useState([])
    const [exemplos, setExemplos] = React.useState([])
    const [exemplosTitleTable, setExemplosTitleTable] = React.useState([])
    const [showModalCriarContasReceber, setShowModalCriarConstula] = React.useState(false)
    const [consultaChoice, setContasReceberChoice] = React.useState(null);
    const [atualizarContasReceber, setAtualizarContasReceber] = React.useState(false)   
    const [cancelarContasReceber, setCancelarContasReceber] = React.useState(false)   
    const [digitarContasReceber, setDigitarContasReceber] = React.useState(false)    
    const [cadastrarContasReceber, setCadastrarContasReceber] = React.useState(false)  
    const [incicarContasReceber, setIniciarContasReceber] = React.useState(false) 
    const [acao, setAcao] = React.useState(null)
    const [pessoa, setPessoa] = React.useState('')


    const {getToken} = React.useContext(UserContex);

    const alerta = (target)=>{
        console.log(target)
    }

    const setNamePessoa = ({target})=>{
        
        setPessoa(target.value)
    }

    const filtersArr = [
        {
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Pessoa',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"6",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm",'name':pessoa,onChange:setNamePessoa,    onBlur:setNamePessoa},

        },
        {
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Contato',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"6",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm",'name_atendido':pessoa,onChange:setNamePessoa,    onBlur:setNamePessoa},

        },
        {
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Status',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"6",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm",'status':pessoa,onChange:setNamePessoa,    onBlur:setNamePessoa},

        },
        {
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Tipo',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"6",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm",'tipo':pessoa,onChange:setNamePessoa,    onBlur:setNamePessoa},

        },
        {
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Dt. inicio',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"6",className:'mb-2'},
            atributsFormControl:{'type':'date', size:"sm",'dt_inico':pessoa,onChange:setNamePessoa,    onBlur:setNamePessoa},

        },
        {
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Dt. fim',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"6",className:'mb-2'},
            atributsFormControl:{'type':'date', size:"sm",'dt_fim':pessoa,onChange:setNamePessoa,    onBlur:setNamePessoa},

        },
    ]

    const acoesBottomCard=[{
        label:'Pesquisar',
        icon:<FontAwesomeIcon icon={faSearch} />,
        props:{onClick:()=>requestAllContasRecebers(), className:'btn btn-sm botao_success'}
    },
    {
        label:'Cadastrar',
        icon:<FontAwesomeIcon icon={faPlus} />,
        props:{onClick:()=>setIniciarContasReceber(true), className:'btn btn-sm mx-2 btn-secondary'}
    }
    ];


    React.useEffect(()=>{
        switch(acao){
            case 'editar':
                if(consultaChoice > 0){
                    setAtualizarContasReceber(true);
                }else{
                    setAtualizarContasReceber(false);
                }
                break;
            case 'cancelar':
                if(consultaChoice > 0){
                    setCancelarContasReceber(true);
                }else{
                    setCancelarContasReceber(false);
                }
                break;
            case 'digitar':
                if(consultaChoice > 0){
                    setDigitarContasReceber(true);
                }else{
                    setDigitarContasReceber(false);
                }
                break;
            case 'visualizar':
                if(consultaChoice > 0){
                    setDigitarContasReceber(true);
                }else{
                    setDigitarContasReceber(false);
                }
                break;
            case 'iniciar_procedimento':
                if(consultaChoice > 0){
                    setDigitarContasReceber(true);
                }else{
                    setDigitarContasReceber(false);
                }
                break;
            
            case 'finalizar_procedimento':
                if(consultaChoice > 0){
                    setDigitarContasReceber(true);
                }else{
                    setDigitarContasReceber(false);
                }
                break;        
            case 'contas_receber':
                if(consultaChoice > 0){
                    setDigitarContasReceber(true);
                }else{
                    setDigitarContasReceber(false);
                }
                break;
            default://
                
                break;

        }
        
    }, [consultaChoice, acao])

    React.useEffect(()=>{

        if(cadastrarContasReceber == true){
            setShowModalCriarConstula(true);
        }else{
            setShowModalCriarConstula(false);
        }

        
    }, [cadastrarContasReceber])

    const atualizarContasReceberAction = (idContasReceber)=>{
        setContasReceberChoice(idContasReceber)
        setAcao('editar')
        setAtualizarContasReceber(true);
    }

    const digitarContasReceberAction = (idContasReceber)=>{
        setContasReceberChoice(idContasReceber)
        setAcao('digitar')
        setAtualizarContasReceber(true);
    }

    const cancelarContasReceberAction = (idContasReceber)=>{
        setContasReceberChoice(idContasReceber)
        setAcao('cancelar')
        setCancelarContasReceber(true);
    }
    //cancelarContasReceber, setCancelarContasReceber
    const novaContasReceber = (idContasReceber)=>{
        setContasReceberChoice(idContasReceber)
        setAcao('consultar')
        setAtualizarContasReceber(true);
    }

    const iniciarContasReceber = (idContasReceber)=>{
        setIniciarContasReceber(idContasReceber)
        setAcao('iniciar')
        setIniciarContasReceber(true);
    }

    const gerarTableContasReceber = ()=>{
       
        let data = [];
        let dataContasReceber = estado.mensagem
        if(dataContasReceber && Array.isArray(dataContasReceber) && dataContasReceber.length > 0){
            for(let i=0; !(i == dataContasReceber.length); i++){
                let atual = dataContasReceber[i];
                if(atual){
                    let acoesArr = [];
                    let btnEditar                   = true;
                    let btnIniciarProcedimento      = true;
                    let btnFinalizar                = true;
                    let btnVisualizarFinanceiro     = true;
                    let btnVisualizar               = true;
                    let btnCotinuarDigitacao        = true;
                    let btnCancelar                 = true;

                    if(atual?.status != 'cancelado'){
                        if(atual?.is_faturado == 'yes'){
                            btnCotinuarDigitacao  = false;
                        }

                    }else{

                        btnCotinuarDigitacao    = false;
                        btnFinalizar            = false;
                        btnIniciarProcedimento  = false;
                        acoesArr                = [];
                        btnEditar               = false;
                    }

                    if(btnCotinuarDigitacao){
                        acoesArr.push({acao:()=>atualizarContasReceberAction(atual.id), label:'Continuar digitação', propsOption:{}, propsLabel:{}})
                    }

                    if(btnEditar){
                        acoesArr.push({acao:()=>atualizarContasReceberAction(atual.id), label:'Editar', propsOption:{}, propsLabel:{}})
                    }

                    if(btnIniciarProcedimento){
                        acoesArr.push({acao:()=>atualizarContasReceberAction(atual.id), label:'Iniciar procedimento', propsOption:{}, propsLabel:{}})
                    }

                    if(btnFinalizar){
                        acoesArr.push({acao:()=>atualizarContasReceberAction(atual.id), label:'Finalizar procedimento', propsOption:{}, propsLabel:{}})
                    }

                    if(btnVisualizarFinanceiro){
                        acoesArr.push({acao:()=>atualizarContasReceberAction(atual.id), label:'Conta a receber', propsOption:{}, propsLabel:{}})
                    }

                    if(btnVisualizar){
                        acoesArr.push({acao:()=>atualizarContasReceberAction(atual.id), label:'Visualizar', propsOption:{}, propsLabel:{}})
                    }

                    if(btnCancelar){
                        acoesArr.push({acao:()=>cancelarContasReceberAction(atual.id), label:'Cancelar', propsOption:{}, propsLabel:{}})
                    }

                    //'remarcado','finalizado','cancelado','pendente'
                    data.push(

                        {
                            propsRow:{id:(atual.id)},
                            acoes:[
                                ...acoesArr
                            ],
                            celBodyTableArr:[
                                {

                                    label:atual.id,
                                    propsRow:{}
                                },
                                {

                                    label:atual.name_filial,
                                    propsRow:{}
                                },
                                {

                                    label:atual.name,
                                    propsRow:{}
                                },
                                {

                                    label:atual.status,
                                    propsRow:{}
                                },
                                {

                                    label:atual.cdCobrancaTipo,
                                    propsRow:{}
                                },
                                {

                                    label:FORMAT_MONEY(atual?.vrBruto),
                                    propsRow:{},
									toSum:1,
									isCoin:1,
                                },
                                {

                                    label:FORMAT_MONEY(atual?.vrLiquido),
                                    propsRow:{},
									toSum:1,
									isCoin:1,
                                },
                                {

                                    label:FORMAT_MONEY(atual?.vrDevolvido),
                                    propsRow:{},
									toSum:1,
									isCoin:1,
                                },
                                {

                                    label:FORMAT_MONEY(atual?.vrPago),
                                    propsRow:{},
									toSum:1,
									isCoin:1,
                                },
                                {

                                    label:FORMAT_MONEY(atual?.vrAberto),
                                    propsRow:{},
									toSum:1,
									isCoin:1,
                                },
                                {

                                    label:FORMAT_DATA_PT_BR(atual.dtVencimento),
                                    propsRow:{}
                                },
                                {

                                    label:atual?.descricao,
                                    propsRow:{}
                                },
                                {

                                    label:atual?.dsReferencia,
                                    propsRow:{}
                                },
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
                label:'Filial',
                props:{
                    style:{minWidth:'50px'}
                }
            },
            {
                label:'Cliente',
                props:{
                    style:{minWidth:'255px'}
                }
            },
            {
                label:'Status',
                props:{
                    style:{minWidth:'255px'}
                }
            },
            {
                label:'Cobrança',
                props:{
                    style:{minWidth:'100px'}
                }
            },
            {
                label:'Valor bruto',
                props:{
                    style:{minWidth:'150px'}
                }
            },
            {
                label:'Valor líquido',
                props:{
                    style:{minWidth:'150px'}
                }
            },
            {
                label:'Valor devolvido',
                props:{
                    style:{minWidth:'150px'}
                }
            },
            {
                label:'Valor pago',
                props:{
                    style:{minWidth:'150px'}
                }
            },
            {
                label:'Valor aberto',
                props:{
                    style:{minWidth:'150px'}
                }
            },
            {
                label:'Vencimento',
                props:{
                    style:{minWidth:'150px'}
                }
            },
            {
                label:'Histórico',
                props:{
                    style:{minWidth:'525px'}
                }
            },
            {
                label:'Referência',
                props:{
                    style:{minWidth:'350px'}
                }
            }
        ]

        return tableTitle;
    }
   //name_profissional

    //------------

    const requestAllContasRecebers = async() =>{
       
        const {url, options} = ORDEM_SERVICO_ALL_POST({'name_servico':pessoa}, getToken());


        const {response, json} = await request(url, options);
        console.log('All serviços here')
        console.log({'name_servico':pessoa})
        console.log(json)
        if(json){
            setContasReceber(json)
        }

            
    }

    React.useEffect(()=>{

        const requestAllContasRecebersEffect = async() =>{
       
           await requestAllContasRecebers();

            
        }

       /// requestAllContasRecebersEffect();

        
    }, [])

    React.useEffect(()=>{
        setContasReceber(dataEstado)
    }, [dataEstado])
    

    const rowsTableArr = gerarTableContasReceber();    
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
                cadastrarContasReceber && <Cadastrar cadastrarContasReceber={cadastrarContasReceber} setCadastrarContasReceber={setCadastrarContasReceber} atualizarContasReceber={atualizarContasReceber} setAtualizarContasReceber={setAtualizarContasReceber}  idContasReceber={consultaChoice} setIdContasReceber={setContasReceberChoice} callback={callBack} />
            }
            
            {
                atualizarContasReceber &&
                <Atualizar atualizarContasReceber={atualizarContasReceber} setAtualizarContasReceber={setAtualizarContasReceber}  idContasReceber={consultaChoice} setIdContasReceber={setContasReceberChoice} callback={callBack} />
            }



        </>
    )
}

export default Include;