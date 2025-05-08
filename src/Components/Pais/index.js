import React from 'react';
import estilos from './Pais.module.css'
import useFetch from '../../Hooks/useFetch.js';
import { TOKEN_POST, CLIENT_ID, CLIENT_SECRET, PAIS_ALL_POST, RECORD_NUMBER_PER_REQUEST } from '../../api/endpoints/geral.js'
import { Col, Row, Button } from 'react-bootstrap';
import Table from '../Relatorio/Table/index.js'
import Filter from '../Relatorio/Filter/index.js'
import Breadcrumbs from '../Helper/Breadcrumbs.js'
import { faHome, faSearch, faPlus, faChevronDown, faChevronUp, faBroom } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from '../Utils/Modal/index.js'
import Load from '../Utils/Load/index.js'
import { UserContex } from '../../Context/UserContex.js'
import FormPais from './FormPais/index.js'
import Include from './include';
import FormControlInput from '../FormControl/index.js'
import Cadastrar from './Cadastrar/index.js'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';


const Pais = (props) => {

    const { data, error, request, loading } = useFetch();
    const [estado, setPais] = React.useState([])
    const [exemplos, setExemplos] = React.useState([])
    const [exemplosTitleTable, setExemplosTitleTable] = React.useState([])
    const [showModalCriarPais, setShowModalCriarPais] = React.useState(false)
    const [mostarFiltros, setMostarFiltros] = React.useState(true)
    const [filtroMobile, setFiltroMobile] = React.useState(null)
    const [acao, setAcao] = React.useState(null)
    const [ordenacao, setOrdenacao] = React.useState('')
    const [nadaEncontrado, setNadaEncontrado] = React.useState(false)
    const [consultaChoice, setPaisChoice] = React.useState(null);
    const [cadastrarPais, setCadastrarPais] = React.useState(false)
    const [atualizarPais, setAtualizarPais] = React.useState(false)
    const [nomePais, setNomePais] = React.useState(null)
    const [codidoSistemaPais, setCodigoSistemaPais] = React.useState(null)
    const [appliedFilters, setAppliedFilters] = React.useState([])
    const [nextPage, setNextPage] = React.useState(null)
    const [totalPageCount, setTotalPageCount] = React.useState(null)
    const [usePagination, setUsePagination] = React.useState(true)
    const [qtdItemsPerPage, setQtdItemsPerPage] = React.useState(RECORD_NUMBER_PER_REQUEST)

    const { getToken } = React.useContext(UserContex);

    const handleFiltroMobile = ({ target }) => {
        setFiltroMobile(target.value)
    }

    const setNamePaisFiltro = ({ target }) => {

        setNomePais(target.value)
    }

    const setCodigoSistemaPaisFiltro = ({ target }) => {

        setCodigoSistemaPais(target.value)
    }

    const setOrdenacaoFiltro = ({ target }) => {

        setOrdenacao(target.value)
    }

    const handleSearch = (ev) => {
        if (ev.key === "Enter") {
            requestAllPaises();
        }
    }

    const limparFiltros = () => {
        setCodigoSistemaPais('');
        setNomePais('');
        setFiltroMobile('');
        setOrdenacao('');
        setAppliedFilters([]);
    }

    const removeFilter = (key) => {
        setAppliedFilters(prevFilters => {
            const updatedFilters = { ...prevFilters };
            delete updatedFilters[key];
            return updatedFilters;
        });
    }

    const montarFiltro = () => {
        let filtros = {}
        let detalhesFiltros = {}

        if (usePagination) {
            filtros['usePaginate'] = 1;
            filtros['nr_itens_per_page'] = qtdItemsPerPage;
        }

        if (codidoSistemaPais) {
            filtros['id'] = codidoSistemaPais;
            detalhesFiltros['id'] = {
                label: 'id',
                value: codidoSistemaPais,
                resetFilter: () => { setCodigoSistemaPais(''); removeFilter('id') },
            };
        }

        if (nomePais) {
            filtros['name'] = nomePais;
            detalhesFiltros['name'] = {
                label: 'name',
                value: nomePais,
                resetFilter: () => { setNomePais(''); removeFilter('name') },
            };

            filtros['name_nomepais'] = nomePais;
        }

        if (filtroMobile) {
            filtros['name'] = filtroMobile;
            detalhesFiltros['name'] = {
                label: 'Filtro',
                value: filtroMobile,
                resetFilter: () => { setFiltroMobile(''); removeFilter('name') },
            };
        }

        if (ordenacao) {
            filtros['ordem'] = ordenacao;
            detalhesFiltros['ordem'] = {
                label: 'Ordem',
                value: ordenacao,
                resetFilter: () => { setOrdenacao(''); removeFilter('ordem') },
            };
        }

        return { filtros, detalhesFiltros };
    }

    const filtersArr = [
        {
            type: 'text',
            options: [],
            hasLabel: true,
            contentLabel: 'Código',
            atributsFormLabel: {},
            atributsContainer: { xs: "12", sm: "12", md: "2", className: 'mb-2' },
            atributsFormControl: { 'type': 'text', size: "sm", 'name': codidoSistemaPais, value: codidoSistemaPais, onChange: setCodigoSistemaPaisFiltro, onBlur: setCodigoSistemaPaisFiltro, onKeyUp: handleSearch },

        }, {
            type: 'text',
            options: [],
            hasLabel: true,
            contentLabel: 'Pais',
            atributsFormLabel: {},
            atributsContainer: { xs: "12", sm: "12", md: "2", className: 'mb-2' },
            atributsFormControl: { 'type': 'text', size: "sm", 'name': nomePais, value: nomePais, onChange: setNamePaisFiltro, onBlur: setNamePaisFiltro, onKeyUp: handleSearch },

        },
        {
            type: 'select',
            options: [{ 'label': 'Selecione...', 'value': '' }, { 'label': 'Código A-Z', 'value': 'id-asc' }, { 'label': 'Código Z-A', 'value': 'id-desc' },
            { 'label': 'Pais A-Z', 'value': 'name-asc' }, { 'label': 'Pais Z-A', 'value': 'name-desc' },],
            hasLabel: true,
            contentLabel: 'Classificar',
            atributsFormLabel: {},
            atributsContainer: { xs: "12", sm: "12", md: "2", className: 'mb-2' },
            atributsFormControl: { 'type': 'select', size: "sm", 'ordem': ordenacao, value: ordenacao, onChange: setOrdenacaoFiltro, onBlur: setOrdenacaoFiltro, onKeyUp: handleSearch },

        },
    ]

    const acoesBottomCard = [{
        label: 'Pesquisar',
        icon: <FontAwesomeIcon icon={faSearch} />,
        props: { onClick: () => requestAllPaises(), className: 'btn btn-sm botao_success' }
    },
    {
        label: 'Limpar',
        icon: <FontAwesomeIcon icon={faBroom} />,
        props: { onClick: () => limparFiltros(), className: 'btn btn-sm btn-secondary mx-2' }
    },
    {
        label: 'Cadastrar país',
        icon: <FontAwesomeIcon icon={faPlus} />,
        props: { onClick: () => setCadastrarPais(true), className: 'btn btn-sm btn-secondary' }
    }
    ];

    const acoesHeaderCard = [
        {
            label: '',
            icon: <FontAwesomeIcon icon={(mostarFiltros ? faChevronDown : faChevronUp)} />,
            props: { onClick: () => { setMostarFiltros(!mostarFiltros); }, className: 'btn btn-sm btn-secondary' },
        },
    ];

    const requestAllPaises = async () => {

        setPais([])
        let { filtros, detalhesFiltros } = montarFiltro();
        setAppliedFilters(detalhesFiltros)
        let { url, options } = PAIS_ALL_POST({ ...filtros }, getToken());

        if (nextPage) {
            url = nextPage;
        }

        const { response, json } = await request(url, options);

        if (json) {
            setPais(json)

            if (json?.mensagem && json?.mensagem.length > 0) {
                setNadaEncontrado(false)
            } else {
                setNadaEncontrado(true)
            }

        } else {
            setNadaEncontrado(true)
        }

    }

    React.useEffect(() => {

        const requestAllPaisesEffect = async () => {
            await requestAllPaises();
        }

        requestAllPaisesEffect();

    }, [nextPage, setNextPage])

    React.useEffect(() => {
        let { filtros, detalhesFiltros } = montarFiltro();
        setAppliedFilters(detalhesFiltros)
    }, [])

    return (
        <>
            <Breadcrumbs
                items={[
                    {
                        props: {},
                        label: <> <Link className={null} to={'/'}>Início</Link></>
                    },
                    {
                        props: {},
                        label: 'Pais'
                    }
                ]}

                buttonFiltroMobile={true}
                setMostarFiltros={setMostarFiltros}
                mostarFiltros={mostarFiltros}
            />
            <Row>
                {
                    (
                        <>
                            <Col xs="12" sm="12" md="12" className={'default_card_report mb-4'}>
                                <Filter
                                    filtersArr={filtersArr}
                                    actionsArr={acoesBottomCard}
                                    mostarFiltros={mostarFiltros}
                                    setMostarFiltros={setMostarFiltros}
                                    botoesHeader={acoesHeaderCard}
                                    activeFilters={appliedFilters}
                                />
                            </Col>

                            <Col xs="12" sm="12" md="12" className={'mobile_card_report pt-4'} style={{ backgroundColor: '#FFF' }}>
                                <Row className={''} >
                                    <Col className={'mx-2'}  >
                                        <Row style={{ borderRadius: '24px 24px 24px 24px', border: '1px solid #000' }}>
                                            <Col xs="11" sm="11" md="11" >
                                                <FormControlInput
                                                    data={
                                                        {
                                                            atributsFormControl: {
                                                                type: 'input',
                                                                placeholder: 'Search...',
                                                                style: {
                                                                    border: 'none',
                                                                    outline: '0',
                                                                    'box-shadow': '0 0 0 0',
                                                                    height: '50px',
                                                                    borderRadius: '24px 24px 24px 24px'

                                                                },
                                                                onChange: (ev) => { handleFiltroMobile(ev); },
                                                                onBlur: (ev) => { handleFiltroMobile(ev); },
                                                                onKeyUp: (ev) => {

                                                                    if (ev.key === "Enter") {
                                                                        requestAllPaises();
                                                                    }
                                                                },
                                                                value: filtroMobile

                                                            }
                                                        }
                                                    }
                                                />
                                            </Col>

                                            <Col xs="1" sm="1" md="1" style={{ textAlign: 'left', alignItems: 'center', justifyContent: 'center', margin: 'auto', padding: '0' }} >
                                                <FontAwesomeIcon onClick={() => { requestAllPaises(); }} size={'lg'} icon={faSearch} />
                                            </Col>


                                        </Row>

                                        <Row className={'mt-2'}>
                                            <div style={{ display: 'flex', flexDirection: 'collumn', flexWrap: 'wrap' }}>
                                            </div>
                                        </Row>
                                    </Col>


                                </Row>
                                <Row className={'my-2'}>
                                    <Col>
                                        <Row>
                                            <Col><span style={{ fontWeight: 'bolder', fontSize: '14pt' }} >Ações</span></Col>
                                        </Row>

                                        <div>
                                            <hr style={{ margin: '0', padding: '0' }} />
                                        </div>
                                    </Col>
                                </Row>
                                <Row>

                                    <div style={{ display: 'flex', flexDirection: 'collumn', flexWrap: 'wrap' }}>
                                        <Button style={{ borderRadius: '50px', marginBottom: '10px', marginRight: '0.4rem' }} className={'btn btn-sm btn-secondary'} onClick={() => { setCadastrarPais(true); }} ><FontAwesomeIcon icon={faPlus} /> Cadastrar país</Button>
                                    </div>
                                </Row>
                            </Col>
                        </>
                    )
                }

                <Col style={{ backgroundColor: '#FFF' }} className={'pt-3 mobile_card_report'}>
                    <Row>
                        <Col><span style={{ fontWeight: 'bolder' }} >Resultado</span></Col>
                    </Row>
                    <div>
                        <hr style={{ margin: '0', padding: '0' }} />
                    </div>
                </Col>

                <Col xs="12" sm="12" md={"12"}>
                    <Include
                        dataEstado={estado}
                        loadingData={loading}
                        callBack={requestAllPaises}
                        setMostarFiltros={setMostarFiltros}
                        idOrdemCriada={consultaChoice}
                        nadaEncontrado={nadaEncontrado}
                        nextPage={nextPage}
                        setNextPage={setNextPage}
                        usePagination={usePagination}
                        setUsePagination={setUsePagination}
                        totalPageCount={totalPageCount}
                        setTotalPageCount={setTotalPageCount}
                    />
                </Col>
            </Row>

            {
                cadastrarPais &&
                <Cadastrar cadastrarPais={cadastrarPais} setCadastrarPais={setCadastrarPais} atualizarPais={atualizarPais} setAtualizarPais={setAtualizarPais} setAtualizarCadastro={setCadastrarPais} idPais={consultaChoice} setIdPais={setPaisChoice} callback={requestAllPaises} />
            }
        </>

    )
}

export default Pais;