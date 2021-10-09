import React, { Fragment } from 'react';
import ExpenseField from './ExpenseField';

export default function ExpenseComponent({
  expenseData,
  setExpenseData,
  nextSection,
  incomeValueRef,
  incomeLabelRef,
}) {
  return (
    <Fragment>
      <h3 className='question-header'>What are all your expenses?</h3>
      {nextSection && (
        <ExpenseField
          incomeValueRef={incomeValueRef}
          incomeLabelRef={incomeLabelRef}
        />
      )}
    </Fragment>
  );
}
