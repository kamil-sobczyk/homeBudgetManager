import { CategoryType, Cost } from './../../../../lib/interfaces';

type Month =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

interface MonthSpendings {
  name: Month;
  bills: number;
  shopping: number;
  car: number;
  health: number;
  total?: number;
}

const months: Month[] = [
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

const monthNumbers: string[] = months.map((month, index) =>
  ('0' + (index + 1)).slice(-2)
);

const getMonthCostCount = (
  costs: Cost[],
  month: string,
  category: CategoryType
): number => {
  let sumOfCosts: number = 0;

  costs.forEach((cost: Cost) => {
    if (cost.category === 'bill' && category === 'bill') {
      if (('0' + cost.date.slice(4, 5)).slice(-2) === month) {
        sumOfCosts += cost.count;
      }
    } else if (cost.category === 'shopping' && category === 'shopping') {
      if (('0' + cost.date.slice(4, 5)).slice(-2) === month) {
        sumOfCosts += cost.count;
      }
    } else if (cost.category === 'health' && category === 'health') {
      if (('0' + cost.date.slice(4, 5)).slice(-2) === month) {
        sumOfCosts += cost.count;
      }
    } else if (cost.category === 'car' && category === 'car') {
      if (('0' + cost.date.slice(4, 5)).slice(-2) === month) {
        sumOfCosts += cost.count;
      }
    }
  });

  return sumOfCosts;
};

export const splitCosts = (costs: Cost[]): [] => {
  let monthSpendings: MonthSpendings[] = [];
  months.forEach((month, index) =>
    monthSpendings.push({
      name: month,
      bills: getMonthCostCount(costs, monthNumbers[index], 'bill'),
      shopping: getMonthCostCount(costs, monthNumbers[index], 'shopping'),
      car: getMonthCostCount(costs, monthNumbers[index], 'car'),
      health: getMonthCostCount(costs, monthNumbers[index], 'health')
    })
  );

  monthSpendings.forEach(
    (month: MonthSpendings, index: number): number =>
      (month.total = month.bills + month.shopping)
  );

  const monthsWithSpendings: MonthSpendings[] = monthSpendings.filter(
    (month: MonthSpendings) => month.total !== 0
  );

  return monthsWithSpendings as [];
};
