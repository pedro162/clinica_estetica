import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Home, NotFound, Login, ProtectedRoute, PainelInicial, Clientes, Grupos, ContasReceber, Caixa, Filial, Parametro, Pais, Estado, Cidade, AgendaEvento, CategoriaEvento, Especialidade, Profissionais} from './View/index.js'
import {Router, Route, Switch} from 'react-router'
import {history} from './history.js'
import {UserStorange, UserContex} from './Context/UserContex.js'
import Header from './Components/Header/index.js'
import { Container} from 'react-bootstrap';
import {isAuthenticated} from './api/Auth/index.js'

function App() {
 
  return (
    <div className="">
       <Router history={history}>
          <UserStorange>
              <Header/>
                <Container fluid>
                  <main className="">
                    <Switch>
                      <ProtectedRoute
                        exact path="/home/painel" 
                        component={Home}
                      />
                      <ProtectedRoute
                        exact path="/" 
                        component={PainelInicial}
                      />
                      <ProtectedRoute
                        exact path="/agenda/eventos/painel" 
                        component={AgendaEvento}
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
                      <ProtectedRoute
                        exact path="/grupos/painel" 
                        component={Grupos}
                      />
                      
                      <ProtectedRoute
                        exact path="/financeiro/contas_receber" 
                        component={ContasReceber}
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
                      <Route
                        path="/configuracoes/filial" 
                        component={Filial}
                      />
                      <Route
                        path="/configuracoes/sistema" 
                        component={Parametro}
                      />
                      <Route
                        path="/configuracoes/pais" 
                        component={Pais}
                      />
                      <Route
                        path="/configuracoes/estado" 
                        component={Estado}
                      />
                      <Route
                        path="/configuracoes/cidade" 
                        component={Cidade}
                      />

                      <Route
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
