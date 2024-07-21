import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import {UserContex} from '../../Context/UserContex.js';
import { Container, Col, Row, Navbar, Nav,NavDropdown } from 'react-bootstrap';
import estilos from './Header.module.css'
import ExternalHeader from './ExternalHeader.js'

const Header = (props)=>{
    const {isAuthenticated, userLogout, getUser, dataUser, loading} = React.useContext(UserContex)
    console.log(isAuthenticated)
    if(! isAuthenticated()){
        return <></>

    }

    if(loading){
        return (
            <Navbar collapseOnSelect expand="lg" className={[estilos.containerHeader]} fixed="top" >
                <Container fluid>
                    <Navbar.Brand  ><Link className={[estilos.link,estilos.logo]} to="/" >Stúdio beleza</Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />                           


                    <Navbar.Collapse id="responsive-navbar-nav">
                        
                    </Navbar.Collapse>
                </Container>
            </Navbar>

        )
    }

    
    const {type, is_system, tenant_id} = dataUser ? dataUser : {};

    if(type=='external'){
        return <ExternalHeader/>;
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
                <Navbar.Brand  ><Link className={[estilos.link,estilos.logo]} to="/" >Stúdio beleza</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />                           


                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown title="Configurações" id="collasible-nav-dropdown">
                            <NavDropdown.Item className={[estilos.itemMenu]} as='div' ><Link className={[estilos.link]} onClick={handleLinkClick} to="/configuracoes/filial" >Filiais</Link></NavDropdown.Item>
                            <NavDropdown.Item className={[estilos.itemMenu]} as='div' ><Link className={[estilos.link]} onClick={handleLinkClick} to="/configuracoes/pais" >Paises</Link></NavDropdown.Item>
                            <NavDropdown.Item className={[estilos.itemMenu]} as='div' ><Link className={[estilos.link]} onClick={handleLinkClick} to="/configuracoes/estado" >Estados</Link></NavDropdown.Item>
                            <NavDropdown.Item className={[estilos.itemMenu]} as='div' ><Link className={[estilos.link]} onClick={handleLinkClick} to="/configuracoes/cidade" >Cidade</Link></NavDropdown.Item>
                            <NavDropdown.Item className={[estilos.itemMenu]} as='div' ><Link className={[estilos.link]} onClick={handleLinkClick} to="/configuracoes/sistema" >Sistema</Link></NavDropdown.Item>
                            <NavDropdown.Item className={[estilos.itemMenu]} as='div' ><Link className={[estilos.link]} onClick={handleLinkClick} to="/configuracoes/construtor/ficha" >Templates de fichas</Link></NavDropdown.Item>
                           
                            {/* <NavDropdown.Divider />
                                <NavDropdown.Item className={[estilos.itemMenu]} as='div'>Separated link</NavDropdown.Item> */}
                        </NavDropdown>
                        <NavDropdown title="Financeiro" id="collasible-nav-dropdown">
                            <NavDropdown.Item className={[estilos.itemMenu]} as='div' ><Link className={[estilos.link]} onClick={handleLinkClick} to="/financeiro/contas_receber" >Contas a receber</Link></NavDropdown.Item>
                            <NavDropdown.Item className={[estilos.itemMenu]} as='div' ><Link className={[estilos.link]} onClick={handleLinkClick} to="/financeiro/movimentacoes/painel" >Movimentações financeiras</Link></NavDropdown.Item>
                            <NavDropdown.Item className={[estilos.itemMenu]} as='div' ><Link className={[estilos.link]} onClick={handleLinkClick} to="/financeiro/caixa" >Caixas</Link></NavDropdown.Item>
                           
                        </NavDropdown>
                        {/*<NavDropdown title="Produtos" id="collasible-nav-dropdown">
                                                    <NavDropdown.Item className={[estilos.itemMenu]} as='div'>Produtos</NavDropdown.Item>
                                                    <NavDropdown.Item className={[estilos.itemMenu]} as='div'>Categorias</NavDropdown.Item>
                                                    <NavDropdown.Item className={[estilos.itemMenu]} as='div'>Embalagens</NavDropdown.Item>
                                                    <NavDropdown.Item className={[estilos.itemMenu]} as='div'>Unidades</NavDropdown.Item>
                                                </NavDropdown>
                                                <NavDropdown title="Estoque" id="collasible-nav-dropdown">
                                                    <NavDropdown.Item className={[estilos.itemMenu]} as='div' >Estoque</NavDropdown.Item>
                                                </NavDropdown>*/}
                        <NavDropdown title="Serviço" id="collasible-nav-dropdown">
                            <NavDropdown.Item className={[estilos.itemMenu]} as='div' ><Link className={[estilos.link]} onClick={handleLinkClick} to="/ordem/servico/painel" >Ordem de serviço</Link></NavDropdown.Item>
                            <NavDropdown.Item className={[estilos.itemMenu]} as='div' ><Link className={[estilos.link]} onClick={handleLinkClick} to="/servico/painel" >Serviço</Link></NavDropdown.Item>
                            {/* <NavDropdown.Item className={[estilos.itemMenu]} as='div' >Categoria de serviço</NavDropdown.Item> */}
                        </NavDropdown>
                        <NavDropdown title="Clientes" id="collasible-nav-dropdown">
                            <NavDropdown.Item className={[estilos.itemMenu]} as='div' ><Link style={{width:'100%', height:'100%'}} onClick={handleLinkClick} to="/clientes/painel" >Clientes</Link></NavDropdown.Item>
                            <NavDropdown.Item className={[estilos.itemMenu]} as='div' ><Link style={{width:'100%', height:'100%'}} onClick={handleLinkClick} to="/grupos/painel" >Grupos</Link></NavDropdown.Item>
                            <NavDropdown.Item className={[estilos.itemMenu]} as='div' ><Link className={[estilos.link]} onClick={handleLinkClick} to="/consulta/index" >Consultas</Link></NavDropdown.Item>
                            <NavDropdown.Item className={[estilos.itemMenu]} as='div' ><Link className={[estilos.link]} onClick={handleLinkClick} to="/fichas/index" >Fichas</Link></NavDropdown.Item>
                            
                        </NavDropdown>
                        {/* <NavDropdown title="Fornecedores" id="collasible-nav-dropdown">
                            <NavDropdown.Item className={[estilos.itemMenu]} as='div' >Fornecedores</NavDropdown.Item>
                        </NavDropdown> */}                        
                        <NavDropdown title="Profissonais" id="collasible-nav-dropdown">
                            <NavDropdown.Item className={[estilos.itemMenu]} as='div' ><Link className={[estilos.link]} onClick={handleLinkClick} to="/especialidades/painel" >Especialidades</Link></NavDropdown.Item>
                            <NavDropdown.Item className={[estilos.itemMenu]} as='div' ><Link className={[estilos.link]} onClick={handleLinkClick} to="/profissionais/painel" >Profissionais</Link></NavDropdown.Item>
                            <NavDropdown.Item className={[estilos.itemMenu]} as='div' ><Link className={[estilos.link]} onClick={handleLinkClick} to="/categoria/eventos/painel" >Horários profissionais</Link></NavDropdown.Item>
                            <NavDropdown.Item className={[estilos.itemMenu]} as='div' ><Link className={[estilos.link]} onClick={handleLinkClick} to="/categoria/eventos/painel" >Dias profissionais</Link></NavDropdown.Item>
                            
                        </NavDropdown>
                        <NavDropdown title="Agenda" id="collasible-nav-dropdown">
                            <NavDropdown.Item className={[estilos.itemMenu]} as='div' ><Link className={[estilos.link]} onClick={handleLinkClick} to="/agenda/painel" >Lidata da agenda</Link></NavDropdown.Item>
                            <NavDropdown.Item className={[estilos.itemMenu]} as='div' ><Link className={[estilos.link]} onClick={handleLinkClick} to="/agenda/calendario" >Calendario de agenda</Link></NavDropdown.Item>
                            {/*<NavDropdown.Item className={[estilos.itemMenu]} as='div' ><Link className={[estilos.link]} onClick={handleLinkClick} to="/agenda/eventos/painel" >Evento de agenda</Link></NavDropdown.Item>*/}
                            {/*<NavDropdown.Item className={[estilos.itemMenu]} as='div' ><Link className={[estilos.link]} onClick={handleLinkClick} to="/categoria/eventos/painel" >Categoria de eventos</Link></NavDropdown.Item>*/}
                            
                        </NavDropdown>
                        {/* <NavDropdown title="Fiscal" id="collasible-nav-dropdown">
                            <NavDropdown.Item className={[estilos.itemMenu]} as='div' >Action</NavDropdown.Item>
                            <NavDropdown.Item className={[estilos.itemMenu]} as='div' >Another action</NavDropdown.Item>
                            <NavDropdown.Item className={[estilos.itemMenu]} as='div' >Something</NavDropdown.Item>
                        </NavDropdown> */}
                       
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