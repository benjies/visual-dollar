import React, { Fragment, useState, useRef } from 'react';
import ButtonComponent from './ButtonComponent';
import ChartComponent from './ChartComponent';
import ExpenseComponent from './ExpenseComponent';
import IncomeComponent from './IncomeComponent';

export default function BudgetPage() {
  const [isReady, setIsReady] = useState(false);
  const [nextSection, setNextSection] = useState(false);
  const [loadChart, setLoadChart] = useState(false);
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  //   Ref for the input fields
  const incomeLabelRef = useRef();
  const incomeValueRef = useRef();

  // { label: '', value: 0, index: 0 }
  //   new list item for income
  const newIncomeItem = () => {
    let newIncome = {
      Label: incomeLabelRef.current.value,
      Value: incomeValueRef.current.value,
    };
    if (
      incomeLabelRef.current.value === '' ||
      incomeValueRef.current.value === ''
    ) {
      return;
    } else {
      setIncomeData((oldData) => [...oldData, newIncome]);
      incomeLabelRef.current.value = '';
      incomeValueRef.current.value = '';
    }
  };
  const newExpenseItem = () => {
    let newExpense = {
      Label: incomeLabelRef.current.value,
      Value: -incomeValueRef.current.value,
    };
    if (
      incomeLabelRef.current.value === '' ||
      incomeValueRef.current.value === ''
    ) {
      return;
    } else {
      setExpenseData((oldData) => [...oldData, newExpense]);
      incomeLabelRef.current.value = '';
      incomeValueRef.current.value = '';
    }
  };

  return (
    <Fragment>
      <h2 className='brand-title'>Visual Dollar</h2>
      <div className='budget-input-wrapper'>
        {/* Income Part */}
        {!nextSection && !loadChart && (
          <IncomeComponent
            incomeData={incomeData}
            setIncomeData={setIncomeData}
            isReady={isReady}
            setIsReady={setIsReady}
            incomeValueRef={incomeValueRef}
            incomeLabelRef={incomeLabelRef}
          />
        )}
        {/* Expense Part */}
        {nextSection && !loadChart && (
          <ExpenseComponent
            expenseData={expenseData}
            setExpenseData={setExpenseData}
            incomeValueRef={incomeValueRef}
            incomeLabelRef={incomeLabelRef}
            nextSection={nextSection}
          />
        )}
        {/* Display Buttons */}
        {isReady && (
          <ButtonComponent
            incomeValueRef={incomeValueRef}
            incomeLabelRef={incomeLabelRef}
            newIncomeItem={newIncomeItem}
            isReady={isReady}
            nextSection={nextSection}
            newExpenseItem={newExpenseItem}
            setNextSection={setNextSection}
            loadChart={loadChart}
            setLoadChart={setLoadChart}
            incomeData={incomeData}
            expenseData={expenseData}
          />
        )}
        {/* INCOME LIST */}
        {isReady && !nextSection && (
          <div className='income-list-item-wrapper'>
            {incomeData.map((data) => {
              return (
                <p className='list-item' key={data.Value + data.Label}>
                  {data.Label} : ${data.Value}
                </p>
              );
            })}
          </div>
        )}
        {/* EXPENSE LIST */}
        {nextSection && !loadChart && (
          <div className='expense-list-item-wrapper'>
            {expenseData.map((data) => {
              return (
                <p className='list-item' key={data.Value + data.Label}>
                  {data.Label} : ${data.Value}
                </p>
              );
            })}
          </div>
        )}
      </div>
      {/* Visualize Data */}
      {loadChart && (
        <ChartComponent incomeData={incomeData} expenseData={expenseData} />
      )}
    </Fragment>
  );
}
