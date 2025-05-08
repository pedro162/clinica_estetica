import React from 'react';
import estilos from './Parametro.module.css'
import useFetch from '../../Hooks/useFetch.js';
import { TOKEN_POST, CLIENT_ID, CLIENT_SECRET, PARAMETRO_ALL_POST, RECORD_NUMBER_PER_REQUEST } from '../../api/endpoints/geral.js'
import { FORMAT_DATA_PT_BR } from '../../functions/index.js'
import { Col, Row, Button } from 'react-bootstrap';
import Table from '../Relatorio/Table/index.js'
import Filter from '../Relatorio/Filter/index.js'
import Breadcrumbs from '../Helper/Breadcrumbs.js'
import { faHome, faSearch, faPlus, faTimes, faChevronUp, faChevronDown, faBrush, faBroom } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from '../Utils/Modal/index.js'
import Load from '../Utils/Load/index.js'
import { UserContex } from '../../Context/UserContex.js'
import FormParametro from './FormParametro/index.js'
import Cadastrar from './Cadastrar/index.js'
import Atualizar from './Atualizar/index.js'
import Include from './include';
import FormControlInput from '../FormControl/index.js'
import { FORMAT_CALC_COD, FORMAT_MONEY } from '../../functions/index.js'
import { Link } from 'react-router-dom/cjs/react-router-dom.min.js';

const Parametro = ({ defaultFilters, ...props }) => {

    const { data, error, request, loading } = useFetch();
    const [estado, setParametro] = React.useState([])
    const [exemplos, setExemplos] = React.useState([])
    const [exemplosTitleTable, setExemplosTitleTable] = React.useState([])
    const [showModalCriarParametro, setShowModalCriarConstula] = React.useState(false)
    const [consultaChoice, setParametroChoice] = React.useState(null);
    const [atualizarParametro, setAtualizarParametro] = React.useState(false)
    const [cancelarParametro, setCancelarParametro] = React.useState(false)
    const [digitarParametro, setDigitarParametro] = React.useState(false)
    const [cadastrarParametro, setCadastrarParametro] = React.useState(false)
    const [mostarFiltros, setMostarFiltros] = React.useState(true)
    const [acao, setAcao] = React.useState(null)
    const [filtroMobile, setFiltroMobile] = React.useState(null)
    const [filtroAbertas, setFiltroAbertas] = React.useState(false)
    const [filtroPagas, setFiltroPagas] = React.useState(false)
    const [filtroVencidas, setFiltroVencidas] = React.useState(false)
    const [filtroAvencer, setFiltroAvencer] = React.useState(false)
    const [nadaEncontrado, setNadaEncontrado] = React.useState(false)
    const [appliedFilters, setAppliedFilters] = React.useState([])
    const [nextPage, setNextPage] = React.useState(null)
    const [totalPageCount, setTotalPageCount] = React.useState(null)
    const [usePagination, setUsePagination] = React.useState(true)
    const [qtdItemsPerPage, setQtdItemsPerPage] = React.useState(RECORD_NUMBER_PER_REQUEST)

    const [idParametro, setIdParametro] = React.useState(() => {
        return defaultFilters?.referencia_id
    })
    const [parametroName, setParametroName] = React.useState(() => {
        return defaultFilters?.name_parametro
    })

    const { getToken } = React.useContext(UserContex);

    const handleSearch = (ev) => {
        if (ev.key === "Enter") {
            requestAllParametros();
        }
    }

    const handleFiltroMobile = ({ target }) => {
        setFiltroMobile(target.value)
    }

    const setNameParametro = ({ target }) => {
        setParametroName(target.value)
    }

    const handleParametroId = ({ target }) => {
        setIdParametro(target.value)
    }

    const filtersArr = [
        {
            type: 'text',
            options: [],
            hasLabel: true,
            contentLabel: 'Código',
            atributsFormLabel: {},
            atributsContainer: { xs: "12", sm: "12", md: "2", className: 'mb-2' },
            atributsFormControl: { 'type': 'text', size: "sm", 'name': idParametro, value: idParametro, onChange: handleParametroId, onBlur: handleParametroId, onKeyUp: handleSearch },

        },
        {
            type: 'text',
            options: [],
            hasLabel: true,
            contentLabel: 'Parãmetro',
            atributsFormLabel: {},
            atributsContainer: { xs: "12", sm: "12", md: "2", className: 'mb-2' },
            atributsFormControl: { 'type': 'text', size: "sm", 'name_atendido': parametroName, value: parametroName, onChange: setNameParametro, onBlur: setNameParametro, onKeyUp: handleSearch },

        },
    ]

    const acoesBottomCard = [
        {
            label: 'Pesquisar',
            icon: <FontAwesomeIcon icon={faSearch} />,
            props: { onClick: () => requestAllParametros(), className: 'btn btn-sm botao_success' }
        },
        {
            label: 'Limpar',
            icon: <FontAwesomeIcon icon={faBroom} />,
            props: { onClick: () => limparFiltros(), className: 'btn btn-sm btn-secondary mx-2' }
        },
        {
            label: 'Cadastrar',
            icon: <FontAwesomeIcon icon={faPlus} />,
            props: { onClick: () => setCadastrarParametro(true), className: 'btn btn-sm btn-secondary' }
        }
    ];

    const acoesHeaderCard = [
        {
            label: '',
            icon: <FontAwesomeIcon icon={(mostarFiltros ? faChevronDown : faChevronUp)} />,
            props: { onClick: () => { setMostarFiltros(!mostarFiltros); }, className: 'btn btn-sm btn-secondary' },
        },
    ];

    React.useEffect(() => {

        if (cadastrarParametro == true) {
            setShowModalCriarConstula(true);
        } else {
            setShowModalCriarConstula(false);
        }
    }, [cadastrarParametro])

    const limparFiltros = () => {
        setIdParametro('');
        setParametroName('');
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

        if (idParametro) {
            filtros['id'] = idParametro;
            detalhesFiltros['id'] = {
                label: 'Cód. referência',
                value: idParametro,
                resetFilter: () => { setIdParametro(''); removeFilter('id') },
            };
        }

        if (parametroName) {
            filtros['name_parametro'] = parametroName;
            detalhesFiltros['name_parametro'] = {
                label: 'Parâmetro',
                value: parametroName,
                resetFilter: () => { setParametroName(''); removeFilter('name_parametro') },
            };
        }

        if (filtroMobile) {
            filtros['parametro_name'] = filtroMobile;
            detalhesFiltros['parametro_name'] = {
                label: 'Filtro',
                value: filtroMobile,
                resetFilter: () => { setFiltroMobile(''); removeFilter('parametro_name') },
            };
        }

        return { filtros, detalhesFiltros };
    }

    const requestAllParametros = async () => {
        setParametro([])
        setNadaEncontrado(false)

        let { filtros, detalhesFiltros } = montarFiltro();
        setAppliedFilters(detalhesFiltros)
        let { url, options } = PARAMETRO_ALL_POST({ ...filtros }, getToken());

        if (nextPage) {
            url = nextPage;
        }

        const { response, json } = await request(url, options);

        if (json) {
            setParametro(json)

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

        const requestAllParametrosEffect = async () => {
            await requestAllParametros();
        }
        requestAllParametrosEffect();

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
                    }, {
                        props: {},
                        label: <> <Link className={null} to={'/configuracoes/sistema'}>Configuracoes</Link></>
                    },
                    {
                        props: {},
                        label: 'Parâmetros'
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
                            <Col xs="12" sm="12" md="13" className={'default_card_report mb-4'}>
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
                                <Row className={'mb-3'} >
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
                                                                        requestAllParametros();
                                                                    }
                                                                },
                                                                value: filtroMobile,

                                                            }
                                                        }
                                                    }
                                                />
                                            </Col>

                                            <Col xs="1" sm="1" md="1" style={{ textAlign: 'left', alignItems: 'center', justifyContent: 'center', margin: 'auto', padding: '0' }} >
                                                <FontAwesomeIcon onClick={() => { requestAllParametros(); }} size={'lg'} icon={faSearch} />
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
                                        <Button style={{ borderRadius: '50px', marginBottom: '10px', marginRight: '0.4rem' }} className={'btn btn-sm btn-secondary'} onClick={() => { setCadastrarParametro(true); }} ><FontAwesomeIcon icon={faPlus} /> Parametro</Button>
                                    </div>
                                </Row>
                            </Col>
                        </>
                    )
                }

                <Col style={{ backgroundColor: '#FFF' }} className={'pt-3 mobile_card_report'} >
                    <Row>
                        <Col><span style={{ fontWeight: 'bolder', fontSize: '14pt' }} >Resultado</span></Col>
                    </Row>
                    <div>
                        <hr style={{ margin: '0', padding: '0' }} />
                    </div>
                </Col>

                <Col xs="12" sm="12" md={'12'} >
                    <Include
                        dataEstado={estado}
                        loadingData={loading}
                        callBack={requestAllParametros}
                        setMostarFiltros={setMostarFiltros}
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
                cadastrarParametro &&
                <Cadastrar cadastrarParametro={cadastrarParametro} setCadastrarParametro={setCadastrarParametro} atualizarParametro={atualizarParametro} setAtualizarParametro={setAtualizarParametro} idParametro={consultaChoice} setIdParametro={setParametroChoice} callback={requestAllParametros} />
            }

        </>

    )
}

export default Parametro;