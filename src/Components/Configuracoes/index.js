import React from 'react';
import estilos from './Configuracoes.module.css'
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
import FormControlInput from '../FormControl/index.js'
import { Link } from 'react-router-dom/cjs/react-router-dom.min.js';

const Configuracoes = ({ defaultFilters, ...props }) => {

    const { data, error, request, loading } = useFetch();
    const [consultaChoice, setConfiguracoesChoice] = React.useState(null);
    const [atualizarConfiguracoes, setAtualizarConfiguracoes] = React.useState(false)
    const [cadastrarConfiguracoes, setCadastrarConfiguracoes] = React.useState(false)
    const [mostarFiltros, setMostarFiltros] = React.useState(true)
    const [acao, setAcao] = React.useState(null)
    const [filtroMobile, setFiltroMobile] = React.useState(null)
    const [appliedFilters, setAppliedFilters] = React.useState([])
    const [nextPage, setNextPage] = React.useState(null)
    const [totalPageCount, setTotalPageCount] = React.useState(null)
    const [usePagination, setUsePagination] = React.useState(true)
    const [qtdItemsPerPage, setQtdItemsPerPage] = React.useState(RECORD_NUMBER_PER_REQUEST)

    const [idConfiguracoes, setIdConfiguracoes] = React.useState(() => {
        return defaultFilters?.referencia_id
    })
    const [parametroName, setConfiguracoesName] = React.useState(() => {
        return defaultFilters?.name_parametro
    })

    const { getToken } = React.useContext(UserContex);

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
                        label: 'Configurações'
                    }
                ]}

                buttonFiltroMobile={true}
                setMostarFiltros={setMostarFiltros}
                mostarFiltros={mostarFiltros}

            />
            <Row>
                <Col xs="12" sm="12" md={'12'} >
                    <div class="container-fluid ">

                        <div class="row gy-4">
                            <div class="col-md-4">
                                <div class="p-4 bg-light rounded shadow">
                                    <h3 class="h4 mb-4">Configurações de usuário</h3>
                                    <ul class="list-unstyled">
                                        <li class="mb-2">
                                            <Link className={'text-primary text-decoration-underline'} to={'/configuracoes/sistema'}>Usuários</Link>
                                        </li>
                                        <li class="mb-2">
                                            <Link className={'text-primary text-decoration-underline'} to={'/configuracoes/sistema'}>Permições</Link>
                                        </li>
                                        <li class="mb-2">
                                            <Link className={'text-primary text-decoration-underline'} to={'/configuracoes/sistema'}>Papeis</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="p-4 bg-light rounded shadow">
                                    <h3 class="h4 mb-4">Configurações do sistema</h3>
                                    <ul class="list-unstyled">
                                        <li class="mb-2">
                                            <Link className={'text-primary text-decoration-underline'} to={'/configuracoes/parametros'}>Parametros</Link>
                                        </li>
                                        <li class="mb-2">
                                            <Link className={'text-primary text-decoration-underline'} to={'/configuracoes/filial'}>Filiais</Link>
                                        </li>
                                        <li class="mb-2">
                                            <Link className={'text-primary text-decoration-underline'} to={'/configuracoes/construtor/ficha'}>Construtor de fichas</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="p-4 bg-light rounded shadow">
                                    <h3 class="h4 mb-4">Configurações financeiras</h3>
                                    <ul class="list-unstyled">
                                        <li class="mb-2">
                                            <Link className={'text-primary text-decoration-underline'} to={'/financeiro/caixa'}>Caixas</Link>
                                        </li>
                                        <li class="mb-2">
                                            <Link className={'text-primary text-decoration-underline'} to={'/financeiro/formas-pagamento'}>Formas de pagamento</Link>
                                        </li>
                                        <li class="mb-2">
                                            <Link className={'text-primary text-decoration-underline'} to={'/financeiro/planos-pagamento'}>Planos de pagamento</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="p-4 bg-light rounded shadow">
                                    <h3 class="h4 mb-4">Outras configurações</h3>
                                    <ul class="list-unstyled">
                                        <li class="mb-2">
                                            <Link className={'text-primary text-decoration-underline'} to={'/configuracoes/pais'}>Países</Link>
                                        </li>
                                        <li class="mb-2">
                                            <Link className={'text-primary text-decoration-underline'} to={'/configuracoes/estado'}>Estados</Link>
                                        </li>
                                        <li class="mb-2">
                                            <Link className={'text-primary text-decoration-underline'} to={'/configuracoes/cidade'}>Cidades</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                </Col>
            </Row>

        </>

    )
}

export default Configuracoes;