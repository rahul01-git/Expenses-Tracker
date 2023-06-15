import OptionsMenu from "../components/OptionsMenu";
import Header from "../components/Header";
import Amount from "../components/Amount";
import { fetchProtectedInfo, onLogout } from "../api/auth";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { unAuthenticateUser } from "../redux/slices/authSlice";

const Home = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [protectedData, setProtectedData] = useState(null);

  const logout = async () => {
    try {
      await onLogout();
      dispatch(unAuthenticateUser());
      localStorage.removeItem("isAuth");
    } catch (error) {
      console.log(error.response);
    }
  };

  const protectedInfo = async () => {
    try {
      const { data } = await fetchProtectedInfo();
      setProtectedData(data.info);
      setLoading(false);
    } catch (error) {
      logout();
    }
  };

  useEffect(() => {
    protectedInfo();
  }, []);

  return loading ? (
    <div>
      <h1>Loading....</h1>
    </div>
  ) : (
    <div className="border-4 border-red-500 p-3 max-w-screen-lg mx-auto max-h-full">
      <Header logout={logout} />
      <Amount />
      {/* <OptionsMenu /> */}
    </div>
  );
};

export default Home;
