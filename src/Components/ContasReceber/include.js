import React from 'react'
import estilos from './ContasReceber.module.css'
import useFetch from '../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, ORDEM_SERVICO_ALL_POST} from '../../api/endpoints/geral.js'
import {FORMAT_DATA_PT_BR} from '../../functions/index.js'
import {Col, Row } from 'react-bootstrap';
import FormControlInput from '../FormControl/index.js'
import Table from '../Relatorio/Table/index.js'
import CardMobile from '../Relatorio/CardMobile/index.js'
import Filter from '../Relatorio/Filter/index.js'
import Breadcrumbs from '../Helper/Breadcrumbs.js'
import { faHome, faSearch, faPlus, faPen, faHandHoldingUsd, faList, faFile, faTrash, faHandHolding, faUser, faUserCircle, faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from '../Utils/Modal/index.js'
import Load from '../Utils/Load/index.js'
import {UserContex} from '../../Context/UserContex.js'
import FormContasReceber from './FormContasReceber/index.js'
import Cadastrar from './Cadastrar/index.js'
import Atualizar from './Atualizar/index.js'
import Baixar from './Baixar/index.js'
import Estornar from './Estornar/index.js'
import Card from '../Utils/Card/index.js'
import {FORMAT_CALC_COD, FORMAT_MONEY} from '../../functions/index.js'


const Include = ({dataEstado, loadingData, callBack, setMostarFiltros, ...props})=>{
    const {data, error, request, loading} = useFetch();
    const [estado, setContasReceber] = React.useState([])
    const [exemplos, setExemplos] = React.useState([])
    const [exemplosTitleTable, setExemplosTitleTable] = React.useState([])
    const [showModalCriarContasReceber, setShowModalCriarConstula] = React.useState(false)
    const [consultaChoice, setContasReceberChoice] = React.useState(null);
    const [atualizarContasReceber, setAtualizarContasReceber] = React.useState(false)  
    const [baixarContasReceber, setBaixarContasReceber] = React.useState(false)   
    const [estornarContasReceber, setEstornarContasReceber] = React.useState(false)   
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
            case 'baixar':
                if(consultaChoice > 0){
                    setBaixarContasReceber(true);
                }else{
                    setBaixarContasReceber(false);
                }
                break;
            case 'estornar':
                if(consultaChoice > 0){
                    setEstornarContasReceber(true);
                }else{
                    setEstornarContasReceber(false);
                }
                break;
            case 'devolver':
                if(consultaChoice > 0){
                    setDigitarContasReceber(true);
                }else{
                    setDigitarContasReceber(false);
                }
                break;
            case 'vusializar':
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

    const baixarContasReceberAction = (idContasReceber)=>{
        setContasReceberChoice(idContasReceber)
        setAcao('baixar')
        setBaixarContasReceber(true);
    }

    const estornarContasReceberAction = (idContasReceber)=>{
        setContasReceberChoice(idContasReceber)
        setAcao('estornar')
        setEstornarContasReceber(true);
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
                    let baixar                      = true;
                    let btnFinalizar                = true;
                    let estornar                    = true;
                    let btnVisualizarMovimentacoes  = true;
                    let btnVisualizar               = true;
                    let btnCotinuarDigitacao        = true;
                    let btnCancelar                 = true;

                    if(atual?.status != 'pago'){
                        estornar= false;
                    }else if(atual?.status != 'aberto'){
                        estornar    = false;
                        btnEditar   = false;
                    }else{

                        btnCotinuarDigitacao    = false;
                        btnFinalizar            = false;
                        baixar  = false;
                        acoesArr                = [];
                        btnEditar               = false;
                    }


                    if(btnEditar){
                        acoesArr.push({acao:()=>atualizarContasReceberAction(atual.id), label:'Editar', propsOption:{}, propsLabel:{}})
                    }

                    if(baixar){
                        acoesArr.push({acao:()=>baixarContasReceberAction(atual.id), label:'Baixar', propsOption:{}, propsLabel:{}})
                    }

                    if(estornar){
                        acoesArr.push({acao:()=>estornarContasReceberAction(atual.id), label:'Estornar', propsOption:{}, propsLabel:{}})
                    }

                    if(baixar){
                        //acoesArr.push({acao:()=>atualizarContasReceberAction(atual.id), label:'Devolver', propsOption:{}, propsLabel:{}})
                    }

                    if(btnVisualizarMovimentacoes){
                        acoesArr.push({acao:()=>atualizarContasReceberAction(atual.id), label:'Movimentações', propsOption:{}, propsLabel:{}})
                    }

                    if(btnVisualizar){
                        acoesArr.push({acao:()=>atualizarContasReceberAction(atual.id), label:'Visualizar', propsOption:{}, propsLabel:{}})
                    }

                    if(btnCancelar){
                        
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


    const gerarCardContasReceber = ()=>{
       
        let data = [];
        let dataContasReceber = estado.mensagem
        if(dataContasReceber && Array.isArray(dataContasReceber) && dataContasReceber.length > 0){
            for(let i=0; !(i == dataContasReceber.length); i++){
                let atual = dataContasReceber[i];
                if(atual){
                    let acoesArr = [];
                    let btnEditar                   = true;
                    let baixar                      = true;
                    let btnFinalizar                = true;
                    let estornar                    = true;
                    let btnVisualizarMovimentacoes  = true;
                    let btnVisualizar               = true;
                    let btnCotinuarDigitacao        = true;
                    let btnCancelar                 = true;

                    if(atual?.status != 'pago'){
                        estornar= false;
                    }else if(atual?.status != 'aberto'){
                        estornar    = false;
                        btnEditar   = false;
                    }else{

                        btnCotinuarDigitacao    = false;
                        btnFinalizar            = false;
                        baixar  = false;
                        acoesArr                = [];
                        btnEditar               = false;
                    }


                    if(btnEditar){
                        acoesArr.push({acao:()=>atualizarContasReceberAction(atual.id), label:'Editar', propsOption:{}, propsLabel:{}})
                    }

                    if(baixar){
                        acoesArr.push({acao:()=>baixarContasReceberAction(atual.id), label:'Baixar', propsOption:{}, propsLabel:{}})
                    }

                    if(estornar){
                        acoesArr.push({acao:()=>estornarContasReceberAction(atual.id), label:'Estornar', propsOption:{}, propsLabel:{}})
                    }

                    if(baixar){
                        //acoesArr.push({acao:()=>atualizarContasReceberAction(atual.id), label:'Devolver', propsOption:{}, propsLabel:{}})
                    }

                    if(btnVisualizarMovimentacoes){
                        acoesArr.push({acao:()=>atualizarContasReceberAction(atual.id), label:'Movimentações', propsOption:{}, propsLabel:{}})
                    }

                    if(btnVisualizar){
                        acoesArr.push({acao:()=>atualizarContasReceberAction(atual.id), label:'Visualizar', propsOption:{}, propsLabel:{}})
                    }

                    if(btnCancelar){
                        
                    }

                    //propsContainerTitulo, propsContainerButtons
                    data.push(

                        {
                            propsRow:{id:(atual.id)},
                            acoes:[
                                ...acoesArr
                            ],
                            title:<> <div style={{display:'flex', justifyContent:'space-between',fontSize:'18pt', fontWeight:'bolder'}} ><span><FontAwesomeIcon size={'lg'} icon={faUserCircle}/> {atual?.name} </span> </div> </>,
                            propsContainerTitulo:{md:'11', sm:'9', xs:'9'},
                            propsContainerButtons:{md:'1', sm:'3', xs:'3'},
                            acoesBottomCard:[
                               {label:'', props:{onClick:()=>atualizarContasReceberAction(atual?.id), className:'btn  btn-sm mx-2 btn-primary', style:{'justifyContent': 'flex-end'}}, icon:<FontAwesomeIcon icon={faPen} />},
                               {label:'', props:{onClick:()=>baixarContasReceberAction(atual?.id), className:'btn  btn-sm mx-2 botao_success btn-success', style:{'justifyContent': 'flex-end'}}, icon:<FontAwesomeIcon icon={faHandHoldingUsd} />},
                               {label:'', props:{onClick:()=>estornarContasReceberAction(atual?.id), className:'btn  btn-sm mx-2 btn-dark', style:{'justifyContent': 'flex-end'}}, icon:<FontAwesomeIcon icon={faHandHolding} /> },
                               {label:'', props:{onClick:()=>atualizarContasReceberAction(atual?.id), className:'btn  btn-sm mx-2 btn-secondary', style:{'justifyContent': 'flex-end'}}, icon:<FontAwesomeIcon icon={faList} /> },
                               {label:'', props:{onClick:()=>atualizarContasReceberAction(atual?.id), className:'btn  btn-sm mx-2 btn-info', style:{'justifyContent': 'flex-end'}}, icon:<FontAwesomeIcon icon={faFile} /> },
                               {props:{onClick:()=>atualizarContasReceberAction(atual?.id), className:'btn  btn-sm mx-2 btn-danger', style:{'justifyContent': 'flex-end'}}, icon:<FontAwesomeIcon icon={faTrash} /> },
                            ],
                            celBodyTableArr:[
                                [
                                    {
                                        title:<span style={{fontWeight:'bolder'}}>Aberto R$: </span>,
                                        label:FORMAT_MONEY(atual?.vrAberto),
                                        props:{style:{textAlign:'left'}},
                                        toSum:1,
                                        isCoin:1,
                                    },
                                    {
                                        title:<span style={{fontWeight:'bolder'}}>Pago R$: </span>,
                                        label:FORMAT_MONEY(atual?.vrPago),
                                        props:{style:{textAlign:'left'}},
                                        toSum:1,
                                        isCoin:1,
                                    },

                                ],
                                [
                                    {
                                        title:<span style={{fontWeight:'bolder'}}>Cobrança: </span>,
                                        label:atual.cdCobrancaTipo,
                                        props:{style:{textAlign:'left'}},
                                     },
                                     {
                                        title:<span style={{fontWeight:'bolder'}}>Vencimento: </span>,
                                        label:FORMAT_DATA_PT_BR(atual.dtVencimento),
                                        props:{style:{textAlign:'left'}},
                                    },
                                ],                                
                                [
                                     {
                                        title:<span style={{fontWeight:'bolder'}}>Status: </span>,
                                        label:atual.status,
                                        props:{style:{textAlign:'center'}},
                                    },
                                ]
                               
                               
                            ]
                        }

                    )

                }

            }
        }

        return data;
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
    const dataContasReceberRelatorio = estado.mensagem;

    return(
        <>
            <Row>
                <Col  xs="12" sm="12" md="12" className={'mobile_card_report, py-4'}  style={{backgroundColor:'#FFF'}}>
                    <Row className={'mb-3 '} >
                        <Col className={'mx-2'}  >
                           <Row style={{borderRadius:'24px 24px 24px 24px', border:'1px solid #000'}}>
                                <Col xs="11" sm="11" md="11" >
                                    <FormControlInput
                                        data={
                                            {
                                                atributsFormControl:{
                                                    type:'input',
                                                    placeholder:'Search...',
                                                    style:{
                                                        border:'none',
                                                        outline:'0',
                                                        'box-shadow':'0 0 0 0',
                                                        height:'50px',
                                                        borderRadius:'24px 24px 24px 24px'
                                                        
                                                    }

                                                }
                                            }
                                        }
                                     />
                                </Col>

                                <Col xs="1" sm="1" md="1" style={{textAlign:'left', alignItems:'center', justifyContent:'center', margin:'auto',padding:'0'}} >
                                    <FontAwesomeIcon size={'lg'} icon={faSearch}/>
                                </Col>
                            
                                
                             </Row>

                        </Col>
                        
                        
                    </Row>
                    <div>
                         <hr style={{margin:'0',padding:'0'}}/>  
                    </div>
                    {
                        dataContasReceberRelatorio && Array.isArray(dataContasReceberRelatorio) && dataContasReceberRelatorio.length > 0 ? (
                            dataContasReceberRelatorio.map((item, index, arr)=>{
                                let {status, name, vrPago, vrAberto, vrDevolvido, id, dtVencimento, cdCobrancaTipo, filial_id} = item;
                                return(
                                        <div  key={id+index+arr.length}>
                                            <Row className={'py-2 px-1'}>

                                                    <Col xs="2" sm="2" md="2"  style={{textAlign:'left', alignItems:'center', justifyContent:'center', margin:'auto',fontSize:'25pt'}}>
                                                        <FontAwesomeIcon size={'lg'} icon={faUserCircle}/>
                                                    </Col>

                                                    <Col xs="10" sm="10" md="10"  style={{textAlign:'left', fontSize:'10pt'}}>
                                                        <Row className={'mb-1'}>
                                                            <span style={{fontSize:'14pt', fontWeight:'bolder'}} >{name}</span>
                                                        </Row>
                                                        <Row>
                                                            <Col>
                                                                <span>Aberto R$: {FORMAT_MONEY(vrAberto)}</span>
                                                            </Col>
                                                            <Col>
                                                                <span>Status: {status}</span>
                                                            </Col>
                                                            <Col>
                                                                <span>Vencimento: {FORMAT_DATA_PT_BR(dtVencimento)}</span>
                                                            </Col>
                                                            
                                                        </Row>
                                                        
                                                    </Col>
                                            </Row>
                                            <hr style={{margin:'0',padding:'0'}}/>
                                        </div>
                                        
                                )
                            })
                        ) : (null)
                        
                    
                    }

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

                <Col  xs="12" sm="12" md="12" className={'default_card_report'}>
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
            
            {
                baixarContasReceber &&
                <Baixar baixarContasReceber={baixarContasReceber} setBaixarContasReceber={setBaixarContasReceber}  idContasReceber={consultaChoice} setIdContasReceber={setContasReceberChoice} callback={callBack} />
            }
            
            {
                estornarContasReceber &&
                <Estornar estornarContasReceber={estornarContasReceber} setEstornarContasReceber={setEstornarContasReceber}  idContasReceber={consultaChoice} setIdContasReceber={setContasReceberChoice} callback={callBack} />
            }


        </>
    )
}

export default Include;