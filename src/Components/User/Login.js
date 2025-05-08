import React from 'react';
import FormLogin from '../FormLogin/index.js'
import { Container, Col, Row } from 'react-bootstrap';
import estilos from './Login.module.css'
import './Login.css';
import {UserContex} from '../../Context/UserContex.js'

const Login = (props)=>{

    const {userLogin, error, data, loading} = React.useContext(UserContex);
    
    const logar= (user, password)=>{
        userLogin(user, password)
    }

    return(
        <Container fluid className={[estilos.container_login]}  >
            <Row>
                <Col className={[estilos.container_form]}>
                    <Row className={[estilos.container_title_form]}>
                        <Col>
                            <h1 className={[estilos.title_form_login]}>
                                Stúdio beleza
                            </h1>
                        </Col>
                    </Row>
                    <Row>
                        <FormLogin logar={logar} loading={loading} data={data} error={error} />
                    </Row>
                </Col>
            </Row>

        </Container>
    )
}

export default Login;