import React, { Fragment, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import ButtonComponent from './ButtonComponent';
import ChartComponent from './ChartComponent';
import ExpenseComponent from './ExpenseComponent';
import IncomeComponent from './IncomeComponent';

export default function BudgetPage() {
  // Boolean States
  const [isReady, setIsReady] = useState(false);
  const [nextSection, setNextSection] = useState(false);
  const [loadChart, setLoadChart] = useState(false);

  // Data States
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);

  //   Ref for the input fields
  const incomeLabelRef = useRef();
  const incomeValueRef = useRef();

  // Object Structure
  // { Label: string, Value: number }

  //  Create a new Income Item
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
  // Create a new Expense item
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

  // Remove Item from Income List
  const removeIncomeItem = (e) => {
    const value = e.target.getAttribute('value');
    const label = e.target.getAttribute('label');

    setIncomeData(
      incomeData.filter((item) =>
        item.Value !== value ? true : item.Label !== label
      )
    );
  };
  // Remove Item from Expense List
  const removeExpenseItem = (e) => {
    const value = e.target.getAttribute('value');
    const label = e.target.getAttribute('label');

    setExpenseData(
      expenseData.filter((item) =>
        item.Value !== parseInt(value) ? true : item.Label !== label
      )
    );
  };

  return (
    <Fragment>
      <Link to='/start'>
        <h2 className='brand-title'>Visual Dollar</h2>
      </Link>
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
                <div
                  className='list-item-control'
                  key={data.Value + data.Label + '-control'}
                >
                  <p className='list-item' key={data.Value + data.Label}>
                    {data.Label} : ${data.Value}
                  </p>
                  <button
                    className='remove-item-income'
                    key={data.Value + data.Label + '-remove'}
                    label={data.Label}
                    value={data.Value}
                    onClick={removeIncomeItem}
                  >
                    X
                  </button>
                </div>
              );
            })}
          </div>
        )}
        {/* EXPENSE LIST */}
        {nextSection && !loadChart && (
          <div className='expense-list-item-wrapper'>
            {expenseData.map((data) => {
              return (
                <div
                  className='list-item-control'
                  key={data.Value + data.Label + '-control'}
                >
                  <p className='list-item' key={data.Value + data.Label}>
                    {data.Label} : ${data.Value}
                  </p>
                  <button
                    className='remove-item'
                    key={data.Value + data.Label + '-remove'}
                    label={data.Label}
                    value={data.Value}
                    onClick={removeExpenseItem}
                  >
                    X
                  </button>
                </div>
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
