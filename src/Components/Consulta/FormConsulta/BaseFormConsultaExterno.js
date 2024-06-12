import React from 'react'
import {Formik, ErrorMessage, Field} from 'formik';
import FormControlInput from '../../FormControl/index.js'
import FormControlRadio from '../../FormControl/Radio.js'
import FormControlSelect from '../../FormControl/Select.js'
import {Col, Row, Tabs, Tab, Button} from 'react-bootstrap';
import Load from '../../Utils/Load/index.js'
import AlertaDismissible from '../../Utils/Alerta/AlertaDismissible'
import { faHome, faSearch, faPlus, faTimes, faChevronCircleRight, faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import estilos from './FormConsulta.module.css'
import CalendarioSimplesConsultaExterno  from '../../Utils/Calendario/CalendarioSimplesConsultaExterno.js'

const BaseFormConsultaExterno = ({carregando, error, handleSubmit, setAbaAtual, abaAtual, benfeficiario, atualizarConsulta, gerarListEspecializacao, dateConsultaAtendimento, especializacao,
    loading,dataProfissionalDiasExprediente,titulosTableArr,rowsTableArr,gerarListHorario,horario, handleChange ,
    handleBlur,values, setBeneficiario, setEspecializacoes, ...props})=>{

    return(
        <Row>
            <Col>
            {
									
                                    carregando && carregando==true
                                    ?
                                        (<Load/>)
                                    :
                                        (  
                                            <form onSubmit={handleSubmit}>
                                                <Row className="my-3">
                                                    <Col xs="12" sm="12" md="12">
                                                        <span className="label_title_grup_forms">Dados básicos</span>
                                                    </Col>
                                                </Row>
                                
                                                {
                                                    error && <Row className="my-3">
                                                        <Col xs="12" sm="12" md="12">
                                                            <AlertaDismissible title="Atenção:" message={error} variant={"danger"} />
                                                        </Col>
                                                    </Row>
                                                }
                                
                                                {
                                                    !atualizarConsulta ? (
                                                        <>
                                                            <Row className='mb-1'>
                                                                <Col >
                                                                    <Tabs
                                                                          defaultActiveKey={'benfeficiario'}
                                                                          activeKey={abaAtual}
                                                                          onSelect={setAbaAtual}
                                
                                                                          id="uncontrolled-tab-example"
                                                                          className="mb-3"
                                                                          fill
                                                                     >
                                                                        <Tab eventKey="benfeficiario" title={<span style={abaAtual == 'benfeficiario' ? {color:'green', fontWeight:'bolder'} : {} } >Cliente</span>} { ...( abaAtual != 'benfeficiario' ? {disabled:'disabled'} : {}) }  variant="pills"   >
                                                                            <Row className="mb-1" >
                                                                                <Col className={'justify-content-md-center'} md={{ span: 6, offset: 3 }} style={{display:'flex', flexDierectoin:'column', alignItems:'center', justifyContent:'center'}} >
                                                                                    <Button className={ `btn btn-sm ${benfeficiario > 0 ? 'btn-primary' : 'btn-secondary'} `} style={{borderRadius:'50px'}} onClick={()=>{setBeneficiario((benfeficiario)=>{ if(benfeficiario > 0){ return 0}else{setAbaAtual('especialization'); return 1;} } ); setEspecializacoes([]); }}>
                                                                                             José pedro Aguirar Ferreira
                                                                                      </Button>	
                                                                                </Col>
                                                                            </Row>
                                
                                                                            <Row>
                                                                                
                                                                                {benfeficiario > 0 ? (
                                                                                    <>
                                                                                        <Col md={4} sm={6} xs={6} style={{display:'flex', flexDierectoin:'column', alignItems:'center', justifyContent:'center'}} >
                                                                                            <Button onClick={()=>{setAbaAtual('especialization') } } className={ `btn btn-sm btn-primary`} style={{borderRadius:'50px'}} >
                                                                                                 <FontAwesomeIcon icon={faChevronCircleLeft} /> Anterior
                                                                                            </Button>
                                                                                        </Col>
                                
                                                                                        <Col md={{ span: 4, offset: 4 }} sm={6} xs={6} style={{display:'flex', flexDierectoin:'column', alignItems:'center', justifyContent:'center'}} >
                                                                                            <Button onClick={()=>{setAbaAtual('especialization') } } className={ `btn btn-sm btn-primary`} style={{borderRadius:'50px'}} >
                                                                                                 Próximo  <FontAwesomeIcon icon={faChevronCircleRight} /> 
                                                                                            </Button>
                                                                                        </Col>
                                                                                    </>
                                                                                ):(
                                                                                    <>
                                                                                        <Col md={{ span: 4, offset: 8 }}>
                                                                                            <Button onClick={()=>{setAbaAtual('especialization') } } className={ `btn btn-sm btn-primary`} style={{borderRadius:'50px'}} >
                                                                                                 Próximo <FontAwesomeIcon icon={faChevronCircleRight} /> 
                                                                                            </Button>
                                                                                        </Col>
                                                                                    </>
                                                                                )}
                                                                            </Row>
                                
                                                                        </Tab>
                                                                          <Tab eventKey="especialization" title={<span style={abaAtual == 'especialization' ? {color:'green', fontWeight:'bolder'} : {} } >Serviço</span>}   { ...(abaAtual != 'especialization' ? {disabled:'disabled'} : {}) } className={'btn-next-especialization'}   >
                                                                             
                                                                            <Row className="mb-2" >
                                                                                
                                                                               {loading && <Load/>}
                                
                                                                                {Array.isArray(gerarListEspecializacao()) && gerarListEspecializacao().length > 0 ? 
                                                                                     (
                                                                                        gerarListEspecializacao().map((item, index, arr)=>{
                                                                                            let celBodyTableArr 		= item.hasOwnProperty('celBodyTableArr') 		? item.celBodyTableArr : [];
                                                                                              let propsRowBodyTable 		= item.hasOwnProperty('propsRow') 				? item.propsRow: {};
                                                                                              let id 						= propsRowBodyTable.hasOwnProperty('id') 		? propsRowBodyTable.id: 0;
                                                                                              let propsContainerTitulo 	= item.hasOwnProperty('propsContainerTitulo') 	? item.propsContainerTitulo: {};
                                                                                              let propsContainerButtons 	= item.hasOwnProperty('propsContainerButtons') 	? item.propsContainerButtons: {};
                                                                                              let acoesBottomCard 		= item.hasOwnProperty('acoesBottomCard') 		? item.acoesBottomCard: [];
                                
                                
                                                                                              let titleRow 				= propsRowBodyTable.hasOwnProperty('titleRow') 		? propsRowBodyTable.titleRow : '';
                                                                                              let style 					= propsRowBodyTable.hasOwnProperty('style') 		? propsRowBodyTable.style : {};
                                                                                              let mainIcon 				= propsRowBodyTable.hasOwnProperty('mainIcon') 		? propsRowBodyTable.mainIcon : null;
                                
                                                                                              id = Number(id);
                                                                                              let titleCard 			= item?.title
                                                                                              if(!titleCard){
                                                                                                  titleCard = ''
                                                                                              }
                                
                                                                                              return(
                                                                                                  <Col md={6} sm={6} xs={6} key={id+index+arr.length} className={'justify-content-md-center mb-4'} style={{display:'flex', flexDierectoin:'column', alignItems:'center', justifyContent:'center'}} >
                                                                                                    <Button {...propsRowBodyTable} >
                                                                                                             {titleRow}
                                                                                                      </Button>	
                                                                                                </Col>
                                                                                              )
                                                                                        })
                                       
                                                                                    )
                                                                                    :('')
                                                                                 }
                                
                                
                                                                            </Row>
                                                                            <Row>
                                                                                
                                
                                                                                {especializacao > 0 ? (
                                                                                    <>
                                                                                        <Col md={4} sm={6} xs={6} style={{display:'flex', flexDierectoin:'column', alignItems:'center', justifyContent:'center'}} >
                                                                                            <Button onClick={()=>{setAbaAtual('benfeficiario') } } className={ `btn btn-sm btn-primary`} style={{borderRadius:'50px'}} >
                                                                                                 <FontAwesomeIcon icon={faChevronCircleLeft} /> Anterior
                                                                                            </Button>
                                                                                        </Col>
                                
                                                                                        <Col md={{ span: 4, offset: 4 }} sm={6} xs={6} style={{display:'flex', flexDierectoin:'column', alignItems:'center', justifyContent:'center'}} >
                                                                                            <Button onClick={()=>{setAbaAtual('date') } } className={ `btn btn-sm btn-primary`} style={{borderRadius:'50px'}} >
                                                                                                 Próximo <FontAwesomeIcon icon={faChevronCircleRight} /> 
                                                                                            </Button>
                                                                                        </Col>
                                                                                    </>
                                                                                ):(
                                                                                    <>
                                                                                        <Col md={4} sm={6} xs={6} style={{display:'flex', flexDierectoin:'column', alignItems:'center', justifyContent:'center'}} >
                                                                                            <Button onClick={()=>{setAbaAtual('benfeficiario') } } className={ `btn btn-sm btn-primary`} style={{borderRadius:'50px'}} >
                                                                                                 <FontAwesomeIcon icon={faChevronCircleLeft} /> Anterior
                                                                                            </Button>
                                                                                        </Col>
                                                                                    </>
                                                                                )}
                                
                                                                            </Row>
                                                                        </Tab>
                                
                                                                        <Tab eventKey="date" title={<span style={abaAtual == 'date' ? {color:'green', fontWeight:'bolder'} : {} } >Data</span>} { ...(abaAtual != 'date' ? {disabled:'disabled'} : {}) }  >
                                                                            <Row className="mb-2">
                                                                                {loading && <Load/>}
                                                                                
                                                                                <Col>
                                                                                {! loading && dataProfissionalDiasExprediente && (
                                                                                            <CalendarioSimplesConsultaExterno
                                
                                                                                                titulosTableArr={titulosTableArr}
                                                                                                rowsTableArr={rowsTableArr}
                                                                                                loading={loading}
                                                                                                nadaEncontrado={null}
                                                                                                defaultDate={dateConsultaAtendimento}
                                                                                            />
                                                                                    )}
                                                                                    
                                
                                                                                </Col>
                                                                            </Row>
                                                                            <Row >
                                                                                
                                
                                                                                {dateConsultaAtendimento ? (
                                                                                    <>
                                                                                        <Col md={4} sm={6} xs={6} style={{display:'flex', flexDierectoin:'column', alignItems:'center', justifyContent:'center'}} >
                                                                                            <Button onClick={()=>{setAbaAtual('especialization') } } className={ `btn btn-sm btn-primary`} style={{borderRadius:'50px'}} >
                                                                                                <FontAwesomeIcon icon={faChevronCircleLeft} /> Anterior 
                                                                                            </Button>
                                                                                        </Col>
                                
                                                                                        <Col md={{ span: 4, offset: 4 }} sm={6} xs={6} style={{display:'flex', flexDierectoin:'column', alignItems:'center', justifyContent:'center'}} >
                                                                                            <Button onClick={()=>{setAbaAtual('hour') } } className={ `btn btn-sm btn-primary`} style={{borderRadius:'50px'}} >
                                                                                                Próximo <FontAwesomeIcon icon={faChevronCircleRight} /> 
                                                                                            </Button>
                                                                                        </Col>
                                                                                    </>
                                                                                ):(
                                                                                    <>
                                                                                        <Col md={4} sm={6} xs={6} style={{display:'flex', flexDierectoin:'column', alignItems:'center', justifyContent:'center'}} >
                                                                                            <Button onClick={()=>{setAbaAtual('especialization') } } className={ `btn btn-sm btn-primary`} style={{borderRadius:'50px'}} >
                                                                                                <FontAwesomeIcon icon={faChevronCircleLeft} /> Anterior
                                                                                            </Button>
                                                                                        </Col>
                                                                                    </>
                                                                                )}
                                
                                                                            </Row>
                                
                                                                            
                                                                        </Tab>
                                
                                                                          <Tab eventKey="hour" title={<span style={abaAtual == 'hour' ? {color:'green', fontWeight:'bolder'} : {} } >Horáro</span>} { ...(abaAtual != 'hour' ? {disabled:'disabled'} : {}) }  >
                                                                            <Row className="mb-2">
                                                                                {loading && <Load/>}
                                
                                                                                <Col>
                                                                                    {
                                                                                        Array.isArray(gerarListHorario()) && gerarListHorario().length > 0 ? 
                                                                                         (
                                                                                            gerarListHorario().map((item, index, arr)=>{
                                                                                                let celBodyTableArr 		= item.hasOwnProperty('celBodyTableArr') 		? item.celBodyTableArr : [];
                                                                                                  let propsRowBodyTable 		= item.hasOwnProperty('propsRow') 				? item.propsRow: {};
                                                                                                  let id 						= propsRowBodyTable.hasOwnProperty('id') 		? propsRowBodyTable.id: 0;
                                                                                                  let propsContainerTitulo 	= item.hasOwnProperty('propsContainerTitulo') 	? item.propsContainerTitulo: {};
                                                                                                  let propsContainerButtons 	= item.hasOwnProperty('propsContainerButtons') 	? item.propsContainerButtons: {};
                                                                                                  let acoesBottomCard 		= item.hasOwnProperty('acoesBottomCard') 		? item.acoesBottomCard: [];
                                
                                
                                                                                                  let titleRow 				= propsRowBodyTable.hasOwnProperty('titleRow') 		? propsRowBodyTable.titleRow : '';
                                                                                                  let style 					= propsRowBodyTable.hasOwnProperty('style') 		? propsRowBodyTable.style : {};
                                                                                                  let mainIcon 				= propsRowBodyTable.hasOwnProperty('mainIcon') 		? propsRowBodyTable.mainIcon : null;
                                
                                                                                                  id = Number(id);
                                                                                                  let titleCard 			= item?.title
                                                                                                  if(!titleCard){
                                                                                                      titleCard = ''
                                                                                                  }
                                
                                                                                                  return(
                                                                                                      <Col  key={id+index+arr.length}>
                                
                                                                                                         <Row className={'pb-2 px-1'}  style={{...style}} > 
                                                                                                            
                                                                                                            <Col xs={12} sm={12} md={12}  style={{textAlign:'left', fontSize:'10pt'}}>
                                                                                                                <Row className={'mb-1'}>
                                                                                                                    <span style={{fontSize:'14pt', fontWeight:'bolder'}} >{titleRow}</span>
                                                                                                                </Row>
                                
                                                                                                   
                                                                                                            {
                                                                                                                  celBodyTableArr && Array.isArray(celBodyTableArr) && celBodyTableArr.length > 0 ? (
                                                                                                                    celBodyTableArr.map((itemCelArr, indexCelArr, arrCelArr)=>{
                                
                                                                                                                        return(
                                                                                                                                <div  key={indexCelArr+arrCelArr.length+itemCelArr.length} >
                                                                                                                                    <Row>
                                
                                                                                                                                        {
                                                                                                                                            Array.isArray(itemCelArr) && itemCelArr.length > 0 ? 
                                
                                                                                                                                            (
                                                                                                                                                itemCelArr.map((itemCel, indexCel, arrCel)=>{
                                
                                
                                                                                                                                                    let labelCel = itemCel.hasOwnProperty('label') ? itemCel.label :'';
                                                                                                                                                    let toSum = itemCel.hasOwnProperty('toSum') ? itemCel.toSum :0;
                                                                                                                                                    let title = itemCel.hasOwnProperty('title') ? itemCel.title : '';
                                                                                                                                                    let propsRow = itemCel.hasOwnProperty('propsRow') ? itemCel.propsRow : {};
                                                                                                                                                     
                                                                                                                                                    let isCoin              = itemCel.hasOwnProperty('isCoin') ? itemCel.isCoin :0;
                                                                                                                                                    
                                                                                                                                                    
                                
                                                                                                                                                    let propsCelBodyTable 	= itemCel.hasOwnProperty('props') ? itemCel.props : {};
                                                                                                                                                    return <Col key={indexCel} ><Button {...propsCelBodyTable} >{labelCel}</Button></Col>
                                                                                                                                                })
                                                                                                                                            )
                                                                                                                                            :
                                
                                                                                                                                            ('')
                                                                                                                                        }
                                                                                                                                     </Row>
                                                                                                                                        
                                                                                                                                </div>	
                                                                                                                        )
                                                                                                                    })
                                
                                                                                                                ) : ('')
                                                                                                              }
                                                                                                              </Col>
                                                                                                          </Row>
                                                                                                          <hr style={{margin:'0',padding:'0'}}/>
                                
                                                                                                 </Col>
                                                                                                  )
                                                                                            })
                                           
                                                                                        )
                                                                                        :('')
                                                                                     }
                                
                                                                                </Col>
                                                                            </Row>
                                                                            
                                                                            <Row >
                                                                                
                                
                                                                                {horario > 0 ? (
                                                                                    <>
                                                                                        <Col md={4} sm={6} xs={6} style={{display:'flex', flexDierectoin:'column', alignItems:'center', justifyContent:'center'}} >
                                                                                            <Button onClick={()=>{setAbaAtual('date') } } className={ `btn btn-sm btn-primary`} style={{borderRadius:'50px'}} >
                                                                                                 <FontAwesomeIcon icon={faChevronCircleLeft} /> Anterior 
                                                                                            </Button>
                                                                                        </Col>
                                
                                                                                        <Col md={{ span: 4, offset: 4 }} sm={6} xs={6} style={{display:'flex', flexDierectoin:'column', alignItems:'center', justifyContent:'center'}} >
                                                                                            <Button onClick={()=>{setAbaAtual('confirm') } } className={ `btn btn-sm btn-primary`} style={{borderRadius:'50px'}} >
                                                                                                 Próximo <FontAwesomeIcon icon={faChevronCircleRight} /> 
                                                                                            </Button>
                                                                                        </Col>
                                                                                    </>
                                                                                ):(
                                                                                    <>
                                                                                        <Col md={4} sm={6} xs={6} style={{display:'flex', flexDierectoin:'column', alignItems:'center', justifyContent:'center'}} >
                                                                                            <Button onClick={()=>{setAbaAtual('date') } } className={ `btn btn-sm btn-primary`} style={{borderRadius:'50px'}} >
                                                                                                 <FontAwesomeIcon icon={faChevronCircleLeft} /> Anterior 
                                                                                            </Button>
                                                                                        </Col>
                                                                                    </>
                                                                                )}
                                
                                                                            </Row>
                                                                        </Tab>
                                
                                
                                                                          <Tab eventKey="confirm" title={<span style={abaAtual == 'confirm' ? {color:'green', fontWeight:'bolder'} : {} } >Confirmar</span>}  { ...(abaAtual != 'confirm' ? {disabled:'disabled'} : {}) }  >
                                                                            <Row>
                                                                                <Col style={{display:'flex', flexDierectoin:'column', alignItems:'center', justifyContent:'center'}} >
                                                                                    <Button variant="primary" propsConcluir={{'disabled':loading}} className="botao_success btn btn-sm" onClick={()=>{handleSubmit(); }}>
                                                                                        {loading ? 'Salvando...' : 'Concluir'}
                                                                                    </Button>
                                                                                </Col>
                                                                                
                                                                            </Row>
                                                                            <Row>
                                                                                <Col >
                                                                                    <Button className={ `btn btn-sm btn-primary`} style={{borderRadius:'50px'}} onClick={()=>setAbaAtual('hour')}>
                                                                                         <FontAwesomeIcon icon={faChevronCircleLeft} /> Anterior
                                                                                      </Button>		  		    
                                                                                </Col>
                                                                                <Col>
                                                                                    <span
                                                                                        
                                                                                    >
                                                                                        
                                                                                    </span>
                                                                                </Col>
                                                                            </Row>
                                                                        </Tab>
                                                                        {/*<Tab eventKey="contact" title="Contact" disabled>
                                                                                                                                            Tab content for Contact
                                                                                                                                        </Tab>*/}
                                                                    </Tabs>
                                                                </Col >
                                                            </Row>
                                
                                                              
                                                        </>
                                                    )
                                
                                                    :
                                                    (
                                                        <>
                                                            
                                
                                                            <Row>
                                                                <Col xs="12" sm="12" md="6">
                                                                    <Field
                                                                            data={
                                                                                {
                                                                                    hasLabel:true,
                                                                                    contentLabel:'Tipo',
                                                                                    atributsFormLabel:{
                                
                                                                                    },
                                                                                    atributsFormControl:{
                                                                                        type:'text',
                                                                                        name:'tipo',
                                                                                        placeholder:'Informe a tipo',
                                                                                        id:'tipo',
                                                                                        onChange:handleChange,
                                                                                        onBlur:handleBlur,
                                                                                        value:values.tipo,
                                                                                        className:estilos.input,
                                                                                        size:"sm"
                                                                                    },
                                                                                    options:[{label:'Selecione...',valor:'',props:{selected:'selected', disabled:'disabled'}},{label:'Serviço',valor:'servico',props:{}},{label:'Avaliacao',valor:'avaliacao',props:{}},{label:'Consulta',valor:'consulta',props:{}},{label:'Retorno',valor:'retorno',props:{}}],
                                                                                    atributsContainer:{
                                                                                        className:''
                                                                                    }
                                                                                }
                                                                            }
                                                                        
                                                                            component={FormControlSelect}
                                                                        ></Field>
                                                                        <ErrorMessage className="alerta_error_form_label" name="tipo" component="div" />
                                                                </Col>
                                                                <Col xs="12" sm="12" md="6">
                                                                    <Field
                                                                            data={
                                                                                {
                                                                                    hasLabel:true,
                                                                                    contentLabel:'Observação',
                                                                                    atributsFormLabel:{
                                
                                                                                    },
                                                                                    atributsFormControl:{
                                                                                        type:'text',
                                                                                        name:'historico',
                                                                                        placeholder:'Observação',
                                                                                        id:'historico',
                                                                                        onChange:handleChange,
                                                                                        onBlur:handleBlur,
                                                                                        value:values.historico,
                                                                                        className:estilos.input,
                                                                                        size:"sm"
                                                                                    },
                                                                                    options:[],
                                                                                    atributsContainer:{
                                                                                        className:''
                                                                                    }
                                                                                }
                                                                            }
                                                                        
                                                                            component={FormControlInput}
                                                                        ></Field>
                                                                        <ErrorMessage className="alerta_error_form_label" name="historico" component="div" />
                                                                </Col>
                                                            </Row>     
                                                        </>
                                                    )
                                                
                                                }
                                                
                                            </form>
                                
                                        )
                                                            
                                }  
            </Col>
        </Row>
    )
}


export default BaseFormConsultaExterno;