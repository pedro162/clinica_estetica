import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import {UserContex} from '../../Context/UserContex.js';
import { Container, Col, Row, Navbar, Nav,NavDropdown } from 'react-bootstrap';
import estilos from './Header.module.css'

const Header = (props)=>{
    const {isAuthenticated, userLogout} = React.useContext(UserContex)
    console.log(isAuthenticated)
    if(! isAuthenticated()){
        return <></>

    }
    return(
        <Navbar collapseOnSelect expand="lg" className={[estilos.containerHeader]} fixed="top" >
            <Container fluid>
                <Navbar.Brand  ><Link className={[estilos.link,estilos.logo]} to="/" >Stúdio beleza</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown title="Financeiro" id="collasible-nav-dropdown">
                            <NavDropdown.Item className={[estilos.itemMenu]} as='div' ><Link className={[estilos.link]} to="/home/painel" >Home</Link></NavDropdown.Item>
                            <NavDropdown.Item className={[estilos.itemMenu]} as='div' >Another action</NavDropdown.Item>
                            <NavDropdown.Item className={[estilos.itemMenu]} as='div' >Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                                <NavDropdown.Item className={[estilos.itemMenu]} as='div'>Separated link</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Produtos" id="collasible-nav-dropdown">
                            <NavDropdown.Item className={[estilos.itemMenu]} as='div'>Action</NavDropdown.Item>
                            <NavDropdown.Item className={[estilos.itemMenu]} as='div'>Another action</NavDropdown.Item>
                            <NavDropdown.Item className={[estilos.itemMenu]} as='div'>Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                                <NavDropdown.Item className={[estilos.itemMenu]} as='div' >Separated link</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Estoque" id="collasible-nav-dropdown">
                            <NavDropdown.Item className={[estilos.itemMenu]} as='div' >Action</NavDropdown.Item>
                            <NavDropdown.Item className={[estilos.itemMenu]} as='div' >Another action</NavDropdown.Item>
                            <NavDropdown.Item className={[estilos.itemMenu]} as='div' >Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                                <NavDropdown.Item className={[estilos.itemMenu]} as='div' >Separated link</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Serviços" id="collasible-nav-dropdown">
                            <NavDropdown.Item className={[estilos.itemMenu]} as='div' >Action</NavDropdown.Item>
                            <NavDropdown.Item className={[estilos.itemMenu]} as='div' >Another action</NavDropdown.Item>
                            <NavDropdown.Item className={[estilos.itemMenu]} as='div' >Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                                <NavDropdown.Item className={[estilos.itemMenu]} as='div' >Separated link</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Procedimentos" id="collasible-nav-dropdown">
                            <NavDropdown.Item className={[estilos.itemMenu]} as='div' >Action</NavDropdown.Item>
                            <NavDropdown.Item className={[estilos.itemMenu]} as='div' >Another action</NavDropdown.Item>
                            <NavDropdown.Item className={[estilos.itemMenu]} as='div' >Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                                <NavDropdown.Item className={[estilos.itemMenu]} as='div' >Separated link</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Clientes" id="collasible-nav-dropdown">
                            <NavDropdown.Item className={[estilos.itemMenu]} as='div' ><Link style={{width:'100%', height:'100%'}} to="/clientes/painel" >Clientes</Link></NavDropdown.Item>
                            <NavDropdown.Item className={[estilos.itemMenu]} as='div' >Another action</NavDropdown.Item>
                            <NavDropdown.Item className={[estilos.itemMenu]} as='div' >Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                                <NavDropdown.Item className={[estilos.itemMenu]} as='div' >Separated link</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Fornecedores" id="collasible-nav-dropdown">
                            <NavDropdown.Item className={[estilos.itemMenu]} as='div' >Action</NavDropdown.Item>
                            <NavDropdown.Item className={[estilos.itemMenu]} as='div' >Another action</NavDropdown.Item>
                            <NavDropdown.Item className={[estilos.itemMenu]} as='div' >Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                                <NavDropdown.Item className={[estilos.itemMenu]} as='div' >Separated link</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Agenda" id="collasible-nav-dropdown">
                            <NavDropdown.Item className={[estilos.itemMenu]} as='div' >Action</NavDropdown.Item>
                            <NavDropdown.Item className={[estilos.itemMenu]} as='div' >Another action</NavDropdown.Item>
                            <NavDropdown.Item className={[estilos.itemMenu]} as='div' >Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                                <NavDropdown.Item className={[estilos.itemMenu]} as='div' >Separated link</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Fiscal" id="collasible-nav-dropdown">
                            <NavDropdown.Item className={[estilos.itemMenu]} as='div' >Action</NavDropdown.Item>
                            <NavDropdown.Item className={[estilos.itemMenu]} as='div' >Another action</NavDropdown.Item>
                            <NavDropdown.Item className={[estilos.itemMenu]} as='div' >Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                                <NavDropdown.Item className={[estilos.itemMenu]} as='div' >Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav>
                        <NavDropdown title="Usuário" id="collasible-nav-dropdown" drop="start">
                            <NavDropdown.Item className={[estilos.itemMenu]} as='div' >Editar</NavDropdown.Item>
                            <NavDropdown.Divider />
                                <NavDropdown.Item onClick={()=>userLogout()} className={[estilos.itemMenu]} as='div' >Sair</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )

}

export default Header;