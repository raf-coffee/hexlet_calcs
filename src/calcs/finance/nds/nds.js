/*  nb - стоимость
    nst - % ндс
    action - значение поля элемента, соответсвующее одной из функций:
        accrue - "Начислить НДС к стоимости с указанным %"
        calc - "Вычислить стоимость без учета НДС с указанным %"
*/
export const nds = (nb, nst, action) => {
  const exp = { 
    'accrue':(sum, nst) => sum * ((nst / 100) + 1), // Начислить НДС к стоимости с указанным %
    'calc':(sum, nst) => sum / (((nst / 100) + 1) * 100) * 100, // Вычислить стоимость без учета НДС с указанным %
  };
  return exp[action](nb, nst).toFixed(2); // возвращает строку
};
