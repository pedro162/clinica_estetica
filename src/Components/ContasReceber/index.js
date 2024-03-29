import React from 'react';
import estilos from './ContasReceber.module.css'
import useFetch from '../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, CONTAS_RECEBER_ALL_POST} from '../../api/endpoints/geral.js'
import {FORMAT_DATA_PT_BR} from '../../functions/index.js'
import {Col, Row, Button } from 'react-bootstrap';
import Table from '../Relatorio/Table/index.js'
import Filter from '../Relatorio/Filter/index.js'
import Breadcrumbs from '../Helper/Breadcrumbs.js'
import { faHome, faSearch, faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from '../Utils/Modal/index.js'
import Load from '../Utils/Load/index.js'
import {UserContex} from '../../Context/UserContex.js'
import FormContasReceber from './FormContasReceber/index.js'
import Cadastrar from './Cadastrar/index.js'
import Atualizar from './Atualizar/index.js'
import Include from './include';
import FormControlInput from '../FormControl/index.js'
import {FORMAT_CALC_COD, FORMAT_MONEY} from '../../functions/index.js'


const ContasReceber = ({defaultFilters ,...props})=>{

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
    const [mostarFiltros, setMostarFiltros] = React.useState(false) 
    const [acao, setAcao] = React.useState(null)
    const [filtroMobile, setFiltroMobile] = React.useState(null)
    const [filtroAbertas, setFiltroAbertas] = React.useState(false)
    const [filtroPagas, setFiltroPagas] = React.useState(false)
    const [filtroVencidas, setFiltroVencidas] = React.useState(false)
    const [filtroAvencer, setFiltroAvencer] = React.useState(false)
    const [nadaEncontrado, setNadaEncontrado] = React.useState(false)


    const [referenciaContasReceber, setReferenciaContasReceber] = React.useState(()=>{
        return defaultFilters?.referencia
    })
    const [idReferenciaContasReceber, setIdReferenciaContasReceber] = React.useState(()=>{
        return defaultFilters?.referencia_id
    })  
    const [pessoa, setPessoa] = React.useState(()=>{
        return defaultFilters?.name_pessoa
    })
    /**
     * 
     * let idRef   = defaultFilters?.referencia_id;
        let ref     = defaultFilters?.referencia;
        let name_pessoa     = defaultFilters?.name_pessoa;
     */

    const {getToken} = React.useContext(UserContex);

    const alerta = (target)=>{
        console.log(target)
    }

    const handleFiltroMobile = ({target})=>{
        setFiltroMobile(target.value)
    }

    const setNamePessoa = ({target})=>{        
        setPessoa(target.value)
    }

    const setDsReferencia = ({target})=>{
        
        setReferenciaContasReceber(target.value)
    }

    const setIdReferencia = ({target})=>{
        
        /* console.log("=============== Id fef change ======================")//
        console.log(target)
        console.log("=============== Id fef change ============================= ") */
        
        setIdReferenciaContasReceber(target.value)
    }

    const filtersArr = [
        {
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Pessoa',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"6",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm",'name':pessoa, value:pessoa, onChange:setNamePessoa,    onBlur:setNamePessoa},

        },
        {
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Contato',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"6",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm",'name_atendido':pessoa, value:pessoa, onChange:setNamePessoa,    onBlur:setNamePessoa},

        },
        {
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Status',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"6",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm",'status':pessoa, value:pessoa, onChange:setNamePessoa,    onBlur:setNamePessoa},

        },
        {
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Tipo',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"6",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm",'tipo':pessoa, value:pessoa, onChange:setNamePessoa,    onBlur:setNamePessoa},

        },
        {
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Cód. ref',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"6",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm",'referencia_id':idReferenciaContasReceber,value:idReferenciaContasReceber ,onChange:setIdReferencia, onBlur:setIdReferencia},

        },/*
            

         */
        {
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Referência',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"6",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm",'referencia':referenciaContasReceber, value:referenciaContasReceber, onChange:setDsReferencia,    onBlur:setDsReferencia},

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
            props:{onClick:()=>setCadastrarContasReceber(true), className:'btn btn-sm mx-2 btn-secondary'}
        }
    ];
    

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
        setCadastrarContasReceber(idContasReceber)
        setAcao('iniciar')
        setCadastrarContasReceber(true);
    }
    //------------
    const montarFiltro = ()=>{
        let filtros = {}
        let detalhesFiltros = {}
        if(referenciaContasReceber){
            filtros['referencia'] = referenciaContasReceber;
            detalhesFiltros['referencia'] = {
                label:'Referência',
                value:referenciaContasReceber,
                resetFilter:()=>setReferenciaContasReceber(''),
            };
        }
        
        
        if(idReferenciaContasReceber){
            filtros['referencia_id'] = idReferenciaContasReceber;   
            detalhesFiltros['referencia_id'] = {
                label:'Cód. referência',
                value:idReferenciaContasReceber,
                resetFilter:()=>setIdReferenciaContasReceber(''),
            };
        }

        if(pessoa){
            filtros['name_pessoa'] = pessoa;
            detalhesFiltros['name_pessoa'] = {
                label:'Pessoa',
                value:pessoa,
                resetFilter:()=>setPessoa(''),
            };
        }

        if(filtroMobile){
            filtros['pessoa_name'] = filtroMobile;
            detalhesFiltros['pessoa_name'] = {
                label:'Filtro',
                value:filtroMobile,
                resetFilter:()=>setFiltroMobile(''),
            };
        }

        if(filtroAbertas){
            if(filtros.hasOwnProperty('status')){
                filtros['status'] += 'aberto,';
            }else{
                filtros['status'] = 'aberto,';
            }
            
            detalhesFiltros['status'] = {
                label:'Status',
                value:pessoa,
                resetFilter:()=>setFiltroAbertas(false),
            };
        }

        if(filtroPagas){
            if(filtros.hasOwnProperty('status')){
                filtros['status'] += 'pago,';
            }else{
                filtros['status'] = 'pago,';
            }

            detalhesFiltros['status'] = {
                label:'Status',
                value:pessoa,
                resetFilter:()=>setFiltroPagas(false),
            };
        }

        if(! (filtroAvencer && filtroAvencer)){

        
            if(filtroVencidas){
                /*if(filtros.hasOwnProperty('status')){
                    filtros['vencido'] += 'yes,';
                }else{
                    filtros['vencido'] = 'yes,';
                }*/
                filtros['vencido'] = 'yes';
                detalhesFiltros['vencido'] = {
                    label:'Vencidos',
                    value:pessoa,
                    resetFilter:()=>setFiltroVencidas(false),
                };
            }

            if(filtroAvencer){
               /* if(filtros.hasOwnProperty('status')){
                    filtros['vencido'] += 'no,';
                }else{
                    filtros['vencido'] = 'no,';
                }*/

                filtros['vencido'] = 'no';
                detalhesFiltros['vencido'] = {
                    label:'Vencidos',
                    value:pessoa,
                    resetFilter:()=>setFiltroAvencer(false),
                };
            }
        }

        return {filtros, detalhesFiltros};
    }
    const requestAllContasRecebers = async() =>{
        setContasReceber([])
        setNadaEncontrado(false)

        let {filtros, detalhesFiltros} = montarFiltro();
        const {url, options} = CONTAS_RECEBER_ALL_POST({...filtros}, getToken());


        const {response, json} = await request(url, options);
        console.log('All contas receber here')
        console.log({'name_pessoa':pessoa})
        console.log(json)
        if(json){
            setContasReceber(json)
            if( json?.mensagem && json?.mensagem.length > 0){
                setNadaEncontrado(false)
            }else{
                setNadaEncontrado(true)
            }

        }else{
            setNadaEncontrado(true)
        }
        //setMostarFiltros(false)
        //nadaEncontrado, setNadaEncontrado

            
    }

    const requestAbertas = async ()=>{
        setContasReceber([])

        let {filtros, detalhesFiltros} = montarFiltro();
       // filtros['status'] += 'aberto';
       filtros.status = 'aberto';
        const {url, options} = CONTAS_RECEBER_ALL_POST({...filtros}, getToken());


        const {response, json} = await request(url, options);
        console.log('All contas receber here')
        console.log({'name_pessoa':pessoa})
        console.log(json)
        if(json){
            setContasReceber(json)
        }
        //setMostarFiltros(false)
    }





    React.useEffect(()=>{

        const requestAllContasRecebersEffect = async() =>{
       
           await requestAllContasRecebers();

            
        }

        requestAllContasRecebersEffect();

        
    }, [filtroAvencer, filtroVencidas, filtroPagas, filtroAbertas])

    /*
        {mostarFiltros && 
                    (
                        <Col  xs="12" sm="12" md="3">
                            <Filter
                                filtersArr={filtersArr}
                                actionsArr={acoesBottomCard}
                            />
                        </Col>
                    )
                }
                
                <Col  xs="12" sm="12" md={mostarFiltros ? "9":"12"}>
                    <Include
                        dataEstado={estado}
                        loadingData={loading}
                        callBack={requestAllOrdemServicos}
                        setMostarFiltros={setMostarFiltros}
                    />
                </Col>
    */
    
    return(
        <>
            <Breadcrumbs
                items={[
                        {
                            props:{},
                            label:'Início'
                        },
                        {
                            props:{},
                            label:'Contas a receber'
                        }
                    ]}

                buttonFiltroMobile={true}
                setMostarFiltros={setMostarFiltros}
                mostarFiltros={mostarFiltros}

            />
            <Row>
                {mostarFiltros && 
                    (
                        <>
                            <Col  xs="12" sm="12" md="3" className={'default_card_report'}>
                                <Filter
                                    filtersArr={filtersArr}
                                    actionsArr={acoesBottomCard}
                                />
                            </Col>

                            <Col  xs="12" sm="12" md="12" className={'mobile_card_report pt-4'}  style={{backgroundColor:'#FFF'}}>
                                <Row className={'mb-3'} >
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
                                                                    
                                                                },
                                                                onChange:(ev)=>{handleFiltroMobile(ev);},
                                                                onBlur:(ev)=>{handleFiltroMobile(ev);},
                                                                onKeyUp:(ev)=>{

                                                                    if (ev.key === "Enter") {
                                                                        requestAllContasRecebers();
                                                                    }
                                                                }, 
                                                                value:filtroMobile,

                                                            }
                                                        }
                                                    }
                                                 />
                                            </Col>

                                            <Col xs="1" sm="1" md="1" style={{textAlign:'left', alignItems:'center', justifyContent:'center', margin:'auto',padding:'0'}} >
                                                <FontAwesomeIcon onClick={()=>{requestAllContasRecebers();}} size={'lg'} icon={faSearch}/>
                                            </Col>
                                        
                                            
                                         </Row>
                                        <Row className={'mt-2'}>
                                            <div  style={{display:'flex', flexDirection:'collumn', flexWrap:'wrap'}}>
                                                {(filtroAbertas ? <Button style={{borderRadius:'50px', marginBottom:'10px',marginRight:'0.4rem'}} className={'btn btn-sm btn-secondary'} onClick={()=>{setFiltroAbertas(false);}} ><FontAwesomeIcon icon={faTimes} /> Abertas</Button> : '')}
                                                {(filtroPagas ? <Button style={{borderRadius:'50px', marginBottom:'10px',marginRight:'0.4rem'}} className={'btn btn-sm btn-secondary'} onClick={()=>{setFiltroPagas(false);}} ><FontAwesomeIcon icon={faTimes} /> Pagas</Button> : '')}
                                                {(filtroVencidas ? <Button style={{borderRadius:'50px', marginBottom:'10px',marginRight:'0.4rem'}} className={'btn btn-sm btn-secondary'} onClick={()=>{setFiltroVencidas(false);}} ><FontAwesomeIcon icon={faTimes} /> Vencidas</Button> : '')}
                                                {(filtroAvencer ? <Button style={{borderRadius:'50px', marginBottom:'10px',marginRight:'0.4rem'}} className={'btn btn-sm btn-secondary'} onClick={()=>{setFiltroAvencer(false);}} ><FontAwesomeIcon icon={faTimes} /> A vencer</Button> : '')}
                                            </div>
                                        </Row>
                                    </Col>
                                    
                                    
                                </Row>
                                <Row className={'my-2'}>
                                    <Col>
                                        <Row>
                                            <Col><span style={{fontWeight:'bolder', fontSize:'14pt'}} >Ações</span></Col>
                                        </Row>

                                        <div>
                                             <hr style={{margin:'0',padding:'0'}}/>  
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <div style={{display:'flex', flexDirection:'collumn', flexWrap:'wrap'}}>
                                        <Button style={{borderRadius:'50px', marginBottom:'10px',marginRight:'0.4rem'}} className={'btn btn-sm btn-secondary'} onClick={()=>{setCadastrarContasReceber(true);}} ><FontAwesomeIcon icon={faPlus} /> Receita</Button>
                                        <Button style={{borderRadius:'50px', marginBottom:'10px',marginRight:'0.4rem'}} className={'btn btn-sm btn-secondary'} onClick={()=>{setFiltroAbertas(true); }} ><FontAwesomeIcon icon={faSearch} /> Abertas</Button>
                                        <Button style={{borderRadius:'50px', marginBottom:'10px',marginRight:'0.4rem'}} className={'btn btn-sm btn-secondary'} onClick={()=>{setFiltroPagas(true); }} ><FontAwesomeIcon icon={faSearch} /> Pagas</Button>
                                        <Button style={{borderRadius:'50px', marginBottom:'10px',marginRight:'0.4rem'}} className={'btn btn-sm btn-secondary'} onClick={()=>{setFiltroVencidas(true); }} ><FontAwesomeIcon icon={faSearch} /> Vencidas</Button>
                                        <Button style={{borderRadius:'50px', marginBottom:'10px'}} className={'btn btn-sm btn-secondary'} onClick={()=>{setFiltroAvencer(true);}} ><FontAwesomeIcon icon={faSearch} /> A vencer</Button>
                                    </div>
                                </Row>
                            </Col>
                        </>
                    )
                }
                
                <Col style={{backgroundColor:'#FFF'}} className={'pt-3 mobile_card_report'} >
                    <Row>
                        <Col><span style={{fontWeight:'bolder', fontSize:'14pt'}} >Resultado</span></Col>
                    </Row>
                    <div>
                         <hr style={{margin:'0',padding:'0'}}/>  
                    </div>
                </Col>

                <Col  xs="12" sm="12" md={mostarFiltros ? "9":"12"} >
                    <Include
                        dataEstado={estado}
                        loadingData={loading}
                        callBack={requestAllContasRecebers}
                        setMostarFiltros={setMostarFiltros}
                        nadaEncontrado={nadaEncontrado}
                    />
                </Col>
            </Row>
            {
                cadastrarContasReceber &&
                <Cadastrar cadastrarContasReceber={cadastrarContasReceber} setCadastrarContasReceber={setCadastrarContasReceber} atualizarContasReceber={atualizarContasReceber} setAtualizarContasReceber={setAtualizarContasReceber}  idContasReceber={consultaChoice} setIdContasReceber={setContasReceberChoice} callback={requestAllContasRecebers} />
            }
           
         </>

    )
}

export default ContasReceber;