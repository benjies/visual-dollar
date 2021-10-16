import React, { Fragment, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import { Link } from 'react-router-dom';

export default function ChartComponent({ expenseData, incomeData }) {
  const chartRef = useRef();

  // Inital Chart with proper types
  let groupedIncomeLabels = incomeData.map(({ Label }) => Label);
  let groupedIncomeValues = incomeData.map(({ Value }) => parseInt(Value));
  let groupedExpenseLabels = expenseData.map(({ Label }) => Label);
  let groupedExpenseValues = expenseData.map(({ Value }) => parseInt(Value));

  //   Get Total Sum
  const reducer = (previousValue, currentValue) => previousValue + currentValue;
  const summedIncome =
    groupedIncomeValues.reduce(reducer) + groupedExpenseValues.reduce(reducer);

  // Assign color base on value
  const groupDatasetIncomeColors = incomeData.map(({ Value }) => {
    return 'rgba(110, 196, 123, 1)';
  });
  const groupDatasetExpenseColors = expenseData.map(({ Value }) => {
    return 'rgba(219, 84, 97, 1)';
  });

  // Find Max Value in incomeData
  const maxIncomeSearch = Math.max.apply(
    Math,
    incomeData.map((income) => {
      return income.Value;
    })
  );
  const maxIncomeObject = incomeData.find((income) => {
    return income.Value.toString() === maxIncomeSearch.toString();
  });
  // Find Max Value in ExpenseData
  const maxExpenseSearch = Math.min.apply(
    Math,
    expenseData.map((expense) => {
      return expense.Value;
    })
  );
  const maxExpenseObject = expenseData.find((expense) => {
    return expense.Value.toString() === maxExpenseSearch.toString();
  });

  return (
    <Fragment>
      <div className='chart-wrapper'>
        <h2>Here's Your Breakdown</h2>
        {/* Calculate the Cash Flow */}
        {summedIncome < 0 ? (
          <p className='chart-sum-neg margin-20'>
            You are <span className='negative'>${summedIncome}</span>. Time to
            start planning!
          </p>
        ) : (
          <p className='chart-sum-pos margin-20'>
            You are <span className='positive'>+${summedIncome}</span>. Keep the
            money coming!
          </p>
        )}
        {/* Income and Expense Chart */}
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
          options={{
            plugins: {
              legend: {
                labels: {
                  color: '#faf9f9',
                },
              },
            },
            scales: {
              y: {
                ticks: {
                  color: '#faf9f9',
                },
              },
              x: {
                ticks: '#faf9f9',
              },
            },
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
          options={{
            plugins: {
              legend: {
                labels: {
                  color: '#faf9f9',
                },
              },
            },
            scales: {
              y: {
                ticks: {
                  color: '#faf9f9',
                },
              },
              x: {
                ticks: '#faf9f9',
              },
            },
          }}
          // redraw='true'
          width='500px'
        />

        <p className='margin-20 display-max-min'>
          Your largest income is {maxIncomeObject.Label} at
          <span className='positive'> ${maxIncomeObject.Value}</span> . While
          your largest expense is {maxExpenseObject.Label} at
          <span className='negative'> ${maxExpenseObject.Value}</span> .
        </p>

        <Link to='/start' className='start-over-btn'>
          Start Over
        </Link>
      </div>
    </Fragment>
  );
}
