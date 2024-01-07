import React from 'react';
import estilos from './Especialidade.module.css'
import useFetch from '../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, ESPECIALIDADE_ALL_POST} from '../../api/endpoints/geral.js'
import {Col, Row, Button } from 'react-bootstrap';
import Table from '../Relatorio/Table/index.js'
import Filter from '../Relatorio/Filter/index.js'
import Breadcrumbs from '../Helper/Breadcrumbs.js'
import { faHome, faSearch, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from '../Utils/Modal/index.js'
import Load from '../Utils/Load/index.js'
import Cadastrar from './Cadastrar/index.js'
import Atualizar from './Atualizar/index.js'
import {UserContex} from '../../Context/UserContex.js'
import FormEspecialidade from './FormEspecialidade/index.js'
import Include from './include';
import FormControlInput from '../FormControl/index.js'


const Especialidade = (props)=>{

	const {data, error, request, loading} = useFetch();
    const [estado, setEspecialidade] = React.useState([])
    const [exemplos, setExemplos] = React.useState([])
    const [exemplosTitleTable, setExemplosTitleTable] = React.useState([])
    const [showModalCriarEspecialidade, setShowModalCriarEspecialidade] = React.useState(false)
    const [showModalAtualizarEspecialidade, setShowModalAtualizarEspecialidade] = React.useState(false)
    const [especialidadeChoice, setEspecialidadeChoice] = React.useState(null);
    const [atualizarCadastro, setAtualizarCadastro] = React.useState(false)    
    const [cadastrarEspecialidade, setCadastrarEspecialidade] = React.useState(false)   
    const [ordenacao, setOrdenacao] = React.useState('')
    const [nadaEncontrado, setNadaEncontrado] = React.useState(false)
    const [mostarFiltros, setMostarFiltros] = React.useState(false) 
    const [filtroMobile, setFiltroMobile] = React.useState(null)
    const [acao, setAcao] = React.useState(null) 
    const [especialidadeName, setEspecialidadeName] = React.useState(null) 


    const {getToken} = React.useContext(UserContex);

    const alerta = (target)=>{
        console.log(target)
    }

    const handleFiltroMobile = ({target})=>{
        setFiltroMobile(target.value)
    }

    const setNameEspcialidadeFiltro = ({target})=>{
        
        setEspecialidadeName(target.value)
    }

    const setOrdenacaoFiltro = ({target})=>{
        
        setOrdenacao(target.value)
    }

    const filtersArr = [
        {
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Especialidade',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"12",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm",'name':'nome',onChange:setNameEspcialidadeFiltro,    onBlur:setNameEspcialidadeFiltro},

        }
    ]

    const acoesBottomCard=[{
            label:'Pesquisar',
            icon:<FontAwesomeIcon icon={faSearch} />,
            props:{onClick:()=>requestAllEspecialidade(), className:'btn btn-sm botao_success'}
        },
        {
            label:'Cadastrar',
            icon:<FontAwesomeIcon icon={faPlus} />,
            props:{onClick:()=>setCadastrarEspecialidade(true), className:'btn btn-sm mx-2 btn-secondary'}
        }
    ];
    const gerarExemplos = ()=>{
         let exemplos = [];
        for(let i=0; !(i == 10); i++){
            exemplos.push(

                    {
                        propsRow:{id:(i+1)},
                        celBodyTableArr:[
                            {

                                label:'1',
                                propsRow:{}
                            },
                            {

                                label:'Peddro',
                                propsRow:{}
                            },
                            {

                                label:'(98) 98425-7623',
                                propsRow:{}
                            },
                            {

                                label:'phedroclooney@gmail.com',
                                propsRow:{}
                            }
                        ]
                    }

                )

        }

        return exemplos;
    }

   
    const requestAllEspecialidade = async() =>{
       
        const {url, options} = ESPECIALIDADE_ALL_POST({}, getToken());


        const {response, json} = await request(url, options);
        console.log('Especialidade here')
        console.log(json)
        if(json){
               setEspecialidade(json)
        }

            
    }

    React.useEffect(()=>{

        const requestAllEspecialidadeEffect = async() =>{
       
           await requestAllEspecialidade();

            
        }

        requestAllEspecialidadeEffect();

        
    }, [])

    React.useEffect(()=>{

        if(especialidadeChoice > 0){
            setAtualizarCadastro(true);
        }else{
            setAtualizarCadastro(false);
        }

        
    }, [especialidadeChoice])

    React.useEffect(()=>{

        if(cadastrarEspecialidade == true){
            setShowModalCriarEspecialidade(true);
        }else{
            setShowModalCriarEspecialidade(false);
        }

        
    }, [cadastrarEspecialidade])

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
                            label:'Especialidade'
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
                                <Row className={''} >
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
                                                                        requestAllEspecialidade();
                                                                    }
                                                                },
                                                                value:filtroMobile

                                                            }
                                                        }
                                                    }
                                                 />
                                            </Col>

                                            <Col xs="1" sm="1" md="1" style={{textAlign:'left', alignItems:'center', justifyContent:'center', margin:'auto',padding:'0'}} >
                                                <FontAwesomeIcon onClick={()=>{requestAllEspecialidade();}} size={'lg'} icon={faSearch}/>
                                            </Col>
                                        
                                            
                                         </Row>

                                         <Row className={'mt-2'}>
                                            <div  style={{display:'flex', flexDirection:'collumn', flexWrap:'wrap'}}>
                                                
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
                                        <Button style={{borderRadius:'50px', marginBottom:'10px',marginRight:'0.4rem'}} className={'btn btn-sm btn-secondary'} onClick={()=>{setCadastrarEspecialidade(true);}} ><FontAwesomeIcon icon={faPlus} />Especialidade</Button>
                                    </div>
                                </Row>
                            </Col>
                        </>
                    )
                }

                <Col style={{backgroundColor:'#FFF'}} className={'pt-3 mobile_card_report'}>
                    <Row>
                        <Col><span style={{fontWeight:'bolder'}} >Resultado</span></Col>
                    </Row>
                    <div>
                         <hr style={{margin:'0',padding:'0'}}/>  
                    </div>
                </Col>
                <Col  xs="12" sm="12"  md={mostarFiltros ? "9":"12"}>
                    <Include
                        dataEstado={estado}
                        loadingData={loading}
                        callBack={requestAllEspecialidade}
                        setMostarFiltros={setMostarFiltros}
                        idEspecialidadeCriada={especialidadeChoice}
                        nadaEncontrado={nadaEncontrado}
                    />
                </Col>
            </Row>
            {
                cadastrarEspecialidade && <Cadastrar cadastrarEspecialidade={cadastrarEspecialidade} setCadastrarEspecialidade={setCadastrarEspecialidade} atualizarCadastro={atualizarCadastro} setAtualizarCadastro={setAtualizarCadastro}  idEspecialidade={especialidadeChoice} setIdEspecialidade={setEspecialidadeChoice} callback={requestAllEspecialidade} />
            }
            
            {
                atualizarCadastro &&
                <Atualizar atualizarCadastro={atualizarCadastro} setAtualizarCadastro={setAtualizarCadastro}  idEspecialidade={especialidadeChoice} setIdEspecialidade={setEspecialidadeChoice} callback={requestAllEspecialidade} />
            }
         </>

	)
}

export default Especialidade;