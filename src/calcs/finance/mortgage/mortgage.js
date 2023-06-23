import { loan } from "../loan/loan.js";

export const mortgage = ({ sum, firstPay, creditTerm, interestRate, payType }) => {
  const sumForLoan = firstPay.type === "ruble" ? sum - firstPay.sum : (sum * firstPay.sum) / 100;
  return loan({ sum: sumForLoan, creditTerm, interestRate, payType });
};
