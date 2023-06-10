import { Link } from "react-router-dom";
const Login = () => {
  return (
    <div className="max-w-md mx-auto px-4 py-2 mt-5">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center text-2xl font-medium leading-9 tracking-wider text-gray-800 pb-5 border-b border-gray-300">
          Login
        </h2>
      </div>
      <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
        <form action="#" className="space-y-6" method="post">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email Address
            </label>
            <div className="mt-2">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="email"
                required
                className="w-full px-4 py-2 rounded-sm ring-2 ring-gray-300 focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                type="password"
                name="password"
                id="password"
                placeholder="password"
                required
                className="w-full px-4 py-2 rounded-sm ring-2 ring-gray-300 focus:outline-none"
              />
            </div>
          </div>
          <div className="grid">
            <button className=" bg-indigo-500 text-white px-4 py-2 rounded-sm hover:bg-indigo-600">
              Login
            </button>
          </div>
        </form>
      </div>
      <div className=" mt-5 ml-5">
        <span className="text-gray-500">
          Don't have an account ?{" "}
          <Link to="/register" className="text-indigo-600">
            Register
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Login;
