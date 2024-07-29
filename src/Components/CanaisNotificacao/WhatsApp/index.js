// SendWhatsApp.js
import React from 'react';
import {useParams} from 'react-router-dom'
import { Form, Button, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import FormWhatsApp from './FormWhatsApp/index';
import useFetch from '../../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, CLIENTES_ONE_GET, GRUPOS_ALL_POST} from '../../../api/endpoints/geral.js'
import {UserContex} from '../../../Context/UserContex.js'
import Modal from '../../Utils/Modal/index.js'
import Load from '../../Utils/Load/index.js'
import {Col, Row,} from 'react-bootstrap';
import AlertaDismissible from '../../Utils/Alerta/AlertaDismissible.js'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom/cjs/react-router-dom.min.js';
import Breadcrumbs from '../../Helper/Breadcrumbs.js'
//import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

const SendWhatsApp = ({idPessoa, setIdPessoa, callback, atualizarWhatsApp, setAtualizarWhatsApp, noUseModal,...props}) => {
  const [email, setWhatsApp] = React.useState('');
  const [subject, setSubject] = React.useState('');
  const [body, setBody] = React.useState('');
  const [showModalAtualizarWhatsApp, setShowModalAtualizarWhatsApp] = React.useState(false)
  const [carregando, setCarregando] = React.useState(false)
  const [dataDestinatario, setDataDataDestinatario] = React.useState(null)
  const [dataGrupo, setDataGrupo] = React.useState(null)
	const {getToken, dataUser} = React.useContext(UserContex);	
  const [erroValidacao, setErroValidacao] = React.useState(null)
  const [showModalErro, setShowModalErro] = React.useState(false)
  const [mostarFiltros, setMostarFiltros] = React.useState(true) 
  const [sendForm, setSendForm] = React.useState(false) 
  const [noUseModalMode, setNoUseModalMode] = React.useState(true) 

  const formikRef = React.useRef(null);

  const {data, error, request, loading} = useFetch();
  const {id} = useParams();
  if(!(idPessoa > 0)){
    idPessoa = id
  }

  const handleSendWhatsApp = () => {
    // Aqui você deve adicionar a lógica para enviar o e-mail
    console.log('WhatsApp:', email);
    console.log('Subject:', subject);
    console.log('Body:', body);
  };

  const handleConcluir = ()=>{
    if (formikRef.current) {
      formikRef.current();
    }
  }

  React.useEffect(()=>{
		
		const getDataPessoa = async ()=>{
			if(idPessoa > 0){
				const {url, options} = CLIENTES_ONE_GET(idPessoa, getToken());
				const {response, json} = await request(url, options);
				if(json){
					
					setDataDataDestinatario(json)
					
					let data = json?.mensagem
					let erroValidaao  = [];
					if(Array.isArray(erroValidaao) && erroValidaao.length > 0){
						setShowModalErro(true)
						erroValidaao = erroValidaao.join('<br/>')
						setErroValidacao(erroValidaao)
						Swal.fire({
							  	icon: "error",
							  	title: "Oops...",
							  	text: erroValidaao,
							  	footer: '',//'<a href="#">Why do I have this issue?</a>'
			  					confirmButtonColor: "#07B201",
							});
					}else{
						setDataDataDestinatario(json)
						setShowModalAtualizarWhatsApp(true)
					 }
		        }else{
		        	setDataDataDestinatario([])
		        }
			}
		}

		getDataPessoa();
		
	}, [idPessoa])

  React.useEffect(()=>{
    if(noUseModal != undefined){
      setNoUseModalMode(noUseModal)
    }
    
  }, [noUseModal])

  const dataPessoa = dataDestinatario?.mensagem
  const title = 'Nova mensagem para: '+dataPessoa?.name
  
  if(noUseModalMode){
		return(
			<>

				{! dataDestinatario &&
					<Load/>
				}
        { dataDestinatario &&
					<>
            <Breadcrumbs
              items={[
                      {
                          props:{},
                          label:<> <Link className={null}  to={'/'}>Início</Link></>
                      },
                      {
                          props:{},
                          label:'Novo mensagem WhatsApp'
                      }
                  ]}

              buttonFiltroMobile={true}
              setMostarFiltros={setMostarFiltros}
              mostarFiltros={mostarFiltros}

            />
            <Container className="px-5 py-5" style={{boxShadow:'1px 1px 1px 3px #CCC'}}>
              <h2 className='mb-2 text-center' >{title}</h2>
              <FormWhatsApp              
                  title={title}
                  error={error}
                  loading={loading}
                  setDataDataDestinatario={setDataDataDestinatario}
                  setIdPessoa={setIdPessoa}
                  idPessoa={idPessoa}
                  dataDestinatarioChoice={dataDestinatario}
                  showModalCriarWhatsApp={showModalAtualizarWhatsApp}
                  setShowModalCriarWhatsApp={setShowModalAtualizarWhatsApp}
                  callback={callback}
                  noUseModal={noUseModalMode}
                  setCarregando={setCarregando}
                  formikRef={formikRef}
              />
            </Container>
          </>
				}

			</>
		)
	}

	return(
		<>
			{! dataDestinatario &&
				<Modal noBtnCancelar={true} noBtnConcluir={true} handleConcluir={()=>null}  title={'Atualizar WhatsApp'} size="xs" propsConcluir={{}} labelConcluir={''} dialogClassName={''} aria-labelledby={'aria-labelledby'} labelCanelar="" show={setShowModalAtualizarWhatsApp} showHide={()=>{setShowModalAtualizarWhatsApp();}}>
					<Load/>
				</Modal>
			}

			{dataDestinatario && 
				<Modal 
						noBtnConcluir={false}
						handleConcluir={handleConcluir}
						title={title}
						size="lg" propsConcluir={{'disabled':loading}}
						labelConcluir={carregando ? 'Salvando...' : 'Concluir'}
						dialogClassName={''} aria-labelledby={'aria-labelledby'}
						labelCanelar="Fechar"
						show={showModalAtualizarWhatsApp}
						showHide={()=>{setShowModalAtualizarWhatsApp();setIdPessoa(null);}}

				>
          <Container>
            <FormWhatsApp
                setCarregando={setCarregando}
                carregando={carregando}
                error={error}
                loading={carregando}
                setDataDataDestinatario={setDataDataDestinatario}
                setIdPessoa={setIdPessoa}
                idPessoa={idPessoa}
                dataDestinatarioChoice={dataDestinatario}
                showModalCriarWhatsApp={showModalAtualizarWhatsApp}
                setShowModalCriarWhatsApp={setShowModalAtualizarWhatsApp}
                callback={callback}
                noUseModal={noUseModalMode}
                sendForm={sendForm}
                formikRef={formikRef}
            />			
          </Container>
	      </Modal>

			}
		</>
	)

};

export default SendWhatsApp;
