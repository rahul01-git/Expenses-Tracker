import React from "react";

const App = () => {
  return (
    <div className="border-4 border-red-500 p-3 max-w-3xl mx-auto max-h-full">
      <div className="bg-indigo-200 p-4 rounded-sm mb-5 flex justify-between justify-center items-center">
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
      <div className="flex justify-between">
        <div>Balance</div>
        <div>Income</div>
        <div>Expenses</div>
      </div>
      <div className="flex justify-between">
        <div>transaction</div>
        <div>history</div>
      </div>
    </div>
  );
};

export default App;
