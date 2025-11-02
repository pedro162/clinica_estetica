import React from 'react';
import estilos from './Grupos.module.css'
import useFetch from '../../Hooks/useFetch.js';
import { TOKEN_POST, CLIENT_ID, CLIENT_SECRET, GRUPOS_ALL_POST } from '../../api/endpoints/geral.js'
import { Col, Row } from 'react-bootstrap';
import Table from '../Relatorio/Table/index.js'
import Filter from '../Relatorio/Filter/index.js'
import Breadcrumbs from '../Helper/Breadcrumbs.js'
import { faHome, faSearch, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from '../Utils/Modal/index.js'
import Load from '../Utils/Load/index.js'
import Cadastrar from './Cadastrar/index.js'
import Atualizar from './Atualizar/index.js'
import { UserContex } from '../../Context/UserContex.js'
import FormGrupo from './FormGrupo/index.js'


const Grupos = (props) => {

    const { data, error, request, loading } = useFetch();
    const [grupos, setGrupos] = React.useState([])
    const [exemplos, setExemplos] = React.useState([])
    const [exemplosTitleTable, setExemplosTitleTable] = React.useState([])
    const [showModalCriarGrupo, setShowModalCriarGrupo] = React.useState(false)
    const [showModalAtualizarGrupo, setShowModalAtualizarGrupo] = React.useState(false)
    const [clientChoice, setGrupoChoice] = React.useState(null);
    const [atualizarCadastro, setAtualizarCadastro] = React.useState(false)


    const { getToken } = React.useContext(UserContex);

    const alerta = (target) => {
        console.log(target)
    }
    const filtersArr = [
        {
            type: 'text',
            options: [],
            hasLabel: true,
            contentLabel: 'Teste',
            atributsFormLabel: {},
            atributsContainer: { xs: "12", sm: "12", md: "12", className: 'mb-2' },
            atributsFormControl: { 'type': 'text', size: "sm", 'name': 'nome', onChange: alerta, onBlur: alerta },

        },
        {
            type: 'radio',
            options: [
                {
                    hasLabel: true,
                    contentLabel: 'Teste Radio 01',
                    atributsFormLabel: {},
                    atributsFormControl: { 'type': 'radio', value: '12', size: "sm", 'checked': true, 'name': 'nome', onChange: alerta, onBlur: alerta },
                },
                {
                    hasLabel: true,
                    contentLabel: 'Teste Radio',
                    atributsFormLabel: {},
                    atributsFormControl: { 'type': 'radio', value: '12', size: "sm", 'checked': true, 'name': 'nome', onChange: alerta, onBlur: alerta },
                }
            ],
            hasLabel: true,
            contentLabel: 'Teste',
            atributsFormLabel: {},
            atributsContainer: { xs: "12", sm: "12", md: "12", className: 'mb-2', },
            atributsFormControl: {},

        }
        , {
            type: 'checkbox',
            options: [],
            hasLabel: true,
            contentLabel: 'Teste',
            atributsFormLabel: {},
            atributsContainer: { xs: "12", sm: "12", md: "6", className: 'mb-2' },
            atributsFormControl: { 'type': 'checkbox', value: '12', size: "sm", 'checked': false, 'name': 'nome', onChange: alerta, onBlur: alerta },

        }
    ]

    const acoesBottomCard = [{
        label: 'Pesquisar',
        icon: <FontAwesomeIcon icon={faSearch} />,
        props: { onClick: () => requestAllClients(), className: 'btn btn-sm botao_success' }
    },
    {
        label: 'Cadastrar',
        icon: <FontAwesomeIcon icon={faPlus} />,
        props: { onClick: () => setShowModalCriarGrupo(true), className: 'btn btn-sm mx-2 btn-secondary' }
    }
    ];
    const gerarExemplos = () => {
        let exemplos = [];
        for (let i = 0; !(i == 10); i++) {
            exemplos.push(

                {
                    propsRow: { id: (i + 1) },
                    celBodyTableArr: [
                        {

                            label: '1',
                            propsRow: {}
                        },
                        {

                            label: 'Teste',
                            propsRow: {}
                        },
                        {

                            label: 'Testando',
                            propsRow: {}
                        },
                    ]
                }

            )

        }

        return exemplos;
    }

    const gerarTableGrupos = () => {

        let data = [];
        let dataGrupos = grupos.registro
        if (dataGrupos && Array.isArray(dataGrupos) && dataGrupos.length > 0) {
            for (let i = 0; !(i == dataGrupos.length); i++) {
                let atual = dataGrupos[i];
                if (atual) {


                    data.push(

                        {
                            propsRow: { id: (atual.id) },
                            acoes: [
                                { acao: () => setGrupoChoice(atual.id), label: 'Editar', propsOption: {}, propsLabel: {} },
                                { acao: () => setGrupoChoice(atual.id), label: 'Agenda', propsOption: {}, propsLabel: {} },
                                { acao: () => setGrupoChoice(atual.id), label: 'Histórico de atendimentos', propsOption: {}, propsLabel: {} },
                                { acao: () => setGrupoChoice(atual.id), label: 'Central do Grupo', propsOption: {}, propsLabel: {} },
                            ],
                            celBodyTableArr: [
                                {

                                    label: atual.id,
                                    propsRow: {}
                                },
                                {

                                    label: atual.name,
                                    propsRow: {}
                                },
                                {

                                    label: atual.descricao,
                                    propsRow: {}
                                },
                            ]
                        }

                    )

                }

            }
        }

        return data;
    }

    const gerarTitleTable = () => {
        let tableTitle = [
            {
                label: 'Código',
                props: {}
            },
            {
                label: 'Nome',
                props: {}
            },
            {
                label: 'Descrição',
                props: {}
            },
        ]

        return tableTitle;
    }

    const requestAllClients = async () => {

        const { url, options } = GRUPOS_ALL_POST({}, getToken());
        const { response, json } = await request(url, options);

        if (json) {
            setGrupos(json)
        }

    }

    React.useEffect(() => {

        const requestAllClientsEffect = async () => {
            await requestAllClients();
        }

        requestAllClientsEffect();
    }, [])

    React.useEffect(() => {

        if (clientChoice > 0) {
            setAtualizarCadastro(true);
        } else {
            setAtualizarCadastro(false);
        }


    }, [clientChoice])


    const rowsTableArr = gerarTableGrupos();
    const titulosTableArr = gerarTitleTable();

    return (
        <>
            <Breadcrumbs
                items={[
                    {
                        props: {},
                        label: 'Início'
                    },
                    {
                        props: {},
                        label: 'Grupos'
                    }
                ]}
            />
            <Row>
                <Col xs="12" sm="12" md="3">
                    <Filter
                        filtersArr={filtersArr}
                        actionsArr={acoesBottomCard}
                    />
                </Col>
                <Col xs="12" sm="12" md="9">
                    <Table
                        titulosTableArr={titulosTableArr}
                        rowsTableArr={rowsTableArr}
                        loading={loading}

                    />
                </Col>
            </Row>
            <FormGrupo dataGrupoChoice={[]} atualizarCadastro={false} setAtualizarCadastro={setAtualizarCadastro} idGrupo={null} setIdGrupo={setGrupoChoice} showModalCriarGrupo={showModalCriarGrupo} setShowModalCriarGrupo={setShowModalCriarGrupo} callback={requestAllClients} />

            {
                atualizarCadastro &&
                <Atualizar atualizarCadastro={atualizarCadastro} setAtualizarCadastro={setAtualizarCadastro} idGrupo={clientChoice} setIdGrupo={setGrupoChoice} callback={requestAllClients} />
            }
        </>

    )
}

export default Grupos;