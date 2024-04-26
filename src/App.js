import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Home, NotFound, Login, ProtectedRoute, PainelInicial, Clientes, Grupos, ContasReceber, Caixa, Filial, Parametro, Pais, Estado, Cidade, Agenda, AgendaEvento, CategoriaEvento, Especialidade, Profissionais, Consulta, ConstrutorFicha, ConstrutorFichaItem, Servico,
  OrdemServico, ClientesFichas,MovimentacoesFinanceiras,MenuBotoes,PainelHome
} from './View/index.js'
import {Router, Route, Switch} from 'react-router'
import {history} from './history.js'
import {UserStorange, UserContex} from './Context/UserContex.js'
import Header from './Components/Header/index.js'
import HeaderCanvas from './Components/Header/HeaderCanvas.js'

import { Container} from 'react-bootstrap';
import {isAuthenticated} from './api/Auth/index.js'
import ConstrutorFichaGrupo from './Components/ConstrutorFichaItem';

function App() {
 
  return (
    <div className="" style={{with:'100%', padding:'0', margin:0,}}   >
       <Router history={history}>
          <UserStorange>
              <Header/>
                <Container fluid className={'container_mobile'}>
                  <main className={"main_class"}>
                    <Switch>
                      <ProtectedRoute
                        exact path="/home/painel" 
                        component={PainelHome/*Home*/}
                      />
                      <ProtectedRoute
                        exact path="/" 
                        component={PainelInicial}
                      />
                      <ProtectedRoute
                        exact path="/agenda/painel" 
                        component={Agenda}
                      /><ProtectedRoute
                        exact path="/agenda/calendario" 
                        component={Home}
                      />

                      <ProtectedRoute
                        exact path="/categoria/eventos/painel" 
                        component={CategoriaEvento}
                      />

                      <ProtectedRoute
                        exact path="/categoria/eventos/painel" 
                        component={CategoriaEvento}
                      />
                      <ProtectedRoute
                        exact path="/especialidades/painel" 
                        component={Especialidade}
                      />
                      <ProtectedRoute
                        exact path="/profissionais/painel" 
                        component={Profissionais}
                      />
                       <ProtectedRoute
                        exact path="/clientes/painel" 
                        component={Clientes}
                      />
                      CadastrarCliente
                      <ProtectedRoute
                        exact path="/grupos/painel" 
                        component={Grupos}
                      />
                      
                      <ProtectedRoute
                        exact path="/financeiro/contas_receber" 
                        component={ContasReceber}
                      />
                      
                      <ProtectedRoute
                        exact path="/financeiro/movimentacoes/painel" 
                        component={MovimentacoesFinanceiras}
                      />

                      <ProtectedRoute
                        exact path="/financeiro/caixa" 
                        component={Caixa}
                      />

                      <ProtectedRoute
                        exact path="/" 
                        component={PainelInicial}
                      />
                      <Route
                        path="/usuario/login" 
                        component={Login}
                      />
                      <ProtectedRoute
                        path="/configuracoes/filial" 
                        component={Filial}
                      />
                      <ProtectedRoute
                        path="/configuracoes/sistema" 
                        component={Parametro}
                      />
                      <ProtectedRoute
                        path="/configuracoes/pais" 
                        component={Pais}
                      />
                      <ProtectedRoute
                        path="/configuracoes/estado" 
                        component={Estado}
                      />
                      <ProtectedRoute
                        path="/configuracoes/cidade" 
                        component={Cidade}
                      />

                      <ProtectedRoute
                        path="/configuracoes/construtor/ficha" 
                        component={ConstrutorFicha}
                      />

                      <ProtectedRoute
                        path="/configuracoes/construtor/ficha/grupo" 
                        component={ConstrutorFichaGrupo}
                      />

                      <ProtectedRoute
                        path="/configuracoes/construtor/ficha/item" 
                        component={ConstrutorFichaItem}
                      />

                      <ProtectedRoute
                        path="/consulta/index" 
                        component={Consulta}
                      />

                      <ProtectedRoute
                        path="/fichas/index" 
                        component={ClientesFichas}
                      />

                      <ProtectedRoute
                        path="/servico/painel" 
                        component={Servico}
                      />

                      <ProtectedRoute
                        path="/ordem/servico/painel" 
                        component={OrdemServico}
                      />



                      <ProtectedRoute
                        path="*" 
                        component={NotFound}
                      />
                      
                    </Switch>
                  </main>
                </Container>
            
          </UserStorange>
      </Router>
    </div>
  );
}


export default App;
