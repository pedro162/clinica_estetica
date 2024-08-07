import React from 'react';
import estilos from './Clientes.module.css'
import useFetch from '../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, FORMULARIO_ALL_POST} from '../../api/endpoints/geral.js'
import {Col, Row } from 'react-bootstrap';
import Table from '../Relatorio/Table/index.js'
import Filter from '../Relatorio/Filter/index.js'
import Breadcrumbs from '../Helper/Breadcrumbs.js'
import { faHome, faSearch, faPlus, faChevronDown, faChevronUp, faBroom } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from '../Utils/Modal/index.js'
import Load from '../Utils/Load/index.js'
import Cadastrar from './Cadastrar/index.js'
import Atualizar from './Atualizar/index.js'
import {UserContex} from '../../Context/UserContex.js'
import FormCliente from './FormCliente/index.js'
import ConstrutorFichaGrupo from '../ConstrutorFichaGrupo/index.js'
import ConstrutorFichaItem from '../ConstrutorFichaItem/index.js'


const ConstrutorFicha = (props)=>{

	const {data, error, request, loading} = useFetch();
    const [registro, setRegistro] = React.useState([])
    const [exemplos, setExemplos] = React.useState([])
    const [exemplosTitleTable, setExemplosTitleTable] = React.useState([])
    const [showModalCriarRegistro, setShowModalCriarRegistro] = React.useState(false)
    const [showModalGrupo, setShowModalGrupo] = React.useState(false)
    const [showModalItem, setShowModalItem] = React.useState(false)
    const [showModalAtualizarRegistro, setShowModalAtualizarRegistro] = React.useState(false)
    const [registroChoice, setRegistroChoice] = React.useState(null);
    const [atualizarCadastro, setAtualizarCadastro] = React.useState(false)    
    const [cadastrarRegistro, setCadastrarRegistro] = React.useState(false)    
    const [listarGrupo, setListarGrupo] = React.useState(false)        
    const [listarItems, setListarItem] = React.useState(false)    
    const [marcarConsulta, setMarcarConsulta] = React.useState(false)    
    const [dataGrupo, setDataGrupo] = React.useState(null)
    const [acao, setAcao] = React.useState(null)
    const [mostarFiltros, setMostarFiltros] = React.useState(true) 
    const [nadaEncontrado, setNadaEncontrado] = React.useState(false)
    const [construtor, setConstrutor] = React.useState('')
    const [nameConstrutor, setNameConstrutor] = React.useState('')
    const [filtroMobile, setFiltroMobile] = React.useState('')
    const [ordenacao, setOrdenacao] = React.useState('')
    const [appliedFilters, setAppliedFilters] = React.useState([])
    const [nextPage, setNextPage] = React.useState(null)
    const [totalPageCount, setTotalPageCount] = React.useState(null)
    const [usePagination, setUsePagination] = React.useState(true)
    const [qtdItemsPerPage, setQtdItemsPerPage] = React.useState(10)


    const {getToken} = React.useContext(UserContex);

    const alerta = (target)=>{
        console.log(target)
    }

    const handleSearch = (ev)=>{
        if (ev.key === "Enter") {
            requestAllRegistros();
        }
    }

    const handleFiltroMobile = ({target})=>{
        setFiltroMobile(target.value)
    }

    const setCodConstrutor = ({target})=>{        
        setConstrutor(target.value)
    }
    const handleNameConstrutor = ({target})=>{        
        setNameConstrutor(target.value)
    }
    const setOrdenacaoFiltro = ({target})=>{
        
        setOrdenacao(target.value)
    }


    const filtersArr = [
        
        {
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Código construtor',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"2",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm",'construtor_id':construtor, value:construtor, onChange:setCodConstrutor, onBlur:setCodConstrutor, onKeyUp:handleSearch},

        },
        {
            type:'text',
            options:[], 
            hasLabel: true,
            contentLabel:'Descrição',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"2",className:'mb-2'},
            atributsFormControl:{'type':'text', size:"sm",'name_construtor':nameConstrutor, value:nameConstrutor, onChange:handleNameConstrutor, onBlur:handleNameConstrutor, onKeyUp:handleSearch},

        },
        {
            type:'select',
            options:[{'label':'Selecione...', 'value':''},{'label':'Código A-Z', 'value':'id-asc'},{'label':'Código Z-A', 'value':'id-desc'},
            {'label':'Construtor A-Z', 'value':'name-asc'},{'label':'Construtor Z-A', 'value':'name-desc'},], 
            hasLabel: true,
            contentLabel:'Classificar',
            atributsFormLabel:{},
            atributsContainer:{xs:"12", sm:"12", md:"2",className:'mb-2'},
            atributsFormControl:{'type':'select', size:"sm",'ordem':ordenacao, value:ordenacao, onChange:setOrdenacaoFiltro, onBlur:setOrdenacaoFiltro, onKeyUp:handleSearch},

        },

    ]

    const acoesBottomCard=[{
            label:'Pesquisar',
            icon:<FontAwesomeIcon icon={faSearch} />,
            props:{onClick:()=>requestAllRegistros(), className:'btn btn-sm botao_success'}
        },
        {
            label:'Limpar',
            icon:<FontAwesomeIcon icon={faBroom} />,
            props:{onClick:()=>limparFiltros(), className:'btn btn-sm btn-secondary mx-2'}
        },
        {
            label:'Cadastrar',
            icon:<FontAwesomeIcon icon={faPlus} />,
            props:{onClick:()=>setCadastrarRegistro(true), className:'btn btn-sm btn-secondary'}
        }
    ];


    const acoesHeaderCard=[{
            label:'',
            icon:<FontAwesomeIcon icon={(mostarFiltros ? faChevronDown : faChevronUp)} />,
            props:{onClick:()=>{setMostarFiltros(!mostarFiltros);}, className:'btn btn-sm btn-secondary'},
        },
    ];    


    const limparFiltros = ()=>{
        setNameConstrutor('');
        setConstrutor('');
        setFiltroMobile('');
        setOrdenacao('');
        setAppliedFilters([]);
        

    }
    
    const removeFilter = (key)=>{
         setAppliedFilters(prevFilters => {
            const updatedFilters = { ...prevFilters };
            delete updatedFilters[key];
            return updatedFilters;
        });
    }
    //------------
    const montarFiltro = ()=>{
        let filtros = {}
        let detalhesFiltros = {}

        if(usePagination){
            filtros['usePaginate'] = 1;
            filtros['nr_itens_per_page'] = qtdItemsPerPage;
        }

                
        if(construtor){
            filtros['id'] = construtor;   
            detalhesFiltros['id'] = {
                label:'Cód. referência',
                value:construtor,
                resetFilter:()=>{setConstrutor('');removeFilter('id')},
            };
        }

        if(nameConstrutor){
            filtros['name'] = nameConstrutor;
            detalhesFiltros['name'] = {
                label:'Construtor',
                value:nameConstrutor,
                resetFilter:()=>{setNameConstrutor('');removeFilter('name')},
            };
        }

        if(filtroMobile){
            filtros['name'] = filtroMobile;
            detalhesFiltros['name'] = {
                label:'Filtro',
                value:filtroMobile,
                resetFilter:()=>{setFiltroMobile('');removeFilter('name')},
            };
        }

        if(ordenacao){
            filtros['ordem'] = ordenacao;
            detalhesFiltros['ordem'] = {
                label:'Ordem',
                value:ordenacao,
                resetFilter:()=>{setOrdenacao('');removeFilter('ordem')},
            };
        }
        return {filtros, detalhesFiltros};
    }

    
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
                                {acao:()=>exbirListaGrupo(atual.id), label:'Grupos', propsOption:{}, propsLabel:{}},
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

        let {filtros, detalhesFiltros} = await montarFiltro();
        setAppliedFilters(detalhesFiltros)
        const {url, options} = FORMULARIO_ALL_POST({}, getToken());
        const {response, json} = await request(url, options);
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
            
            case 'listar_grupo':
                if(registroChoice > 0){
                    setListarGrupo(true);
                }else{
                    setListarGrupo(false);
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




    React.useEffect(()=>{
        let {filtros, detalhesFiltros} = montarFiltro();
        setAppliedFilters(detalhesFiltros)
    }, [])
    

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

    const exbirListaGrupo = (idRegistro)=>{
        setRegistroChoice(idRegistro)
        setAcao('listar_grupo')
        setListarGrupo(true);
    }


    const exbirListaItem = (idRegistro)=>{
        setRegistroChoice(idRegistro)
        setAcao('listar_item')
        setListarItem(true);
    }
    //listarGrupo, setListarGrupo
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
                            label:'Fichas'
                        }
                    ]}
            />
            <Row>
                <Col  xs="12" sm="12" md="12">
                    <Filter
                        filtersArr={filtersArr}
                        actionsArr={acoesBottomCard}
                        mostarFiltros={mostarFiltros}
                        setMostarFiltros={setMostarFiltros}
                        botoesHeader={acoesHeaderCard}
                        activeFilters={appliedFilters}
                    />
                </Col>
                <Col  xs="12" sm="12" md="12">
                    <Table
                        titulosTableArr={titulosTableArr}
                        rowsTableArr={rowsTableArr}
                        loading={loading}

                    />
                </Col>
            </Row>
            {
                cadastrarRegistro && <Cadastrar cadastrarRegistro={cadastrarRegistro} setCadastrarRegistro={setCadastrarRegistro} atualizarCadastro={atualizarCadastro} setAtualizarCadastro={setAtualizarCadastro}  idRegistro={registroChoice} setIdRegistro={setRegistroChoice} callback={requestAllRegistros} />
            }
            
            {
                atualizarCadastro &&
                <Atualizar atualizarCadastro={atualizarCadastro} setAtualizarCadastro={setAtualizarCadastro}  idRegistro={registroChoice} setIdRegistro={setRegistroChoice} callback={requestAllRegistros} />
            }

            {
                listarGrupo &&
                <Modal  noBtnConcluir={true} handleConcluir={()=>null}  title={'Grupos'} size="xl" propsConcluir={{'disabled':loading}} labelConcluir={null} dialogClassName={'modal-90w'} aria-labelledby={'aria-labelledby'} labelCanelar="Fechar" show={listarGrupo} showHide={()=>{setShowModalGrupo();setListarGrupo(false);setRegistroChoice(null);}}>
                                
                    <ConstrutorFichaGrupo listarGrupo={listarGrupo} setListarGrupo={setListarGrupo}  idRegistro={registroChoice} idFormulario={registroChoice} setIdRegistro={setRegistroChoice} callback={requestAllRegistros} />
                
                </Modal>
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

export default ConstrutorFicha;

//<FormCliente dataGrupo={dataGrupo} dataClienteChoice={[]}  atualizarCadastro={false} setAtualizarCadastro={setAtualizarCadastro}  idRegistro={null} setIdRegistro={setRegistroChoice}  showModalCriarRegistro={showModalCriarRegistro} setShowModalCriarRegistro={setShowModalCriarRegistro} callback={requestAllRegistros} />
