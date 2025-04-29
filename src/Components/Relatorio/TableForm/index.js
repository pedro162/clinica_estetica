import React from 'react';
import {Table as TableBootstrap, Button } from 'react-bootstrap';
import Card from '../../Utils/Card/index.js'
import Checkbox from '../../FormControl/Checkbox.js'
import Load from '../../Utils/Load/index.js'
import MenuOpcoes from '../MenuOpcoes/index.js'
import { faHome, faSearch, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {FORMAT_CALC_COD, FORMAT_MONEY} from '../../../functions/index.js'

const TableForm = ({children, titulosTableArr, rowsTableArr,loading, hasActionsCol, hasTrashAction ,propsTrash, nadaEncontrado ,... props})=>{
	const titulosTable = titulosTableArr ? titulosTableArr : []
	const bodyTable =  rowsTableArr ? rowsTableArr : []
	const [selecionados, setSelecionados] = React.useState([])
	const [selecionaTodos, setSelecionaTodos] = React.useState(false)	
    const [showModalOptions, setShowModalOptions] = React.useState(false)
    const [dataMenu, setDataMenu] = React.useState([])

	const handleChange = (target)=>{
		let id = target.value;
		id = Number(id)
		if(target.checked){
			setSelecionados([...selecionados, id])
		}else{
			setSelecionados(
				selecionados.filter((item)=>{
					return item != id
				})
			)
		}

		
		
	}

	console.log(selecionados)

	const selecionarTodos = (target)=>{
		let itens = [];
		if(target){
			if(target.checked){


				if(bodyTable && Array.isArray(bodyTable) && bodyTable.length > 0){
					bodyTable.map((item, index, arr)=>{
			  			
			  			let propsRowBodyTable 	= item.hasOwnProperty('propsRow') ? item.propsRow: {};
		  				let id = propsRowBodyTable.hasOwnProperty('id') ? propsRowBodyTable.id: 0;
		  				id = Number(id);

			  			id = Number(id);

			  			if(id > 0){
			  				itens.push(id)
			  			}
			  			
					})
				}
				setSelecionados([...itens])
				setSelecionaTodos(true)
			}else{
				setSelecionados([])
				setSelecionaTodos(false)
			}
			

		}else{
			setSelecionaTodos(false)
		}
		
		
	}

	React.useEffect(()=>{
		console.log(selecionados)
		console.log(selecionaTodos)
	}, [selecionados, selecionaTodos])

	const opt = [
			{acao:()=>alert('Aqui'), label:'Editar', propsOption:{}, propsLabel:{}}
		]
    let arraySum = {};

	return(
		<>
			{

            loading 

            ?
                <Load/>
            :

                <TableBootstrap striped bordered hover size="sm">				 
                    {
                        titulosTable && Array.isArray(titulosTable) && titulosTable.length > 0 ? (
                            <thead>
                                <tr  >
                                    <th>
                                        <Checkbox type="checkbox" checked={selecionaTodos} setValue={selecionarTodos} label="" />
                                    </th>
                                    {

                                        titulosTable.map((item, index, arr)=>{
                                            let labelCelHeadrTable 		= item.hasOwnProperty('label') ? item.label : '';
                                            let propsLabelHeaderTable 	= item.hasOwnProperty('props') ? item.props: {};
                                            console.log(labelCelHeadrTable)
                                            return <th key={index} { ...propsLabelHeaderTable} >{labelCelHeadrTable}</th>

                                        })
                                    }
                                    {hasActionsCol &&  <th>Ações</th>}
                                </tr>
                            </thead>
                            

                    ) : ('')

                    }
                <tbody>
                    {	

                        bodyTable && Array.isArray(bodyTable) && bodyTable.length > 0 ? (

                            bodyTable.map((item, index, arr)=>{
                                let celBodyTableArr 		= item.hasOwnProperty('celBodyTableArr') ? item.celBodyTableArr : [];
                                let propsRowBodyTable 	= item.hasOwnProperty('propsRow') ? item.propsRow: {};
                                let id = propsRowBodyTable.hasOwnProperty('id') ? propsRowBodyTable.id: 0;
                                id = Number(id);

                                let acoesRowBodyTable 	= item.hasOwnProperty('acoes') ? item.acoes: {};
                                let acaoTrash 	= item.hasOwnProperty('acaoTrash') ? item.acaoTrash: null;
                                //
                                
                                return (
                                    <tr onClick={()=>{setDataMenu(acoesRowBodyTable);setShowModalOptions(true)}}  key={index} { ...propsRowBodyTable}>
                                        <td><Checkbox type="checkbox" value={id} checked={id > 0 ? selecionados.includes(id) : false} label="" setValue={handleChange} /></td>
                                        {
                                            celBodyTableArr && Array.isArray(celBodyTableArr) && celBodyTableArr.length > 0 ? (
                                                celBodyTableArr.map((itemCel, indexCel, arrCel)=>{
                                                    let labelCel            = itemCel.hasOwnProperty('label') ? itemCel.label :'';
                                                    let propsCelBodyTable 	= item.hasOwnProperty('propsRow') ? item.propsRow: {};
                                                    let toSum               = itemCel.hasOwnProperty('toSum') ? itemCel.toSum :0;
                                                    let isCoin              = itemCel.hasOwnProperty('isCoin') ? itemCel.isCoin :0;
                                                    if(arraySum[indexCel] && arraySum[indexCel].hasOwnProperty("isCoin")){
                                                        if(isCoin){
                                                            arraySum[indexCel]['isCoin'] = isCoin;
                                                        }
                                                        if(toSum){
                                                            arraySum[indexCel]['valor'] = Number(FORMAT_CALC_COD(labelCel)) + Number(FORMAT_CALC_COD(arraySum[indexCel]['valor']))
                                                        }else{
                                                            arraySum[indexCel]['valor'] = ''
                                                        }
                                                    }else{
                                                        arraySum[indexCel] = {'isCoin':'','valor':''}
                                                        if(isCoin){
                                                            arraySum[indexCel]['isCoin'] = isCoin;
                                                        }
                                                        if(toSum){
                                                            arraySum[indexCel]['valor'] = Number(FORMAT_CALC_COD(labelCel)) + Number(FORMAT_CALC_COD(arraySum[indexCel]['valor']))
                                                        }else{
                                                            arraySum[indexCel]['valor'] = ''
                                                        }

                                                    }
                                                    
                                                    
                                                    return <td key={indexCel}>{labelCel}</td>
                                                })

                                            ) : ('')
                                        }
                                        {
                                        hasActionsCol 
                                        &&  <th>
                                                { hasTrashAction && <Button onClick={acaoTrash} {...propsTrash} ><FontAwesomeIcon icon={faTrash} /></Button>}
                                                {
                                                    Array.isArray(acoesRowBodyTable) && acoesRowBodyTable.length > 0 
                                                    ? (
                                                        acoesRowBodyTable.map(({label, acao, acaoTrash, propsOption, propsLabel}, indexAcoes, arrAcoes)=>{
                                                            return(
                                                                <Button key={indexAcoes+label+arrAcoes.length} onClick={acao} {...propsOption} ><span {...propsLabel}>{label}</span></Button>
                                                            )
                                                        })
                                                    
                                                    ) : (null)
                                                }
                                            </th>
                                        }
                                        
                                    </tr>
                                )
                                

                            })

                        ) : (
                            <td colSpan={titulosTable.length} className="text-center">
                                Nenhum registro encontrado
                            </td>
                        )
                        
                    }				    
                </tbody>
                <tfoot style={{border:'none !important'}}>
					<tr style={{border:'none !important'}}>
					    <td style={{border:'none !important'}}></td>
                        {Object.keys(arraySum).map((ojKey, index, arr)=>{
                            let item = arraySum[ojKey];

                            if(! (String(item['valor']).trim().length > 0)){
                                return <td></td>
                            }

                            let valorAtual = '';
                            if(item['isCoin']){
                                valorAtual = FORMAT_MONEY(item['valor']);
                            }else{
                                valorAtual = item['valor'];
                            }
                            return <td>{valorAtual}</td>
                        })}
                        {hasActionsCol &&  <td></td>}
				    </tr>
				</tfoot>
                </TableBootstrap>


            }
		</>
		)
}

export default TableForm;