import React, { Fragment } from 'react';

export default function IncomeField({ incomeValueRef, incomeLabelRef }) {
  return (
    <Fragment>
      <div className='field-wrapper'>
        <input
          autoComplete='off'
          type='text'
          name='income-name'
          className='textField'
          placeholder='Name of Income'
          id='income-label'
          ref={incomeLabelRef}
        />
        <input
          autoComplete='off'
          type='number'
          name='income-value'
          className='incomeField'
          placeholder='$ How much do you earn? '
          id='income-value'
          ref={incomeValueRef}
        />
      </div>
    </Fragment>
  );
}
