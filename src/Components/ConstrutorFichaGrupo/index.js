import React from 'react';
import estilos from './Grupo.module.css'
import useFetch from '../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, FORMULARIO_GRUPO_ALL_POST} from '../../api/endpoints/geral.js'
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
import {UserContex} from '../../Context/UserContex.js'
import FormGrupo from './FormGrupo/index.js'
import ConstrutorFichaItem from '../ConstrutorFichaItem/index.js'


const ConstrutorFichaGrupo = ({idFormulario, ...props})=>{

	const {data, error, request, loading} = useFetch();
    const [registro, setRegistro] = React.useState([])
    const [showModalCriarRegistro, setShowModalCriarRegistro] = React.useState(false)
    const [showModalItem, setShowModalItem] = React.useState(false)
    const [registroChoice, setRegistroChoice] = React.useState(null);
    const [atualizarCadastro, setAtualizarCadastro] = React.useState(false)    
    const [cadastrarRegistro, setCadastrarRegistro] = React.useState(false)     
    const [listarItems, setListarItem] = React.useState(false)        
    const [acao, setAcao] = React.useState(null)


    const {getToken} = React.useContext(UserContex);

    const alerta = (target)=>{
        console.log(target)
    }
    const filtersArr = [
        {
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Nome',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"12",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm",'name':'nome',onChange:alerta,    onBlur:alerta},

        }
    ]

    const acoesBottomCard=[{
            label:'Pesquisar',
            icon:<FontAwesomeIcon icon={faSearch} />,
            props:{onClick:()=>requestAllRegistros(), className:'btn btn-sm botao_success'}
        },
        {
            label:'Cadastrar',
            icon:<FontAwesomeIcon icon={faPlus} />,
            props:{onClick:()=>setCadastrarRegistro(true), className:'btn btn-sm mx-2 btn-secondary'}
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

    const gerarTableRegistro = ()=>{
       
        let data = [];
        let dataRegistro = registro.mensagem
        if(dataRegistro && Array.isArray(dataRegistro) && dataRegistro.length > 0){
            for(let i=0; !(i == dataRegistro.length); i++){
                let atual = dataRegistro[i];
                if(atual){


                    data.push(

                        {
                            propsRow:{id:(atual.id)},
                            acoes:[
                                {acao:()=>atualizarRegistro(atual.id), label:'Editar', propsOption:{}, propsLabel:{}},
                                {acao:()=>novoAtendimento(atual.id), label:'Excluir', propsOption:{}, propsLabel:{}},
                                {acao:()=>novoAtendimento(atual.id), label:'Atualizar itens', propsOption:{}, propsLabel:{}},
                                {acao:()=>exbirListaItem(atual.id), label:'Itens', propsOption:{}, propsLabel:{}},
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
        ]

        return tableTitle;
    }
    //------------

    const requestAllRegistros = async() =>{
       
        const {url, options} = FORMULARIO_GRUPO_ALL_POST({}, getToken());


        const {response, json} = await request(url, options);
        console.log('All groups form here')
        console.log(json)
        if(json){
               setRegistro(json)
        }

            
    }

    React.useEffect(()=>{

        const requestAllRegistrosEffect = async() =>{
       
           await requestAllRegistros();

            
        }

        requestAllRegistrosEffect();

        
    }, [])

    React.useEffect(()=>{
        switch(acao){
            case 'editar':
                if(registroChoice > 0){
                    setAtualizarCadastro(true);
                }else{
                    setAtualizarCadastro(false);
                }
                break;
            
            case 'listar_item':
                if(registroChoice > 0){
                    setListarItem(true);
                }else{
                    setListarItem(false);
                }
                break;
            default:
                setAtualizarCadastro(false);
                break;

        }
        
    }, [registroChoice, acao])
    
    
    React.useEffect(()=>{

        if(cadastrarRegistro == true){
            setShowModalCriarRegistro(true);
        }else{
            setShowModalCriarRegistro(false);
        }

        
    }, [cadastrarRegistro])

    const atualizarRegistro = (idRegistro)=>{
        setRegistroChoice(idRegistro)
        setAcao('editar')
        setAtualizarCadastro(true);
    }

    const novoAtendimento = (idRegistro)=>{
        setRegistroChoice(idRegistro)
        setAcao('consultar')
        setAtualizarCadastro(true);
    }

    const exbirListaItem = (idRegistro)=>{
        setRegistroChoice(idRegistro)
        setAcao('listar_item')
        setListarItem(true);
    }

    
    const rowsTableArr = gerarTableRegistro();    
    const titulosTableArr = gerarTitleTable();
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
                            label:'Grupos'
                        }
                    ]}
            />
            <Row>
                <Col  xs="12" sm="12" md="3" className={'mb-4'}>
                    <Filter
                        filtersArr={filtersArr}
                        actionsArr={acoesBottomCard}
                    />
                </Col>
                <Col  xs="12" sm="12" md="9">
                    <Table
                        titulosTableArr={titulosTableArr}
                        rowsTableArr={rowsTableArr}
                        loading={loading}

                    />
                </Col>
            </Row>
            {
                cadastrarRegistro && <Cadastrar idFormulario={idFormulario} cadastrarRegistro={cadastrarRegistro} setCadastrarRegistro={setCadastrarRegistro} atualizarCadastro={atualizarCadastro} setAtualizarCadastro={setAtualizarCadastro}  idRegistro={registroChoice} setIdRegistro={setRegistroChoice} callback={requestAllRegistros} />
            }
            
            {
                atualizarCadastro &&
                <Atualizar atualizarCadastro={atualizarCadastro} setAtualizarCadastro={setAtualizarCadastro}  idRegistro={registroChoice} setIdRegistro={setRegistroChoice} callback={requestAllRegistros} />
            }

            {
                listarItems &&
                <Modal  noBtnConcluir={true} handleConcluir={()=>null}  title={'Items'} size="xl" propsConcluir={{'disabled':loading}} labelConcluir={null}  dialogClassName={'modal-90w'} aria-labelledby={'aria-labelledby'} labelCanelar="Fechar" show={listarItems} showHide={()=>{setShowModalItem();setListarItem(false);setRegistroChoice(null);}}>
                                
                    <ConstrutorFichaItem listarItems={listarItems} setListarItem={setListarItem}  idRegistro={registroChoice} setIdRegistro={setRegistroChoice} callback={requestAllRegistros} />
                
                </Modal>
            }
         </>

	)
}

export default ConstrutorFichaGrupo;

//<FormGrupo dataGrupo={dataGrupo} dataGrupoChoice={[]}  atualizarCadastro={false} setAtualizarCadastro={setAtualizarCadastro}  idRegistro={null} setIdRegistro={setRegistroChoice}  showModalCriarRegistro={showModalCriarRegistro} setShowModalCriarRegistro={setShowModalCriarRegistro} callback={requestAllRegistros} />
