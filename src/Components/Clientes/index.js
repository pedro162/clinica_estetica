import React from 'react';
import estilos from './Clientes.module.css'
import useFetch from '../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET} from '../../api/endpoints/geral.js'
import {Col, Row } from 'react-bootstrap';
import Table from '../Relatorio/Table/index.js'
import Filter from '../Relatorio/Filter/index.js'
import Breadcrumbs from '../Helper/Breadcrumbs.js'

const Clientes = (props)=>{

	const {data, error, request, loading} = useFetch();
    const [exemplos, setExemplos] = React.useState([])
    const [exemplosTitleTable, setExemplosTitleTable] = React.useState([])



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

    const gerarTitleTable = ()=>{
        let exemplos = [
            {
                label:'Coluna exemplo 1',
                props:{}
            },
            {
                label:'Coluna exemplo 2',
                props:{}
            },
            {
                label:'Coluna exemplo 3',
                props:{}
            },
            {
                label:'Coluna exemplo 4',
                props:{}
            },
        ]

        return exemplos;
    }

	React.useEffect(()=>{

        setExemplos(gerarExemplos());
        setExemplosTitleTable(gerarTitleTable());

    }, [])
    const rowsTableArr = exemplos;    
    const titulosTableArr = exemplosTitleTable;
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
                            label:'Clientes'
                        }
                    ]}
            />
            <Row>
                <Col  xs="12" sm="12" md="3">
                    <Filter

                    />
                </Col>
                <Col  xs="12" sm="12" md="9">

                    <Table
                        titulosTableArr={titulosTableArr}
                        rowsTableArr={rowsTableArr}

                    />
                </Col>
            </Row>
        </>

	)
}

export default Clientes;