import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Home, NotFound, Login, ProtectedRoute, PainelInicial} from './View/index.js'
import {Router, Route, Switch} from 'react-router'
import {history} from './history.js'
import {UserStorange, UserContex} from './Context/UserContex.js'
import Header from './Components/Header/index.js'
import { Container} from 'react-bootstrap';

function App() {
  
 //console.log(UserContext)
 
  return (
    <div className="">
       <Router history={history}>
          <UserStorange>
              <Header/>
                <Container fluid>
                  <main className="">
                    <Switch>
                      <ProtectedRoute
                        exact path="/" 
                        component={Home}
                      />
                      <ProtectedRoute
                        exact path="/home/painel" 
                        component={PainelInicial}
                      />
                      
                      <Route
                        exact path="/usuario/login" 
                        component={Login}
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
