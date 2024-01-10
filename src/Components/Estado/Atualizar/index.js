import React from 'react';
import useFetch from '../../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, ESTADO_ONE_GET, ESTADO_ALL_POST} from '../../../api/endpoints/geral.js'
import {UserContex} from '../../../Context/UserContex.js'
import FormEstado from '../FormEstado/index.js'
import Pesquisar from '../Pesquisar/index.js'
import Modal from '../../Utils/Modal/index.js'
import Load from '../../Utils/Load/index.js'

const Atualizar = ({idEstado, setIdEstado, callback, atualizarCadastro, setAtualizarCadastro})=>{

    
    const [showModalAtualizarEstado, setShowModalAtualizarEstado] = React.useState(false)
    const [carregando, setCarregando] = React.useState(false)
    const [dataEstado, setDataEstado] = React.useState(null)
    const [dataGrupo, setDataGrupo] = React.useState(null)
	const {getToken, dataUser} = React.useContext(UserContex);

	const {data, error, request, loading} = useFetch();
	React.useEffect(()=>{
		
		const getGrupo = async ()=>{
			const {url, options} = ESTADO_ALL_POST({}, getToken());

	        const {response, json} = await request(url, options);
	        console.log('All grupos here')
	        console.log(json)
	        if(json){
	            setDataGrupo(json)
	        }else{
	        	setDataGrupo(null)
	        }
		}

		const getEstado = async ()=>{
			if(idEstado > 0){
				const {url, options} = ESTADO_ONE_GET(idEstado, getToken());
				const {response, json} = await request(url, options);
				if(json){
					
					setDataEstado(json)
					setShowModalAtualizarEstado(true)
					 
		        }else{
		        	setDataEstado([])
		        }
			}
		}

		

		//getGrupo();
		getEstado();
		
	}, [idEstado])

	/*
		atualizarCadastro && 
                <Atualizar setCarregandoDadosEstado={null} atualizarCadastro={setAtualizarCadastro} idEstado={clientChoice} setDataEstado={null} setShowModalCriarEstado={setShowModalAtualizarEstado} />
	*/
	//<Pesquisar idEstado={idEstado} setDataEstado={setDataEstado} setCarregandoDadosEstado={setCarregando} />
	return(
		<>
			{! dataEstado &&
				<Modal noBtnCancelar={true} noBtnConcluir={true} handleConcluir={()=>null}  title={'Atualizar Estado'} size="xs" propsConcluir={{}} labelConcluir={''} dialogClassName={''} aria-labelledby={'aria-labelledby'} labelCanelar="" show={setShowModalAtualizarEstado} showHide={()=>{setShowModalAtualizarEstado();}}>
					<Load/>
				</Modal>
			}
			{dataEstado &&
				<FormEstado dataGrupo={dataGrupo} setIdEstado={setIdEstado} idEstado={idEstado} carregando={false} dataEstadoChoice={dataEstado} setAtualizarCadastro={setAtualizarCadastro} atualizarCadastro={atualizarCadastro} showModalCriarEstado={showModalAtualizarEstado} setShowModalCriarEstado={setShowModalAtualizarEstado} callback={callback} />
			}
		</>
	)
}

export default Atualizar;