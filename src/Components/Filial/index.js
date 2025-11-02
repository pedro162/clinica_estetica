import React from 'react';
import estilos from './Filial.module.css';
import useFetch from '../../Hooks/useFetch.js';
import useModal from '../../Hooks/useModal.js';
import { TOKEN_POST, CLIENT_ID, CLIENT_SECRET, FILIAIS_ALL_POST, RECORD_NUMBER_PER_REQUEST } from '../../api/endpoints/geral.js'
import { FORMAT_DATA_PT_BR } from '../../functions/index.js'
import { IS_MOBILE, MOBILE_WITH, isMobileYet, WINDOW_WIDTH } from '../../var/index.js'
import { Col, Row, Button } from 'react-bootstrap';
import Table from '../Relatorio/Table/index.js'
import Filter from '../Relatorio/Filter/index.js'
import Breadcrumbs from '../Helper/Breadcrumbs.js';
import { faHome, faSearch, faPlus, faTimes, faChevronDown, faChevronUp, faBroom } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from '../Utils/Modal/index.js'
import Load from '../Utils/Load/index.js'
import { UserContex } from '../../Context/UserContex.js'
import FormFilial from './FormFilial/index.js'
import Cadastrar from './Cadastrar/index.js'
import Include from './include';
import FormControlInput from '../FormControl/index.js'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const Filial = ({defaultFilters, callBakSelectedItem, ignoreTableActions, ...props}) => {
    const { data, error, request, loading } = useFetch();
    const [estado, setFilial] = React.useState([])
    const [showModalCriarFilial, setShowModalCriarFilial] = React.useState(false)
    const [filialChoice, setFilialChoice] = React.useState(null);
    const [atualizarFilial, setAtualizarFilial] = React.useState(false)
    const [cadastrarFilial, setCadastrarFilial] = React.useState(false)
    const [mostarFiltros, setMostarFiltros] = React.useState(true)
    const [acao, setAcao] = React.useState(null)
    const [pessoa, setPessoa] = React.useState('')
    const [codigoPessoa, setCodigoPessoa] = React.useState(null)
    const [codigoFilial, setCodigoFilial] = React.useState(null)
    const [filtroMobile, setFiltroMobile] = React.useState(null)
    const [nadaEncontrado, setNadaEncontrado] = React.useState(false)
    const [filtroAbertas, setFiltroAbertas] = React.useState(false)
    const [filtroConcluidas, setFiltroConcluidas] = React.useState(false)
    const [filtroCanceladas, setFiltroCanceladas] = React.useState(false)
    const [filtroRemarcadas, setFiltroRemarcadas] = React.useState(false)
    const [nextPage, setNextPage] = React.useState(null)
    const [totalPageCount, setTotalPageCount] = React.useState(null)
    const [usePagination, setUsePagination] = React.useState(true)
    const [qtdItemsPerPage, setQtdItemsPerPage] = React.useState(RECORD_NUMBER_PER_REQUEST)
    const { getToken, dataUser, isMobile } = React.useContext(UserContex);
    const [appliedFilters, setAppliedFilters] = React.useState([])

    const { type, is_system, tenant_id } = dataUser ? dataUser : {};

    const handleSearch = (ev) => {
        if (ev.key === "Enter") {
            requestAllFilials();
        }
    }

    const setNamePessoa = ({ target }) => {

        setPessoa(target.value)
    }

    const handleCodPessoaFilter = ({ target }) => {
        setCodigoPessoa(target.value)
    }

    const handleNamePessoaFilter = ({ target }) => {
        setPessoa(target.value)
    }

    const handleFiltroMobile = ({ target }) => {
        setFiltroMobile(target.value)
    }

    const handleCodigoFilialFilter = ({ target }) => {
        setCodigoFilial(target.value)
    }

    const filtersArr = [
        {
            type: 'text',
            options: [],
            hasLabel: true,
            contentLabel: 'Código',
            atributsFormLabel: {},
            atributsContainer: { xs: "12", sm: "12", md: "2", className: 'mb-2' },
            atributsFormControl: { 'type': 'text', size: "sm", 'id': codigoFilial, value: codigoFilial, onChange: handleCodigoFilialFilter, onBlur: handleCodigoFilialFilter, onKeyUp: handleSearch },

        },
        {
            type: 'text',
            options: [],
            hasLabel: true,
            contentLabel: 'Cod pessoa',
            atributsFormLabel: {},
            atributsContainer: { xs: "12", sm: "12", md: "2", className: 'mb-2' },
            atributsFormControl: { 'type': 'text', size: "sm", 'name': codigoPessoa, value: codigoPessoa, onChange: handleCodPessoaFilter, onBlur: handleCodPessoaFilter, onKeyUp: handleSearch },

        },
        {
            type: 'text',
            options: [],
            hasLabel: true,
            contentLabel: 'Pessoa',
            atributsFormLabel: {},
            atributsContainer: { xs: "12", sm: "12", md: "2", className: 'mb-2' },
            atributsFormControl: { 'type': 'text', size: "sm", 'name_atendido': pessoa, value: pessoa, onChange: handleNamePessoaFilter, onBlur: handleNamePessoaFilter, onKeyUp: handleSearch },

        },
    ]

    const acoesBottomCard = [{
        label: 'Pesquisar',
        icon: <FontAwesomeIcon icon={faSearch} />,
        props: { onClick: () => requestAllFilials(), className: 'btn btn-sm botao_success' }
    },
    {
        label: 'Limpar',
        icon: <FontAwesomeIcon icon={faBroom} />,
        props: { onClick: () => limparFiltros(), className: 'btn btn-sm btn-secondary mx-2' }
    },
    {
        label: 'Cadastrar',
        icon: <FontAwesomeIcon icon={faPlus} />,
        props: { onClick: () => setCadastrarFilial(true), className: 'btn btn-sm btn-secondary' }
    }
    ];

    const acoesHeaderCard = [{
        label: '',
        icon: <FontAwesomeIcon icon={(mostarFiltros ? faChevronDown : faChevronUp)} />,
        props: { onClick: () => { setMostarFiltros(!mostarFiltros); }, className: 'btn btn-sm btn-secondary' },
    },
    ];

    React.useEffect(() => {
        switch (acao) {
            case 'editar':
                if (filialChoice > 0) {
                    setAtualizarFilial(true);
                } else {
                    setAtualizarFilial(false);
                }
                break;
            default://

                break;

        }

    }, [filialChoice, acao])

    React.useEffect(() => {

        if (cadastrarFilial == true) {
            setShowModalCriarFilial(true);
        } else {
            setShowModalCriarFilial(false);
        }


    }, [cadastrarFilial])

    const limparFiltros = () => {
        setPessoa('');
        setCodigoPessoa('')
        setCodigoFilial('')
        setFiltroMobile('')
        setFiltroAbertas('')
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

        if (codigoPessoa) {
            filtros['pessoa_id'] = codigoPessoa;
            detalhesFiltros['pessoa_id'] = {
                label: 'pessoa_id',
                value: codigoPessoa,
                resetFilter: () => { setCodigoPessoa(''); removeFilter('pessoa_id'); },
            };
        }

        if (pessoa) {
            filtros['name'] = pessoa;
            detalhesFiltros['name'] = {
                label: 'name',
                value: pessoa,
                resetFilter: () => { setPessoa(''); removeFilter('name'); },
            };

            filtros['name_pessoa'] = pessoa;
        }

        if (codigoFilial) {
            filtros['id'] = codigoFilial;
            detalhesFiltros['id'] = {
                label: 'id',
                value: codigoFilial,
                resetFilter: () => { setCodigoFilial(''); removeFilter('id'); },
            };
        }

        if (codigoFilial) {
            filtros['filial_id'] = codigoFilial;
        }

        if (filtroMobile) {
            filtros['name'] = filtroMobile;
            detalhesFiltros['name'] = {
                label: 'Filtro',
                value: filtroMobile,
                resetFilter: () => { setFiltroMobile(''); removeFilter('name'); },
            };
        }

        return { filtros, detalhesFiltros };
    }

    const requestAllFilials = async () => {
        setFilial([])

        let { filtros, detalhesFiltros } = montarFiltro();
        setAppliedFilters(detalhesFiltros)
        let { url, options } = FILIAIS_ALL_POST({ ...filtros }, getToken());

        if (nextPage) {
            url = nextPage;
        }

        const { response, json } = await request(url, options);
        if (json) {
            setFilial(json)

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

        const requestAllFilialsEffect = async () => {
            await requestAllFilials();
        }

        requestAllFilialsEffect();


    }, [filtroConcluidas, filtroCanceladas, filtroAbertas, filtroRemarcadas, nextPage, setNextPage])

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
                        label: 'Filiais'
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
                                                                        requestAllFilials();
                                                                    }
                                                                },
                                                                value: filtroMobile

                                                            }
                                                        }
                                                    }
                                                />
                                            </Col>

                                            <Col xs="1" sm="1" md="1" style={{ textAlign: 'left', alignItems: 'center', justifyContent: 'center', margin: 'auto', padding: '0' }} >
                                                <FontAwesomeIcon onClick={() => { requestAllFilials(); }} size={'lg'} icon={faSearch} />
                                            </Col>
                                        </Row>

                                        <Row className={'mt-2'}>
                                            <div style={{ display: 'flex', flexDirection: 'collumn', flexWrap: 'wrap' }}>

                                            </div>
                                        </Row>
                                    </Col>
                                </Row>

                                <Row>
                                    <div style={{ display: 'flex', flexDirection: 'collumn', flexWrap: 'wrap' }}>

                                    </div>

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
                                        <Button style={{ borderRadius: '50px', marginBottom: '10px', marginRight: '0.4rem' }} className={'btn btn-sm btn-secondary'} onClick={() => { setCadastrarFilial(true); }} ><FontAwesomeIcon icon={faPlus} /> Filial</Button>
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

                <Col xs="12" sm="12" md={12}>
                    <Include
                        dataEstado={estado}
                        loadingData={loading}
                        callBack={requestAllFilials}
                        setMostarFiltros={setMostarFiltros}
                        idFilialCriada={filialChoice}
                        nadaEncontrado={nadaEncontrado}
                        nextPage={nextPage}
                        setNextPage={setNextPage}
                        usePagination={usePagination}
                        setUsePagination={setUsePagination}
                        totalPageCount={totalPageCount}
                        setTotalPageCount={setTotalPageCount}
                        callBakSelectedItem={callBakSelectedItem}
                        ignoreTableActions={ignoreTableActions}
                    />
                </Col>
            </Row>


            {
                cadastrarFilial && <Cadastrar cadastrarFilial={cadastrarFilial} setCadastrarFilial={setCadastrarFilial} atualizarCadastro={null} setAtualizarCadastro={() => null} idFilial={filialChoice} setIdFilial={setFilialChoice} callback={requestAllFilials} />
            }


        </>

    )
}

export default Filial;