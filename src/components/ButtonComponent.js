import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

export default function ButtonComponent({
  newIncomeItem,
  nextSection,
  newExpenseItem,
  setNextSection,
  loadChart,
  setLoadChart,
  incomeData,
  expenseData,
}) {
  return (
    <Fragment>
      {!loadChart && (
        <div className='btn-wrapper'>
          <button
            className='addNewBTN'
            id='insert-above'
            onClick={
              (!nextSection && newIncomeItem) || (nextSection && newExpenseItem)
            }
          >
            ADD
          </button>
          {!nextSection && incomeData.length > 0 && (
            <button
              className='done-btn'
              onClick={() => {
                setNextSection(true);
              }}
            >
              {!nextSection && 'NEXT'}
            </button>
          )}
          {nextSection && expenseData.length > 0 && (
            <Link
              to='/visualized-data'
              className='done-btn-link'
              onClick={() => {
                setLoadChart(true);
              }}
            >
              VISUALIZE
            </Link>
          )}
        </div>
      )}
    </Fragment>
  );
}
