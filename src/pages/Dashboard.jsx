import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTransactions } from "../redux/transactionSlice";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";
import { Link } from "react-router-dom";
import { IoArrowBackCircle } from "react-icons/io5";

// Register Chart.js components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const Dashboard = () => {
  const { transactions } = useSelector((state) => state.transactions);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  // Calculate Totals
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;

  // Data for Pie Chart (Expenses by Category)
  const expenseTransactions = transactions.filter((t) => t.type === "expense");
  const categories = [...new Set(expenseTransactions.map((t) => t.category))];
  const categoryData = categories.map((cat) =>
    expenseTransactions
      .filter((t) => t.category === cat)
      .reduce((sum, t) => sum + t.amount, 0)
  );

  const pieData = {
    labels: categories,
    datasets: [
      {
        label: "Expenses by Category",
        data: categoryData,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
        hoverOffset: 4,
      },
    ],
  };

  // Data for Bar Chart (Monthly Expenses)
  const months = Array.from({ length: 12 }, (_, i) =>
    new Date(0, i).toLocaleString("en", { month: "short" })
  );
  const monthlyData = months.map((_, month) =>
    transactions
      .filter(
        (t) => t.type === "expense" && new Date(t.date).getMonth() === month
      )
      .reduce((sum, t) => sum + t.amount, 0)
  );

  const barData = {
    labels: months,
    datasets: [
      {
        label: "Monthly Expenses",
        data: monthlyData,
        backgroundColor: "#4BC0C0",
        borderColor: "#36A2EB",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-4">
      <div className="flex items-center gap-5 py-2">
        <Link to="/">
          <IoArrowBackCircle className="text-5xl hover:scale-110 duration-200" />
        </Link>
        <h1 className="text-3xl font-playwrite ">Dashboard</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 font-roboto font-light">
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-lg font-bold">Total Income</h2>
          <p className="text-2xl text-green-500">₹{totalIncome}</p>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-lg font-bold">Total Expense</h2>
          <p className="text-2xl text-red-500">₹{totalExpense}</p>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-lg font-bold">Balance</h2>
          <p className="text-2xl text-blue-500">₹{balance}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 shadow rounded ">
          <h2 className="text-lg font-bold mb-4">Expenses by Category</h2>
          <Doughnut
            key={JSON.stringify(pieData)}
            data={pieData}
            options={{ maintainAspectRatio: true }}
            height={200}
            width={100}
          />
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h2 className="text-lg font-bold mb-4">Monthly Expenses</h2>
          <Bar key={JSON.stringify(barData)} data={barData} height={210} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
