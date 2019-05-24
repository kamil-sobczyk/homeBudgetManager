import { Cost } from '../../../../lib/interfaces';

interface MonthSpendings {
  bills: number;
  shopping: number;
  total?: number;
}

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

const monthNumbers = months.map((month, index) =>
  ('0' + (index + 1)).slice(-2)
);

const getBillsCount = (costs: Cost[], month: string): number => {
  let sumOfBills: number = 0;

  costs.forEach(cost => {
    if (cost.bill) {
      if (('0' + cost.date.slice(4, 5)).slice(-2) === month) {
        sumOfBills += cost.count;
      }
    }
  });

  return sumOfBills;
};

const getShoppingCount = (costs: Cost[], month: string): number => {
  let sumOfShoppings: number = 0;

  costs.forEach(cost => {
    if (!cost.bill) {
      if (('0' + cost.date.slice(4, 5)).slice(-2) === month) {
        sumOfShoppings += cost.count;
      }
    }
  });

  return sumOfShoppings;
};

export const splitCosts = (costs: Cost[]): [] => {
  let monthSpendings: any = [];
  months.forEach((month, index) =>
    monthSpendings.push({
      name: month,
      bills: getBillsCount(costs, monthNumbers[index]),
      shopping: getShoppingCount(costs, monthNumbers[index])
    })
  );

  monthSpendings.forEach(
    (month: MonthSpendings, index: number) =>
      (month.total = month.bills + month.shopping)
  );

  const monthsWithSpendings = monthSpendings.filter(
    (month: MonthSpendings) => month.total !== 0
  );

  return monthsWithSpendings;
};
