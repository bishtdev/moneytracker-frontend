import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions, deleteTransactionAsync } from "../redux/transactionSlice";
import axios from "axios";

const TransactionList = () => {
  const { transactions, loading } = useSelector((state) => state.transactions);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth)
  

  useEffect(() => {
    console.log("Dispatching fetchTransactions...");
    dispatch(fetchTransactions());
  }, [dispatch]);
  console.log("Transactions from Redux state:", transactions);

  const handleDelete = (id) => {
    // Dispatch the thunk to delete the transaction.
    dispatch(deleteTransactionAsync(id));
  };
  

  if (loading) return <p>Loading transactions...</p>;

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg dark:text-slate-100">
    <h2 className="text-2xl font-bold mb-6 font-playwrite text-slate-800 dark:text-white">Transaction History</h2>
    {transactions.length === 0 ? (
      <div className="text-center py-8">
        <p className="text-slate-500 dark:text-slate-400">No transactions found. Start adding some!</p>
      </div>
    ) : (
      <ul className=" grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-3 ">
        {transactions.map((transaction) => (
          <li
            key={transaction._id}
            className="group relative p-4 bg-slate-50 dark:bg-slate-700 rounded-lg transition-all hover:shadow-md hover:translate-x-1"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-semibold text-slate-800 dark:text-white capitalize">
                  {transaction.description}
                </h3>
                <div className="mt-1 flex items-center gap-2 text-sm">
                  <span className={`px-2 pb-1 rounded-full ${transaction.type === 'income' ? 'bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-300'}`}>
                    {transaction.type}
                  </span>
                  <span className="text-slate-600 dark:text-slate-400">
                    {transaction.category}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`text-lg font-medium ${transaction.type === 'income' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  ₹{transaction.amount.toLocaleString()}
                </span>
                <button
                  onClick={() => handleDelete(transaction._id)}
                  className="text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                  aria-label="Delete transaction"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    )}
  </div>
  );
};

export default TransactionList;
