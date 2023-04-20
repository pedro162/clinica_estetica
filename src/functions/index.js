
export const FORMAT_DATA_PT_BR = (data)=>{
    
    if(data == null || data == 'null'){
        
        return ''
    }
    data = String(data)
    if(data.trim().length > 0 ){
        /*let objDateFim = new Date(data);
        let options = {
            timeZone: 'America/Sao_Paulo', // Lista de Timezones no fim do artigo
            hour12: false, // Alterna entre a mostragem dos horários em 24 horas, ou então AM/PM,
            urCycle: 'h24'
        }
        data = String(objDateFim.toLocaleString('pt-br'),options).substring(0,10);   */
        data = String(data).substring(0,10).split('-');

        return data[2]+'/'+data[1]+'/'+data[0];
    }
    return '';

}