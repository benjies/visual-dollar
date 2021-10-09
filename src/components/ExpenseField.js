import React, { Fragment } from 'react';

export default function ExpenseField({ incomeValueRef, incomeLabelRef }) {
  return (
    <Fragment>
      <div className='field-wrapper'>
        <input
          autoComplete='off'
          type='text'
          name='expense-name'
          className='textField'
          placeholder='Name of expense'
          id='expense-label'
          ref={incomeLabelRef}
        />
        <input
          autoComplete='off'
          type='number'
          name='expense-value'
          className='expenseField'
          placeholder='$ How much does it cost? '
          id='expense-value'
          ref={incomeValueRef}
        />
      </div>
    </Fragment>
  );
}
