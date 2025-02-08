import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTransaction, fetchTransactions } from "../redux/transactionSlice";
import axios from "axios";

const TransactionForm = () => {
  const [formData, setFormData] = useState({
    amount: "",
    type: "expense",
    category: "",
    description: "",
  });

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Get token from local storage
      const user = JSON.parse(localStorage.getItem("user"));
      const token = user?.token;

      if (!token) {
        console.error("No token found");
        return;
      }

      // Configure headers with the token
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Make the POST request
      const response = await axios.post(
        "https://moneytracker-backend-unuq.onrender.com/api/transactions",
        formData,
        config
      );

      console.log("Transaction added successfully:", response.data);

      // Refresh transactions
      dispatch(fetchTransactions());

      // Reset form
      setFormData({
        amount: "",
        type: "expense",
        category: "",
        description: "",
      });
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  return (
    <form
    onSubmit={handleSubmit}
    className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl space-y-6 dark:text-slate-100"
  >
    <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">Add Transaction</h2>
  
    {/* Amount Input */}
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Amount</label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">₹</span>
        <input
          type="number"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          className="w-full pl-8 pr-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500 dark:bg-slate-700 dark:text-white transition-all"
          placeholder="0.00"
          required
        />
      </div>
    </div>
  
    {/* Type Select */}
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Type</label>
      <div className="relative">
        <select
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          className="w-full py-3 pl-4 pr-8 border border-slate-300 dark:border-slate-600 rounded-lg appearance-none focus:ring-2 focus:ring-lime-500 focus:border-lime-500 dark:bg-slate-700 dark:text-white bg-no-repeat bg-[length:20px_20px] bg-[right_1rem_center] transition-all"
          style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN3cm9rZS1saW5lam9pbj0icm91bmQiPjxwb2x5bGluZSBwb2ludHM9IjYgOSAxMiAxNSAxOCA5Ij48L3BvbHlsaW5lPjwvc3ZnPg==')" }}
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
      </div>
    </div>
  
    {/* Category Input */}
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Category</label>
      <div className="relative">
        <input
          type="text"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500 dark:bg-slate-700 dark:text-white transition-all"
          placeholder="e.g. Food, Salary"
          required
        />
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute right-3 top-1/2 -translate-y-1/2 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z" />
        </svg>
      </div>
    </div>
  
    {/* Description Textarea */}
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Description</label>
      <textarea
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-lime-500 focus:border-lime-500 dark:bg-slate-700 dark:text-white transition-all"
        rows="3"
        placeholder="Add details about the transaction..."
      />
    </div>
  
    {/* Submit Button */}
    <button
      type="submit"
      className="w-full bg-gradient-to-r from-lime-500 to-teal-500 hover:from-lime-600 hover:to-teal-600 text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:shadow-lg hover:-translate-y-0.5"
    >
      Add Transaction
    </button>
  </form>
  );
};

export default TransactionForm;
