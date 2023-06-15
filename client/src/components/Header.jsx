const Header = ({logout}) => {
  return (
    <div className="bg-indigo-200 p-4 rounded-sm mb-5 flex justify-between items-center">
      <div>
        <h3 className="text-2xl font-medium tracking-wide ">Hi, Rahul</h3>
        <p className="my-2">
          Welcome back to your{" "}
          <span className="font-bold text-indigo-500">expenses tracker</span>
        </p>
      </div>
      <div>
        <button onClick={()=>logout()} className=" bg-indigo-500 text-white px-4 py-2 rounded-sm hover:bg-indigo-600 cursor-pointer">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
