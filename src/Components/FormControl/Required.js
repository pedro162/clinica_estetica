import React from 'react';
import { Container, Col, Row, Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import FormControlInput from './index.js'
import { faHome, faSearch,faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CLIENTES_ALL_POST } from '../../api/endpoints/geral.js';
import { getToken } from '../../api/Auth/index.js';
import useFetch from '../../Hooks/useFetch.js';
import estilos from './Required.module.css'
import Modal from '../Utils/Modal/index.js'
import Profissionais from '../Profissionais/index.js';
import Clientes from '../Clientes/index.js';

const Required = ({data, url_btn, callback_selected, props_btn_search, label_btn_search, ...props})=>{
    const [cod, setCod] = React.useState('');
    const [description, setDescription] = React.useState(''); 
    const[activeSuggestion, setActiveSuggestion] = React.useState(0);
    const[filteredSuggestions, setFilteredSuggestions] = React.useState([]);
    const[showSuggestions, setShowSuggestions] = React.useState(false);
    const [showModalCriarProfissionais, setShowModalCriarProfissionais] = React.useState(false)
    const [cadastrarProfissionais, setCadastrarProfissionais] = React.useState(false)    

    const {error, request, loading} = useFetch();

    const hasLabel = data.hasOwnProperty('hasLabel') ? data.hasLabel : false;
    const contentLabel = data.hasOwnProperty('contentLabel') ? data.contentLabel : null;
    const atributsFormLabel =  data.hasOwnProperty('atributsFormLabel') ? data.atributsFormLabel : {};

    const atributsFormControl =  data.hasOwnProperty('atributsFormControl') ? data.atributsFormControl : {};
    const name_cod = atributsFormControl.hasOwnProperty('name_cod') ? atributsFormControl.name_cod : null;
    const name_description = atributsFormControl.hasOwnProperty('name_desacription') ? atributsFormControl.name_desacription : null;
    
    const atributsContainer =  data.hasOwnProperty('atributsContainer') ? data.atributsContainer : {};
    const hookToLoadFromDescription =  data.hasOwnProperty('hookToLoadFromDescription') ? data.hookToLoadFromDescription : ()=>null;
    

    const handleChangeCod = async ({target, ...event})=>{
       
        let data_get = target.value;

        const {url, options} = hookToLoadFromDescription({to_require:true, codigo_to_search:data_get}, getToken());
        const {response, json} = await request(url, options);
        if(json && json.hasOwnProperty('mensagem')){
            let registro = json.mensagem[0];
            setCod(registro?.value)
            setDescription(registro?.label)
        }
    }

    const handleBlurCod = async ({target, ...event})=>{
        
        let data_get = target.value;

        const {url, options} = hookToLoadFromDescription({to_require:true, codigo_to_search:data_get}, getToken());
        const {response, json} = await request(url, options);
        if(json && json.hasOwnProperty('mensagem')){
            let registro = json.mensagem[0];
            setCod(registro?.value)
            setDescription(registro?.label)
        }
    }

    const handleChangeDescription = async ({target, ...ev})=>{
        console.log(ev)
        console.log('Description: '+target.value);
        let data_get = target.value;
        setDescription(data_get)
        if(! (String(data_get).trim() > 0)){

        }
        const {url, options} = hookToLoadFromDescription({to_require:true, description_to_search:data_get}, getToken());
        const {response, json} = await request(url, options);
        console.log('------------------- All clients here ------------------------------------ ')
        console.log(json)

        console.log('---------------------------------------');
        if(json && json.hasOwnProperty('mensagem')){
            setFilteredSuggestions(json.mensagem)
            setShowSuggestions(true)
            setActiveSuggestion(0)
        }else{
            setFilteredSuggestions([])
            setShowSuggestions(false)
            setActiveSuggestion(0)
        }
    }


    const handleBlurDescription = ({target})=>{
        console.log('Description: '+target.value);

    }

    const searchBtn = ()=>{
        setCadastrarProfissionais(true)
    }

    const onClickSugestion = (value, label)=>{
        setCod(value)
        setDescription(label)
        setActiveSuggestion(0)
        setShowSuggestions(false)
    }

    const onKeyDownSugestion = e => {
    
        if (e.keyCode === 13) {
          setActiveSuggestion(0)
          setShowSuggestions(false)
          if(filteredSuggestions[activeSuggestion]){
            if(filteredSuggestions[activeSuggestion].hasOwnProperty('label')){

                setDescription(filteredSuggestions[activeSuggestion].label)
            }

            if(filteredSuggestions[activeSuggestion].hasOwnProperty('value')){
                setCod(filteredSuggestions[activeSuggestion].value)
            }
          }
          

        } else if (e.keyCode === 38) {
            if (activeSuggestion === 0) {
                return;
            }
            setActiveSuggestion(activeSuggestion - 1)
        }
        // User pressed the down arrow, increment the index
        else if (e.keyCode === 40) {
            if (activeSuggestion - 1 === filteredSuggestions.length) {
                return;
            }
            setActiveSuggestion(activeSuggestion + 1)
        }
    };

    React.useEffect(()=>{

        if(cadastrarProfissionais == true){
            setShowModalCriarProfissionais(true);
        }else{
            setShowModalCriarProfissionais(false);
        }

        
    }, [cadastrarProfissionais])
    

    return(
        <Row >
            {
                hasLabel && contentLabel ? 
                    <Form.Label  {... atributsFormLabel}  >{contentLabel}</Form.Label>
                :
                null
            }
            <Col style={{'margin':'0px', 'paddingRight':'0px'}}  xs="4" sm="4" md="4">
                    <FormControlInput
                         data={
                            {
                                hasLabel:false,
                                contentLabel:'',
                                atributsFormLabel:{

                                },
                                atributsFormControl:{
                                    type:'text',
                                    name:name_cod,
                                    placeholder:'Cód',
                                    id:name_cod,
                                    onChange:(ev)=>{atributsFormControl.onChange(ev);handleChangeCod(ev)},
                                    onBlur:(ev)=>{atributsFormControl.onBlur(ev);handleBlurCod(ev)},
                                    value:cod,
                                    className:"",
                                    size:"sm",
                                    style:{'marginRight':'0px'}
                                },
                                atributsContainer:{
                                    className:'',
                                }
                            }
                        }
                    />
            </Col>
            <Col  style={{'margin':'0px', 'padding':'0px'}}  xs="1" sm="1" md="1">
                <Button style={{'margin':'0px'}} variant="primary" {...props_btn_search} className="botao_success btn btn-sm" onClick={searchBtn}>
		                {label_btn_search ? label_btn_search : (<FontAwesomeIcon icon={faSearch} />)}
		        </Button>
            </Col>
            <Col style={{'margin':'0px', 'padding-left':'0px'}} xs="7" sm="7" md="7">
                     <FormControlInput
                         data={
                            {
                                hasLabel:false,
                                contentLabel:'Sobrenome',
                                atributsFormLabel:{

                                },
                                atributsFormControl:{
                                    type:'text',
                                    name:name_description,
                                    placeholder:'fulano de tal',
                                    id:name_description,
                                    onChange:(ev)=>handleChangeDescription(ev),
                                    onBlur:(ev)=>handleBlurDescription(ev),
                                    onKeyDown:(ev)=>onKeyDownSugestion(ev),
                                    value:description,
                                    className:'',
                                    size:"sm",
                                    style:{'margin':'0px'}
                                },
                                atributsContainer:{
                                    className:''
                                }
                            }
                        }
                    />
            </Col>
            <Col>
                { 
                     (showSuggestions && description) 
                     ?
                     (
                         (filteredSuggestions.length) ? (
                            <ul className={estilos.suggestions}>
                                {filteredSuggestions.map((suggestion, index) => {

                                    let label = suggestion.hasOwnProperty('label') ? suggestion.label : 'Teste';
                                    let value = suggestion.hasOwnProperty('value') ? suggestion.value : '1';
                                    let className;

                                    // Flag the active suggestion with a class
                                    if (index === activeSuggestion) {
                                        className = estilos.suggestion_active;
                                    }
                                    return (
                                        <li className={className} key={(value+label+index)} onClick={()=>onClickSugestion(value, label)}>
                                        {value+' - '+label}
                                        </li>
                                    );
                                })}
                            </ul>
                          )
                          :(

                            <div className={estilos.no_suggestions}>
                                <em>No suggestions available.</em>
                            </div>

                          ) 
                        
                     )
                
                    :
                    (null)
                }
            </Col>
            <Modal  handleConcluir={()=>null}  title={"Pessoas"} size="lg" noBtnConcluir={true} dialogClassName={'modal-100w modal-xl'} aria-labelledby={'aria-labelledby'} labelCanelar="Fechar" show={showModalCriarProfissionais} showHide={()=>{setShowModalCriarProfissionais();setCadastrarProfissionais(false)}}>
                <Clientes/>
            </Modal>
        </Row>

    )
}

export default Required;