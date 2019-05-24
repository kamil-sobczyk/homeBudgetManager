import { CategoryType } from './../../../../lib/interfaces';
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

const getMonthCostCount = (
  costs: Cost[],
  month: string,
  category: CategoryType
): number => {
  let sumOfCosts: number = 0;

  costs.forEach(cost => {
    if ((cost.category && category) === 'bill') {
      if (('0' + cost.date.slice(4, 5)).slice(-2) === month) {
        sumOfCosts += cost.count;
      }
    } else if ((cost.category && category) === 'shopping') {
      if (('0' + cost.date.slice(4, 5)).slice(-2) === month) {
        sumOfCosts += cost.count;
      }
    } else if ((cost.category && category) === 'health') {
      if (('0' + cost.date.slice(4, 5)).slice(-2) === month) {
        sumOfCosts += cost.count;
      }
    } else if ((cost.category && category) === 'car') {
      if (('0' + cost.date.slice(4, 5)).slice(-2) === month) {
        sumOfCosts += cost.count;
      }
    }
  });

  return sumOfCosts;
};

export const splitCosts = (costs: Cost[]): [] => {
  let monthSpendings: any = [];
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
    (month: MonthSpendings, index: number) =>
      (month.total = month.bills + month.shopping)
  );

  const monthsWithSpendings = monthSpendings.filter(
    (month: MonthSpendings) => month.total !== 0
  );

  return monthsWithSpendings;
};
