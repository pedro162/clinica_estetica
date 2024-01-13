import React from 'react';
import {Formik, ErrorMessage, Field} from 'formik';
import FormControlInput from '../../FormControl/index.js'
import FormControlSelect from '../../FormControl/Select.js'
import {Col, Row} from 'react-bootstrap';
import Button from '../../FormControl/Button.js';
import estilos from './FormCidadeExcluir.module.css'
import Modal from '../../Utils/Modal/index.js'
import useFetch from '../../../Hooks/useFetch.js';
import {UserContex} from '../../../Context/UserContex.js'
import Load from '../../Utils/Load/index.js'
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, CATEGORIA_EVENTO_SAVE_POST, CIDADE_DELETE_POST, CATEGORIA_EVENTO_ONE_GET} from '../../../api/endpoints/geral.js'
import Atualizar from '../Atualizar/index.js'
import Show from '../Show/index.js'

const FormCidadeExcluir = ({dataCidadeChoice, setIdCidade, idCidade, showModalCriarCidade, setShowModalCriarCidade, callback, excluirCadastro, setExcluirCadastro, carregando})=>{
    
    const [carregandoDadosChoice, setCarregandoDadosChoice] = React.useState(false)
	const {data, error, request, loading} = useFetch();
	const fetchToCidade = useFetch();

	const {getToken, dataUser} = React.useContext(UserContex);
	const userLogar =  ()=>{
        console.log('Aqui............')
    }

    const sendData = async ()=>{
       
        if(excluirCadastro == true && idCidade > 0){
            const {url, options} = CIDADE_DELETE_POST(idCidade, getToken());


            const {response, json} = await request(url, options);
            console.log('Response remove item here')
            console.log(json)
            if(json){
                console.log('Response remove item here')
                console.log(json)
                
                callback();
                setShowModalCriarCidade();
                setExcluirCadastro(false);
                setIdCidade(null);
            }

        }

    }

    const mondaDataToTable = ()=>{

        let dataMonted=[];
        if(dataCidadeChoice && dataCidadeChoice.hasOwnProperty('mensagem')){

            let dataRegistro = dataCidadeChoice.mensagem;
            console.log('aqui...........')
            console.log(dataRegistro)
            if(dataRegistro.hasOwnProperty('id')){
                dataMonted.push({
                    label:"Código",
                    valor:`${dataRegistro.id}`,
                    propsLabel:{},
                    propsValor:{},
                });
            }

            if(dataRegistro.hasOwnProperty('name')){
                dataMonted.push({
                    label:"Descrição",
                    valor:`${dataRegistro.name}`,
                    propsLabel:{},
                    propsValor:{},
                });
            }
            
        }

        return dataMonted;
       
    }

    const bodyTable     = mondaDataToTable();
    const tituloTable   = "Tem certeza que deseja excluir este registro ?";
    

	return(
         <>
             
            <Modal  handleConcluir={()=>{sendData()}}  title={ 'Excluir evento de agenda'} size="lg" propsConcluir={{'disabled':loading}} labelConcluir={loading ? 'Salvando...' : 'Concluir'} dialogClassName={'modal-90w'} aria-labelledby={'aria-labelledby'} labelCanelar="Fechar" show={showModalCriarCidade} showHide={()=>{setShowModalCriarCidade();setExcluirCadastro(false);setIdCidade(null);}} >
                {
                    carregando && carregando==true
                    ?
                        (<Load/>)
                    :
                    (    
                        <Row>       
                            <Col xs="12" sm="12" md="12">      
                                <Row className="my-3">
                                    <Col xs="12" sm="12" md="12">
                                        <span className="label_title_grup_forms">Tem certeza que deseja excluir este registro ?</span>
                                    </Col>
                                </Row>
                                <Row className="mb-1">
                                   <Col xs="12" sm="12" md="12">
                                       <Show 
                                            bodyTable={bodyTable}
                                            hasTitle={false}
                                            tituloTable={tituloTable}
                                       />     
                                    </Col> 
                                </Row>
                            </Col>
                        </Row> 
                   )
                            
                }       

            </Modal>
        </>
		
	)
}

export default FormCidadeExcluir;
/*
   
*/