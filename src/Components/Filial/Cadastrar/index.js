import React from 'react';
import useFetch from '../../../Hooks/useFetch.js';
import {TOKEN_POST, CLIENT_ID,CLIENT_SECRET, CLIENTES_ONE_GET, ESTADO_ALL_POST} from '../../../api/endpoints/geral.js'
import {UserContex} from '../../../Context/UserContex.js'
import FormFilial from '../FormFilial/index.js'
import Pesquisar from '../Pesquisar/index.js'
import Modal from '../../Utils/Modal/index.js'
import Load from '../../Utils/Load/index.js'

const Cadastrar = ({idFilial, setIdFilial, callback, atualizarCadastro, setAtualizarCadastro, cadastrarFilial, setCadastrarFilial})=>{

    
    const [showModalAtualizarFilial, setShowModalAtualizarFilial] = React.useState(false)
    const [carregando, setCarregando] = React.useState(false)
    const [dataFilial, setDataFilial] = React.useState(null)
    const [dataEstado, setDataEstado] = React.useState(null)
	const {getToken, dataUser} = React.useContext(UserContex);

	const {data, error, request, loading} = useFetch();
	React.useEffect(()=>{
		
		const getEstado = async ()=>{
			const {url, options} = ESTADO_ALL_POST({}, getToken());

	        const {response, json} = await request(url, options);
	        console.log('All estado here')
	        console.log(json)
	        if(json){
	            setDataEstado(json)
	            setShowModalAtualizarFilial(true)
	        }else{
	        	setDataEstado(null)
	        }
		}
		if(cadastrarFilial == true){
			//getEstado();
		}
		
		setShowModalAtualizarFilial(true)
		
	}, [cadastrarFilial])

	/*
		atualizarCadastro && 
                <Atualizar setCarregandoDadosCliente={null} atualizarCadastro={setAtualizarCadastro} idFilial={clientChoice} setDataFilial={null} setShowModalCriarFilial={setShowModalAtualizarFilial} />
	*/
	//<Pesquisar idFilial={idFilial} setDataFilial={setDataFilial} setCarregandoDadosCliente={setCarregando} />
	return(
		<>
			
			{
				<FormFilial dataEstado={dataEstado} setIdFilial={setIdFilial} idFilial={idFilial} carregando={false} dataFilialChoice={dataFilial} setAtualizarCadastro={setAtualizarCadastro} atualizarCadastro={atualizarCadastro} showModalCriarFilial={showModalAtualizarFilial} setShowModalCriarFilial={()=>{setShowModalAtualizarFilial();setCadastrarFilial()}} callback={callback} />
			}
		</>
	)
}

export default Cadastrar;