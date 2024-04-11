import React from 'react';
import useFetch from '../../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, FILIAIS_ONE_GET, GRUPOS_ALL_POST} from '../../../api/endpoints/geral.js'
import {UserContex} from '../../../Context/UserContex.js'
import FormFilial from '../FormFilial/index.js'
import Pesquisar from '../Pesquisar/index.js'
import Modal from '../../Utils/Modal/index.js'
import Load from '../../Utils/Load/index.js'
import {Col, Row} from 'react-bootstrap';
import AlertaDismissible from '../../Utils/Alerta/AlertaDismissible'
import Swal from 'sweetalert2'

const Atualizar = ({idFilial, setIdFilial, callback, atualizarFilial, setAtualizarFilial})=>{

    
    const [showModalAtualizarFilial, setShowModalAtualizarFilial] = React.useState(false)
    const [carregando, setCarregando] = React.useState(false)
    const [dataFilial, setDataFilial] = React.useState(null)
    const [dataGrupo, setDataGrupo] = React.useState(null)
    const [erroValidacao, setErroValidacao] = React.useState(null)
    const [showModalErro, setShowModalErro] = React.useState(false)
	const {getToken, dataUser} = React.useContext(UserContex);

	const {data, error, request, loading} = useFetch();
	React.useEffect(()=>{
		
		const getFilial = async ()=>{
			if(idFilial > 0){
				const {url, options} = FILIAIS_ONE_GET(idFilial, getToken());
				const {response, json} = await request(url, options);

				let data = json?.mensagem
				let erroValidaao  = validarEditar(data);
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

					setDataFilial([])

				}else{
					setDataFilial(json)
					setShowModalAtualizarFilial(true)
				}


				/*if(json){
					
					setDataFilial(json)
					setShowModalAtualizarFilial(true)
					 
		        }else{
		        	setDataFilial([])
		        }*/
			}
		}

		getFilial();
		
	}, [idFilial])

	const validarEditar = (data)=>{
		let erros = [];

		let {id} = data ? data : {};

		if(!data){
			erros.push(`Registro não identificado`);
		}

		return erros;
	}

	/*
		atualizarFilial && 
                <Atualizar setCarregandoDadosFilial={null} atualizarFilial={setAtualizarFilial} idFilial={clientChoice} setDataFilial={null} setShowModalCriarFilial={setShowModalAtualizarFilial} />
	*/
	//<Pesquisar idFilial={idFilial} setDataFilial={setDataFilial} setCarregandoDadosFilial={setCarregando} />
	return(
		<>
			{! dataFilial &&
				<Modal noBtnCancelar={true} noBtnConcluir={true} handleConcluir={()=>null}  title={'Atualizar Filial'} size="xs" propsConcluir={{}} labelConcluir={''} dialogClassName={''} aria-labelledby={'aria-labelledby'} labelCanelar="" show={setShowModalAtualizarFilial} showHide={()=>{setShowModalAtualizarFilial();}}>
					<Load/>
				</Modal>
			}

			{dataFilial && 
				<FormFilial setIdFilial={setIdFilial} idFilial={idFilial} carregando={false} dataFilialChoice={dataFilial} setAtualizarFilial={setAtualizarFilial} atualizarFilial={atualizarFilial} setAtualizarCadastro={setAtualizarFilial} showModalCriarFilial={showModalAtualizarFilial} setShowModalCriarFilial={setShowModalAtualizarFilial} callback={callback} />
			}
		</>
	)
}

export default Atualizar;