import React from 'react';
import {Col, Row, Button} from 'react-bootstrap';
import estilos from './FormCliente.module.css'

const ItemFormCliente = ({ name, setName, type, setType, options, setOptions, defaultValue, setDefaultValue, posicao, setPosicao, adicionarItem, ...props})=>{

    return(
        <Row className="mb-1"  >
            <Col xs="12" sm="12" md="2">
                <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Nome campo"
                    className={`form-control form-control-sm ${estilos.input}`}
                    onChange={({target})=>setName(target.value)}
                    onBlur={({target})=>setName(target.value)}
                    value={name}
                                    

                />
                
            </Col>

            <Col xs="12" sm="12" md="2">
                <input
                    type="text"
                    name="type"
                    id="type"
                    placeholder="Tipo do campo"
                    className={`form-control form-control-sm ${estilos.input}`}
                    onChange={({target})=>setType(target.value)}
                    onBlur={({target})=>setType(target.value)}
                    value={type}
                                    

                />
                
            </Col>

            <Col xs="12" sm="12" md="2">
                <input
                    type="text"
                    name="options"
                    id="options"
                    placeholder="Opções"
                    className={`form-control form-control-sm ${estilos.input}`}
                    onChange={({target})=>setOptions(target.value)}
                    onBlur={({target})=>setOptions(target.value)}
                    value={options}
                                    

                />
                
            </Col>

            <Col xs="12" sm="12" md="2">
                <input
                    type="text"
                    name="default"
                    id="default"
                    placeholder="Valor padrão"
                    className={`form-control form-control-sm ${estilos.input}`}
                    onChange={({target})=>setDefaultValue(target.value)}
                    onBlur={({target})=>setDefaultValue(target.value)}
                    value={defaultValue}
                                    

                />
                
            </Col>

            <Col xs="12" sm="12" md="2">
                <input
                    type="number"
                    name="posicao"
                    id="posicao"
                    placeholder="Posição"
                    className={`form-control form-control-sm ${estilos.input}`}
                    onChange={({target})=>setPosicao(target.value)}
                    onBlur={({target})=>setPosicao(target.value)}
                    value={posicao}
                                    

                />
                
            </Col>

            <Col xs="12" sm="12" md="1" style={{alignContent:"fex-end"}} >
                <Button style={{verticalAlign:"baseline"}} variant="primary" className="botao_success btn btn-sm" onClick={adicionarItem}>
                    Adicionar
                </Button>
            </Col>
        </Row>
    )
}

export default ItemFormCliente;