
import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import {UserContex} from '../../Context/UserContex.js';
import { Container, Col, Row, Navbar, Nav,NavDropdown } from 'react-bootstrap';
import estilos from './Header.module.css'

const ExternalHeader = (props)=>{
    const {isAuthenticated, userLogout} = React.useContext(UserContex)
    console.log(isAuthenticated)
    if(! isAuthenticated()){
        return <></>

    }


    const handleLinkClick = () => {
        //Adicione qualquer lógica adicional que você possa precisar ao clicar em um link
    // Aqui estamos apenas fechando o menu
        const navbarToggler = document.querySelector('.navbar-toggler');
        if (navbarToggler) {
          navbarToggler.click(); // Simula um clique no botão de alternância para recolher o menu
        }
    };

    ///home/painel
    return(
        <Navbar collapseOnSelect expand="lg" className={[estilos.containerHeader]} fixed="top" >
            <Container fluid>
                <Navbar.Brand  ><Link className={[estilos.link,estilos.logo]} to="/home/painel" >Stúdio beleza</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        
                        <NavDropdown title="Meu prontuário" id="collasible-nav-dropdown">
                            <NavDropdown.Item className={[estilos.itemMenu]} as='div' ><Link className={[estilos.link]} onClick={handleLinkClick} to="/consulta/index" >Consultas</Link></NavDropdown.Item>
                            <NavDropdown.Item className={[estilos.itemMenu]} as='div' ><Link className={[estilos.link]} onClick={handleLinkClick} to="/fichas/index" >Fichas</Link></NavDropdown.Item>
                            
                        </NavDropdown>
                        <NavDropdown title="Agenda" id="collasible-nav-dropdown">
                            <NavDropdown.Item className={[estilos.itemMenu]} as='div' ><Link className={[estilos.link]} onClick={handleLinkClick} to="/agenda/painel" >Agenda</Link></NavDropdown.Item>
                            <NavDropdown.Item className={[estilos.itemMenu]} as='div' ><Link className={[estilos.link]} onClick={handleLinkClick} to="/home/painel" >Calendario de agenda</Link></NavDropdown.Item>
                            
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

export default ExternalHeader;