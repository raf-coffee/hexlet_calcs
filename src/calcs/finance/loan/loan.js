export const loan = ({ sum, creditTerm, interestRate, payType }) => {
  // срок кредита в месяцах
  const months = creditTerm.type === "years" ? creditTerm.term * 12 : creditTerm.term;

  // сотая доля процентной ставки (в месяц)
  const shareMonthlyInterest = interestRate / 12 / 100;

  if (payType === "ann") {
    // размер ежемесячного платежа по аннуитетной схеме
    const monthlySum = sum * (shareMonthlyInterest + shareMonthlyInterest / ((1 + shareMonthlyInterest) ** months - 1));

    // общая сумма, включая проценты
    const generalSum = monthlySum * months;

    // только сумма начисленных процентов
    const percentagesSum = generalSum - sum;

    return { monthlySum, generalSum, percentagesSum };
  }

  // размер ежемесячного платежа по дифференцированной схеме
  const monthlySum = sum / months;

  const monthlyArr = [];
  const percentArr = [];

  // остаток основного долга
  let residualAmount = sum;

  while (residualAmount > monthlySum) {
    // доля процентов в ежемесячном платеже
    const percentShare = residualAmount * shareMonthlyInterest;

    // сумма ежемесячного взноса
    const monthlyPay = monthlySum + percentShare;

    monthlyArr.push(monthlyPay);
    percentArr.push(percentShare);

    // остаток на конец периода
    residualAmount -= monthlySum;
  }

  const generalSum = monthlyArr.reduce((acc, value) => acc + value);
  const percentagesSum = percentArr.reduce((acc, value) => acc + value);

  return { generalSum, percentagesSum, monthlySum: [monthlyArr[0], monthlyArr.at(-1)] };
};
