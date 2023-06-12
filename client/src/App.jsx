import React, { useState } from "react";
import { BiWallet } from "react-icons/bi";
import { RiMoneyDollarCircleFill } from "react-icons/ri";

const App = () => {
  const [balance, setBalance] = useState(100000000000000000);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  return (
    <div className="border-4 border-red-500 p-3 max-w-screen-lg mx-auto max-h-full">
      <div className="bg-indigo-200 p-4 rounded-sm mb-5 flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-medium tracking-wide ">Hi, Rahul</h3>
          <p className="my-2">
            Welcome back to your{" "}
            <span className="font-bold text-indigo-500">expenses tracker</span>
          </p>
        </div>
        <div>
          <a className=" bg-indigo-500 text-white px-4 py-2 rounded-sm hover:bg-indigo-600 cursor-pointer">
            Logout
          </a>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
        <div className="flex bg-indigo-300 items-center p-3 rounded-sm">
          <BiWallet className="text-indigo-700 text-2xl rounded-full mx-3" />
          <div>
            <p className=" font-light">Your Balance</p>
            <p className=" font-medium break-words max-w-xs">Rs {balance}</p>
          </div>
        </div>
        <div className="flex bg-green-300 items-center p-3 rounded-sm">
          <RiMoneyDollarCircleFill className="text-green-700 text-2xl rounded-full mx-3" />
          <div>
            <p className=" font-light">Your Income</p>
            <p className=" font-medium break-words max-w-xs">Rs {income}</p>
          </div>
        </div>
        <div className="flex bg-red-300 items-center p-3 rounded-sm">
          <RiMoneyDollarCircleFill className="text-red-700 text-2xl rounded-full mx-3" />
          <div>
            <p className=" font-light">Your Expenses</p>
            <p className=" font-medium break-words max-w-xs">Rs {expense}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <div>transaction</div>
        <div>history</div>
      </div>
    </div>
  );
};

export default App;
