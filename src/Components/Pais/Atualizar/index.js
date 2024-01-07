import React from 'react';
import useFetch from '../../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, PAIS_ONE_GET, PAIS_ALL_POST} from '../../../api/endpoints/geral.js'
import {UserContex} from '../../../Context/UserContex.js'
import FormPais from '../FormPais/index.js'
import Pesquisar from '../Pesquisar/index.js'
import Modal from '../../Utils/Modal/index.js'
import Load from '../../Utils/Load/index.js'

const Atualizar = ({idPais, setIdPais, callback, atualizarCadastro, setAtualizarCadastro})=>{

    
    const [showModalAtualizarPais, setShowModalAtualizarPais] = React.useState(false)
    const [carregando, setCarregando] = React.useState(false)
    const [dataPais, setDataPais] = React.useState(null)
    const [dataGrupo, setDataGrupo] = React.useState(null)
	const {getToken, dataUser} = React.useContext(UserContex);

	const {data, error, request, loading} = useFetch();
	React.useEffect(()=>{
		
		const getGrupo = async ()=>{
			const {url, options} = PAIS_ALL_POST({}, getToken());

	        const {response, json} = await request(url, options);
	        console.log('All grupos here')
	        console.log(json)
	        if(json){
	            setDataGrupo(json)
	        }else{
	        	setDataGrupo(null)
	        }
		}

		const getPais = async ()=>{
			if(idPais > 0){
				const {url, options} = PAIS_ONE_GET(idPais, getToken());
				const {response, json} = await request(url, options);
				if(json){
					
					setDataPais(json)
					setShowModalAtualizarPais(true)
					 
		        }else{
		        	setDataPais([])
		        }
			}
		}

		

		//getGrupo();
		getPais();
		
	}, [idPais])

	/*
		atualizarCadastro && 
                <Atualizar setCarregandoDadosPais={null} atualizarCadastro={setAtualizarCadastro} idPais={clientChoice} setDataPais={null} setShowModalCriarPais={setShowModalAtualizarPais} />
	*/
	//<Pesquisar idPais={idPais} setDataPais={setDataPais} setCarregandoDadosPais={setCarregando} />
	return(
		<>
			{! dataPais &&
				<Modal noBtnCancelar={true} noBtnConcluir={true} handleConcluir={()=>null}  title={'Atualizar Pais'} size="xs" propsConcluir={{}} labelConcluir={''} dialogClassName={'modal-90w'} aria-labelledby={'aria-labelledby'} labelCanelar="" show={setShowModalAtualizarPais} showHide={()=>{setShowModalAtualizarPais();}}>
					<Load/>
				</Modal>
			}
			{dataPais &&
				<FormPais dataGrupo={dataGrupo} setIdPais={setIdPais} idPais={idPais} carregando={false} dataPaisChoice={dataPais} setAtualizarCadastro={setAtualizarCadastro} atualizarCadastro={atualizarCadastro} showModalCriarPais={showModalAtualizarPais} setShowModalCriarPais={setShowModalAtualizarPais} callback={callback} />
			}
		</>
	)
}

export default Atualizar;