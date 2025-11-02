import React from 'react';
import useFetch from '../../Hooks/useFetch.js';
import { RECORD_NUMBER_PER_REQUEST } from '../../api/endpoints/geral.js'
import { BANDEIRA_CARTAO_ALL_POST } from './Routes/index.js'
import { Col, Row, Button } from 'react-bootstrap';
import Filter from '../Relatorio/Filter/index.js'
import Breadcrumbs from '../Helper/Breadcrumbs.js'
import { faSearch, faPlus, faChevronUp, faChevronDown, faBroom } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserContex } from '../../Context/UserContex.js'
import Cadastrar from './Cadastrar/index.js'
import Include from './include.js';
import FormControlInput from '../FormControl/index.js'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';


const CartaoCreditoBandeira = (props) => {

    const { data, error, request, loading } = useFetch();
    const [estado, setCartaoCreditoBandeira] = React.useState([])
    const [showModalCriarCartaoCreditoBandeira, setShowModalCriarConstula] = React.useState(false)
    const [consultaChoice, setCartaoCreditoBandeiraChoice] = React.useState(null);
    const [atualizarCartaoCreditoBandeira, setAtualizarCartaoCreditoBandeira] = React.useState(false)
    const [cadastrarCartaoCreditoBandeira, setCadastrarCartaoCreditoBandeira] = React.useState(false)
    const [mostarFiltros, setMostarFiltros] = React.useState(true)
    const [acao, setAcao] = React.useState(null)
    const [nome, setNome] = React.useState('')
    const [codigoCartaoCreditoBandeira, setCodigoCartaoCreditoBandeira] = React.useState(null)
    const [filtroMobile, setFiltroMobile] = React.useState(null)
    const [nadaEncontrado, setNadaEncontrado] = React.useState(false)
    const [ordenacao, setOrdenacao] = React.useState('')
    const [nextPage, setNextPage] = React.useState(null)
    const [totalPageCount, setTotalPageCount] = React.useState(null)
    const [usePagination, setUsePagination] = React.useState(true)
    const [qtdItemsPerPage, setQtdItemsPerPage] = React.useState(RECORD_NUMBER_PER_REQUEST)
    const [appliedFilters, setAppliedFilters] = React.useState([])

    const { getToken, dataUser, isMobile } = React.useContext(UserContex);

    const { type, is_system, tenant_id } = dataUser ? dataUser : {};

    const handleSearch = (ev) => {
        if (ev.key === "Enter") {
            requestAllCartaoCreditoBandeiras();
        }
    }

    const handleNameFilter = ({ target }) => {
        setNome(target.value)
    }

    const handleFiltroMobile = ({ target }) => {
        setFiltroMobile(target.value)
    }

    const handleCodigoCartaoCreditoBandeiraFilter = ({ target }) => {
        setCodigoCartaoCreditoBandeira(target.value)
    }

    const setOrdenacaoFiltro = ({ target }) => {

        setOrdenacao(target.value)
    }

    const filtersArr = [
        {
            type: 'text',
            options: [],
            hasLabel: true,
            contentLabel: 'Código',
            atributsFormLabel: {},
            atributsContainer: { xs: "12", sm: "12", md: "2", className: 'mb-2' },
            atributsFormControl: { 'type': 'text', size: "sm", 'name': 'id', value: codigoCartaoCreditoBandeira, onChange: handleCodigoCartaoCreditoBandeiraFilter, onBlur: handleCodigoCartaoCreditoBandeiraFilter, onKeyUp: handleSearch },

        },
        {
            type: 'text',
            options: [],
            hasLabel: true,
            contentLabel: 'Nome',
            atributsFormLabel: {},
            atributsContainer: { xs: "12", sm: "12", md: "2", className: 'mb-2' },
            atributsFormControl: { 'type': 'text', size: "sm", name: 'name', value: nome, onChange: handleNameFilter, onBlur: handleNameFilter, onKeyUp: handleSearch },

        },
        {
            type: 'select',
            options: [{ 'label': 'Selecione...', 'value': '' }, { 'label': 'Código A-Z', 'value': 'id-asc' }, { 'label': 'Código Z-A', 'value': 'id-desc' },],
            hasLabel: true,
            contentLabel: 'Classificar',
            atributsFormLabel: {},
            atributsContainer: { xs: "12", sm: "12", md: "2", className: 'mb-2' },
            atributsFormControl: { 'type': 'select', size: "sm", 'ordem': ordenacao, value: ordenacao, onChange: setOrdenacaoFiltro, onBlur: setOrdenacaoFiltro, onKeyUp: handleSearch },

        },
    ]

    const acoesBottomCard = [
        {
            label: 'Pesquisar',
            icon: <FontAwesomeIcon icon={faSearch} />,
            props: { onClick: () => requestAllCartaoCreditoBandeiras(), className: 'btn btn-sm botao_success' }
        },
        {
            label: 'Limpar',
            icon: <FontAwesomeIcon icon={faBroom} />,
            props: { onClick: () => limparFiltros(), className: 'btn btn-sm btn-secondary mx-2' }
        },
        {
            label: 'Cadastrar',
            icon: <FontAwesomeIcon icon={faPlus} />,
            props: { onClick: () => setCadastrarCartaoCreditoBandeira(true), className: 'btn btn-sm mx-2 btn-secondary' }
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

        if (cadastrarCartaoCreditoBandeira == true) {
            setShowModalCriarConstula(true);
        } else {
            setShowModalCriarConstula(false);
        }

    }, [cadastrarCartaoCreditoBandeira])

    const limparFiltros = () => {
        setNome('');
        setFiltroMobile('');
        setCodigoCartaoCreditoBandeira('');
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

        if (codigoCartaoCreditoBandeira) {
            filtros['id'] = codigoCartaoCreditoBandeira;
            detalhesFiltros['id'] = {
                label: 'Código',
                value: codigoCartaoCreditoBandeira,
                resetFilter: () => { setCodigoCartaoCreditoBandeira(''); removeFilter('id') },
            };
        }

        if (nome) {
            filtros['name'] = nome;
            detalhesFiltros['name'] = {
                label: 'name',
                value: nome,
                resetFilter: () => { setNome(''); removeFilter('name') },
            };
        }

        if (filtroMobile) {
            filtros['name'] = filtroMobile;
            detalhesFiltros['name'] = {
                label: 'Filtro',
                value: filtroMobile,
                resetFilter: () => { setFiltroMobile(''); removeFilter('name'); },
            };
        }

        if (ordenacao) {
            filtros['ordem'] = ordenacao;
            detalhesFiltros['ordem'] = {
                label: 'Ordem',
                value: ordenacao,
                resetFilter: () => { setOrdenacao(''); removeFilter('ordem'); },
            };
        }

        return { filtros, detalhesFiltros };
    }

    const requestAllCartaoCreditoBandeiras = async () => {
        setCartaoCreditoBandeira([])

        let { filtros, detalhesFiltros } = montarFiltro();
        setAppliedFilters(detalhesFiltros)
        let { url, options } = BANDEIRA_CARTAO_ALL_POST({ ...filtros }, getToken());

        if (nextPage) {
            url = nextPage;
        }

        const { response, json } = await request(url, options);

        if (json) {
            setCartaoCreditoBandeira(json)

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
        const requestAllCartaoCreditoBandeirasEffect = async () => {
            await requestAllCartaoCreditoBandeiras();
        }

        requestAllCartaoCreditoBandeirasEffect();

    }, [nextPage, setNextPage])

    return (
        <>
            <Breadcrumbs
                items={[
                    {
                        props: {},
                        label: <> <Link className={null} to={'/home/painel'}>Início</Link></>
                    },
                    {
                        props: {},
                        label: 'Bandeiras de cartões'
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

                            <Col xs="12" sm="12" md="12" className={'default_card_report mb-4'} >
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
                                                                        requestAllCartaoCreditoBandeiras();
                                                                    }
                                                                },
                                                                value: filtroMobile

                                                            }
                                                        }
                                                    }
                                                />
                                            </Col>

                                            <Col xs="1" sm="1" md="1" style={{ textAlign: 'left', alignItems: 'center', justifyContent: 'center', margin: 'auto', padding: '0' }} >
                                                <FontAwesomeIcon onClick={() => { requestAllCartaoCreditoBandeiras(); }} size={'lg'} icon={faSearch} />
                                            </Col>
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
                                        <Button style={{ borderRadius: '50px', marginBottom: '10px', marginRight: '0.4rem' }} className={'btn btn-sm btn-secondary'} onClick={() => { setCadastrarCartaoCreditoBandeira(true); }} ><FontAwesomeIcon icon={faPlus} /> Bandeira de cartão </Button>
                                    </div>
                                </Row>
                            </Col>
                        </>
                    )
                }
                <Col xs="12" sm="12" md="12" style={{ backgroundColor: '#FFF' }} className={'pt-3 mobile_card_report'} >
                    <Row>
                        <Col><span style={{ fontWeight: 'bolder', fontSize: '14pt' }} >Resultado</span></Col>
                    </Row>
                    <div>
                        <hr style={{ margin: '0', padding: '0' }} />
                    </div>
                </Col>

                <Col xs="12" sm="12" md={'12'}>
                    <Include
                        dataEstado={estado}
                        loadingData={loading}
                        callBack={requestAllCartaoCreditoBandeiras}
                        requestAllCartaoCreditoBandeiras={requestAllCartaoCreditoBandeiras}
                        setMostarFiltros={setMostarFiltros}
                        idCartaoCreditoBandeiraCriada={consultaChoice}
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
                cadastrarCartaoCreditoBandeira && <Cadastrar cadastrarCartaoCreditoBandeira={cadastrarCartaoCreditoBandeira} setCadastrarCartaoCreditoBandeira={setCadastrarCartaoCreditoBandeira} atualizarCartaoCreditoBandeira={atualizarCartaoCreditoBandeira} setAtualizarCartaoCreditoBandeira={setAtualizarCartaoCreditoBandeira} idCartaoCreditoBandeira={consultaChoice} setIdCartaoCreditoBandeira={setCartaoCreditoBandeiraChoice} callback={requestAllCartaoCreditoBandeiras} />
            }


        </>

    )
}

export default CartaoCreditoBandeira;