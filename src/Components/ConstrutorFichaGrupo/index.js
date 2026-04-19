import React from 'react';
import useFetch from '../../Hooks/useFetch.js';
import { FORMULARIO_GRUPO_ALL_POST, RECORD_NUMBER_PER_REQUEST } from '../../api/endpoints/geral.js';
import { Col, Row, Button } from 'react-bootstrap';
import Filter from '../Relatorio/Filter/index.js';
import Breadcrumbs from '../Helper/Breadcrumbs.js';
import { faSearch, faPlus, faChevronDown, faChevronUp, faBroom } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cadastrar from './Cadastrar/index.js';
import { UserContex } from '../../Context/UserContex.js';
import Include from './include';
import FormControlInput from '../FormControl/index.js';

const ConstrutorFichaGrupo = ({ idFormulario, ...props }) => {

    const { request, loading } = useFetch();
    const [registro, setRegistro] = React.useState([])
    const [registroChoice, setRegistroChoice] = React.useState(null);
    const [cadastrarRegistro, setCadastrarRegistro] = React.useState(false)
    const [atualizarCadastro, setAtualizarCadastro] = React.useState(false)
    const [mostarFiltros, setMostarFiltros] = React.useState(true)
    const [nadaEncontrado, setNadaEncontrado] = React.useState(false)
    const [nameGrupo, setNameGrupo] = React.useState('')
    const [filtroMobile, setFiltroMobile] = React.useState('')
    const [ordenacao, setOrdenacao] = React.useState('')
    const [appliedFilters, setAppliedFilters] = React.useState([])
    const [nextPage, setNextPage] = React.useState(null)
    const [totalPageCount, setTotalPageCount] = React.useState(null)
    const [usePagination, setUsePagination] = React.useState(true)
    const [qtdItemsPerPage, setQtdItemsPerPage] = React.useState(RECORD_NUMBER_PER_REQUEST)

    const { getToken } = React.useContext(UserContex);

    const handleSearch = (ev) => {
        if (ev.key === "Enter") {
            requestAllRegistros();
        }
    }

    const handleFiltroMobile = ({ target }) => {
        setFiltroMobile(target.value)
    }

    const setNameGrupoFilter = ({ target }) => {
        setNameGrupo(target.value)
    }

    const setOrdenacaoFiltro = ({ target }) => {
        setOrdenacao(target.value)
    }

    const filtersArr = [
        {
            type: 'text',
            options: [],
            hasLabel: true,
            contentLabel: 'Nome do grupo',
            atributsFormLabel: {},
            atributsContainer: { xs: "12", sm: "12", md: "3", className: 'mb-2' },
            atributsFormControl: { 'type': 'text', size: "sm", 'name': 'name', value: nameGrupo, onChange: setNameGrupoFilter, onBlur: setNameGrupoFilter, onKeyUp: handleSearch },
        },
        {
            type: 'select',
            options: [{ 'label': 'Selecione...', 'value': '' }, { 'label': 'Codigo A-Z', 'value': 'id-asc' }, { 'label': 'Codigo Z-A', 'value': 'id-desc' }, { 'label': 'Nome A-Z', 'value': 'name-asc' }, { 'label': 'Nome Z-A', 'value': 'name-desc' }],
            hasLabel: true,
            contentLabel: 'Classificar',
            atributsFormLabel: {},
            atributsContainer: { xs: "12", sm: "12", md: "3", className: 'mb-2' },
            atributsFormControl: { 'type': 'select', size: "sm", 'ordem': ordenacao, value: ordenacao, onChange: setOrdenacaoFiltro, onBlur: setOrdenacaoFiltro, onKeyUp: handleSearch },
        },
    ]

    const acoesBottomCard = [{
        label: 'Pesquisar',
        icon: <FontAwesomeIcon icon={faSearch} />,
        props: { onClick: () => requestAllRegistros(), className: 'btn btn-sm botao_success' }
    },
    {
        label: 'Limpar',
        icon: <FontAwesomeIcon icon={faBroom} />,
        props: { onClick: () => limparFiltros(), className: 'btn btn-sm btn-secondary mx-2' }
    },
    {
        label: 'Cadastrar',
        icon: <FontAwesomeIcon icon={faPlus} />,
        props: { onClick: () => setCadastrarRegistro(true), className: 'btn btn-sm btn-secondary' }
    }
    ];

    const acoesHeaderCard = [{
        label: '',
        icon: <FontAwesomeIcon icon={(mostarFiltros ? faChevronDown : faChevronUp)} />,
        props: { onClick: () => { setMostarFiltros(!mostarFiltros); }, className: 'btn btn-sm btn-secondary' },
    },
    ];

    const limparFiltros = () => {
        setNameGrupo('');
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

        if (idFormulario) {
            filtros['formulario_id'] = idFormulario;
        }

        if (nameGrupo) {
            filtros['name'] = nameGrupo;
            detalhesFiltros['name'] = {
                label: 'Grupo',
                value: nameGrupo,
                resetFilter: () => { setNameGrupo(''); removeFilter('name') },
            };
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

    const requestAllRegistros = async () => {
        let { filtros, detalhesFiltros } = await montarFiltro();
        await setAppliedFilters(detalhesFiltros)
        let { url, options } = FORMULARIO_GRUPO_ALL_POST({ ...filtros }, getToken());
        if (nextPage) {
            url = nextPage;
        }

        const { response, json } = await request(url, options);
        if (json) {
            setRegistro(json)
        }
    }

    React.useEffect(() => {
        const requestAllRegistrosEffect = async () => {
            await requestAllRegistros();
        }

        requestAllRegistrosEffect();
    }, [nextPage, setNextPage])


    React.useEffect(() => {
        let { filtros, detalhesFiltros } = montarFiltro();
        setAppliedFilters(detalhesFiltros)
    }, [])

    return (
        <>
            <Row>
                <Breadcrumbs
                    items={[
                        {
                            props: {},
                            label: 'Inicio'
                        },
                        {
                            props: {},
                            label: 'Grupos'
                        }
                    ]}
                    buttonFiltroMobile={true}
                    setMostarFiltros={setMostarFiltros}
                    mostarFiltros={mostarFiltros}
                />
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
                        <Col className={'mx-2'} >
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
                                                            requestAllRegistros();
                                                        }
                                                    },
                                                    value: filtroMobile,
                                                }
                                            }
                                        }
                                    />
                                </Col>

                                <Col xs="1" sm="1" md="1" style={{ textAlign: 'left', alignItems: 'center', justifyContent: 'center', margin: 'auto', padding: '0' }} >
                                    <FontAwesomeIcon onClick={() => { requestAllRegistros(); }} size={'lg'} icon={faSearch} />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className={'my-2'}>
                        <Col>
                            <Row>
                                <Col><span style={{ fontWeight: 'bolder', fontSize: '14pt' }} >Acoes</span></Col>
                            </Row>

                            <div>
                                <hr style={{ margin: '0', padding: '0' }} />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <div style={{ display: 'flex', flexDirection: 'collumn', flexWrap: 'wrap' }}>
                            <Button style={{ borderRadius: '50px', marginBottom: '10px', marginRight: '0.4rem' }} className={'btn btn-sm btn-secondary'} onClick={() => { setCadastrarRegistro(true); }} ><FontAwesomeIcon icon={faPlus} /> Grupo</Button>
                        </div>
                    </Row>
                </Col>
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
                        dataEstado={registro}
                        loadingData={loading}
                        requestAllRegistros={requestAllRegistros}
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
                cadastrarRegistro && <Cadastrar idFormulario={idFormulario} cadastrarRegistro={cadastrarRegistro} setCadastrarRegistro={setCadastrarRegistro} atualizarCadastro={atualizarCadastro} setAtualizarCadastro={setAtualizarCadastro} idRegistro={registroChoice} setIdRegistro={setRegistroChoice} callback={requestAllRegistros} />
            }
        </>
    )
}

export default ConstrutorFichaGrupo;
