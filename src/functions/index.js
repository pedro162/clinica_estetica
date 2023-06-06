
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

//-------------- FAZ A FORMATAÇÃO PARA DINHEIRO ------------
export const FORMAT_MONEY = (amount, decimalCount = 2, decimal = ',', thousands = '.')=>{
  try{

    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSing = amount < 0 ? '-' : '';

    let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
    let j = (i.length > 3) ? i.length % 3 : 0;

    let fomartted = negativeSing;
    fomartted += (j ? i.substr(0, j) + thousands : '');
    fomartted += i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands);
    fomartted += (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : '');

    return fomartted;


  }catch(e){

    console.log(e);
  }


}


export const FORMAT_CALC_Cod= (number)=>{
  try{

    number = String(number);
    

    if(number.length == 0){
      return false;
    }

    let arrNumber = number.split('.');

    let newNumber = '';
    for (let i =0; !(i == arrNumber.length); i++) {
      newNumber+=arrNumber[i]
    }


    newNumber = newNumber.replace(/,/g, '.');

    newNumber = parseFloat(newNumber).toFixed(2);

    return newNumber;

  }catch(e){

    console.log(e);
  }
}