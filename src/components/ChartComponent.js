import React, { Fragment, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import { Link } from 'react-router-dom';

export default function ChartComponent({ expenseData, incomeData }) {
  const chartRef = useRef();

  // Inital Chart
  let groupedIncomeLabels = incomeData.map(({ Label }) => Label);
  let groupedIncomeValues = incomeData.map(({ Value }) => parseInt(Value));
  let groupedExpenseLabels = expenseData.map(({ Label }) => Label);
  let groupedExpenseValues = expenseData.map(({ Value }) => parseInt(Value));
  //   Get sums
  const reducer = (previousValue, currentValue) => previousValue + currentValue;
  const summedIncome =
    groupedIncomeValues.reduce(reducer) + groupedExpenseValues.reduce(reducer);

  const groupDatasetIncomeColors = incomeData.map(({ Value }) => {
    return 'rgba(110, 196, 123, 1)';
  });
  const groupDatasetExpenseColors = expenseData.map(({ Value }) => {
    return 'rgba(219, 84, 97, 1)';
  });

  return (
    <Fragment>
      <div className='chart-wrapper'>
        <h2>Here's Your Breakdown</h2>
        <Bar
          ref={chartRef}
          type='bar'
          data={{
            labels: groupedIncomeLabels,
            //   groupedIncomeLabels.concat(groupedExpenseLabels)
            datasets: [
              {
                label: 'Increase',
                data: groupedIncomeValues,
                backgroundColor: groupDatasetIncomeColors,
                hoverBackgroundColor: groupDatasetIncomeColors,
              },
            ],
            borderWidth: 1,
          }}
          // redraw='true'
          width='500px'
          responsive='true'
        />
        <Bar
          ref={chartRef}
          type='bar'
          data={{
            labels: groupedExpenseLabels,
            //   groupedIncomeLabels.concat(groupedExpenseLabels)
            datasets: [
              {
                label: 'Decrease',
                data: groupedExpenseValues,
                backgroundColor: groupDatasetExpenseColors,
                hoverBackgroundColor: groupDatasetExpenseColors,
              },
            ],
            borderWidth: 1,
          }}
          // redraw='true'
          width='500px'
        />
        {summedIncome < 0 ? (
          <p className='chart-sum-neg'>
            You are <span className='negative'>${summedIncome}</span>. Time to
            start planning!
          </p>
        ) : (
          <p className='chart-sum-pos'>
            You are <span className='positive'>+${summedIncome}</span>. Keep the
            money coming!
          </p>
        )}

        <Link to='/start' className='start-over-btn'>
          Start Over
        </Link>
      </div>
    </Fragment>
  );
}
