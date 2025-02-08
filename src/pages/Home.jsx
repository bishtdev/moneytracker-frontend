import React from "react";
import Navbar from "../components/Navbar";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4 space-y-6">
        <TransactionForm />
        <TransactionList />
      </div>
    </div>
  );
};

export default Home;
