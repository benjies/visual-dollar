import React, { Fragment } from 'react';
import IncomeField from './IncomeField';

export default function IncomeComponent({
  incomeData,
  setIncomeData,
  isReady,
  setIsReady,
  incomeValueRef,
  incomeLabelRef,
}) {
  return (
    <Fragment>
      <h3 className='question-header'>What are all your income streams?</h3>
      {!isReady && (
        <button
          className='done-btn'
          onClick={() => {
            setIsReady(true);
          }}
        >
          BEGIN
        </button>
      )}
      {isReady && (
        <IncomeField
          incomeValueRef={incomeValueRef}
          incomeLabelRef={incomeLabelRef}
        />
      )}
    </Fragment>
  );
}
