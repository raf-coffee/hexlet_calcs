//НДФЛ - это основной вид прямых налогов. Исчисляют его в процентах от совокупного дохода физических лиц 
//за вычетом документально подтверждённых расходов, в соответствии с действующим законодательством.
//В расчетном листке по зарплате указывается сумма к выплате за вычетом НДФЛ.
//Калькулятор позволяет проверить правильность начисления НДФЛ. Возвращает сумму оклада с учетом НДФЛ.
// параметр amountPaid - сумма к выплате за вычетом НДФЛ.
// параметр rateNDFL - процентная ставка НДФЛ (значение по умолчанию 13%)

//Расчет, если известна сумма после налогообложения. Возвращает массив где первое значение это сумма, а второе НДФЛ 
const ndflAfter = (amountPaid, rateNDFLnum = 13) => {
    const rateNDFL = rateNDFLnum;
    const result =  amountPaid / ((100 - rateNDFL) / 100);
    const ndfl = result * (rateNDFL / 100);
    //const fullPaid = result;
    //console.log(fullPaid);
    /**
    if (fullPaid > 5000000 ) {
        const rateNDFLover = 15;
        const ndfl5m = 650000;
        const result5m = 4350000;
        const afterPaidOver = (fullPaid - 5000000) / 0.85; //сумма выше 5 млн.
        const ndflOver =  afterPaidOver * (rateNDFLover / 100);
        const resultOver = afterPaidOver - ndflOver;
        const resultSum = 5000000 + afterPaidOver;
        const ndflSum = ndflOver +ndfl;
return {sum:resultSum.toFixed(2), ndflSum:ndflSum.toFixed(2), ndfl:ndfl5m.toFixed(2), afterPaidOver:afterPaidOver.toFixed(2) , ndflover:ndflOver.toFixed(2)};
    }
    */
return {sum:result.toFixed(2), ndfl:ndfl.toFixed(2)};
};
//Расчет, если известна сумма до налогообложения (beforePaid - сумма до налога). Возвращает массив где первое значение это сумма, а второе НДФЛ.
const ndflBefore = (beforePaid, rateNDFLnum = 13) => {
    const rateNDFL = rateNDFLnum;
    if (beforePaid > 5000000 ) {
        const rateNDFLover = 15;
        const ndfl = 650000;
        const result = 4350000;
        const beforePaidOver = beforePaid - 5000000;
        const ndflOver =  beforePaidOver * (rateNDFLover / 100);
        const resultOver = beforePaidOver - ndflOver;
        const resultSum = result + resultOver;
        const ndflSum = ndflOver +ndfl;
return {sum:resultSum.toFixed(2), ndflSum:ndflSum.toFixed(2), ndfl:ndfl.toFixed(2), beforePaidOver:beforePaidOver.toFixed(2) , ndflover:ndflOver.toFixed(2)}; 
    }
    const ndfl =  beforePaid * (rateNDFL / 100);
    const result = beforePaid - ndfl;
return {sum:result.toFixed(2), ndfl:ndfl.toFixed(2)};
};
export {ndflAfter, ndflBefore}

