import React from 'react';
import useFetch from '../../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, CLIENTES_ONE_GET, GRUPOS_ALL_POST} from '../../../api/endpoints/geral.js'
import {UserContex} from '../../../Context/UserContex.js'
import FormCliente from '../FormCliente/index.js'
import Ver from './Ver/index.js'
import Pesquisar from '../Pesquisar/index.js'
import Modal from '../../Utils/Modal/index.js'
import Load from '../../Utils/Load/index.js'

const Ficha = ({idCliente, setIdcliente, callback, FichaCadastro, setFicha})=>{

    
    const [showModalFichaCliente, setShowModalFichaCliente] = React.useState(false)
	const [showModalVerFichaCliente, setShowModalVerFichaCliente] = React.useState(false)
    const [carregando, setCarregando] = React.useState(false)
    const [dataCliente, setDataCliente] = React.useState(null)
    const [dataGrupo, setDataGrupo] = React.useState(null)
	const {getToken, dataUser} = React.useContext(UserContex);

	const {data, error, request, loading} = useFetch();
	React.useEffect(()=>{
		
		const getGrupo = async ()=>{
			const {url, options} = GRUPOS_ALL_POST({}, getToken());

	        const {response, json} = await request(url, options);
	        console.log('All grupos here')
	        console.log(json)
	        if(json){
	            setDataGrupo(json)
	        }else{
	        	setDataGrupo(null)
	        }
		}

		const getCliente = async ()=>{
			if(idCliente > 0){
				const {url, options} = CLIENTES_ONE_GET(idCliente, getToken());
				const {response, json} = await request(url, options);
				if(json){
					
					setDataCliente(json)
					setShowModalFichaCliente(true)
					 
		        }else{
		        	setDataCliente([])
		        }
			}
		}

		

		getGrupo();
		getCliente();
		
	}, [idCliente])

	/*
		FichaCadastro && 
             <Modal  handleConcluir={()=>{handleSubmit(); }}  title={ (atualizarCadastro == true ? 'Atualizar' : 'Cadastrar')+' Cliente'} size="lg" propsConcluir={{'disabled':loading}} labelConcluir={loading ? 'Salvando...' : 'Concluir'} dialogClassName={'modal-90w'} aria-labelledby={'aria-labelledby'} labelCanelar="Fechar" show={showModalCriarCliente} showHide={()=>{setShowModalCriarCliente();setAtualizarCadastro(false);setIdcliente(null);}}>
                                
	*/
	//<Pesquisar idCliente={idCliente} setDataCliente={setDataCliente} setCarregandoDadosCliente={setCarregando} />
	return(
		<>
			{! dataCliente &&
				<Modal noBtnCancelar={true} noBtnConcluir={true} handleConcluir={()=>null}  title={'Ficha Cliente'} size="xs" propsConcluir={{}} labelConcluir={''} dialogClassName={'modal-90w'} aria-labelledby={'aria-labelledby'} labelCanelar="" show={setShowModalFichaCliente} showHide={()=>{setShowModalFichaCliente();}}>
					<Load/>
				</Modal>
			}
			{dataCliente &&
				<Modal  handleConcluir={()=>null} noBtnConcluir={true}  title={'Ficha do cliente'} size="lg" propsConcluir={null} labelConcluir={null} dialogClassName={'modal-90w'} aria-labelledby={'aria-labelledby'} labelCanelar="Fechar" show={showModalFichaCliente} showHide={()=>{setShowModalVerFichaCliente();setFicha(false);setIdcliente(null);}}>
                    
                       
					<Ver dataGrupo={dataGrupo} setIdcliente={setIdcliente} idCliente={idCliente} carregando={false} dataClienteChoice={dataCliente} setFicha={setFicha} FichaCadastro={FichaCadastro} showModalCriarCliente={showModalFichaCliente} setShowModalCriarCliente={setShowModalVerFichaCliente} callback={callback} />
				</Modal>
			}
		</>
	)
}

export default Ficha;