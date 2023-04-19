
export const FORMAT_DATA_PT_BR = (data)=>{
    data = String(data)
    if(data.trim().length > 0){
        let objDateFim = new Date(data);
        data = String(objDateFim.toLocaleString('pt-BR')).substring(0,10);   
        return data;
    }
    return '';

}