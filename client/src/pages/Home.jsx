import OptionsMenu from "../components/OptionsMenu";
import Header from "../components/Header";
import Amount from "../components/Amount";
import { fetchProtectedInfo, onLogout } from "../api/auth";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { unAuthenticateUser } from "../redux/slices/authSlice";
import { populateData,unPopulateData } from "../redux/slices/userSlice";
import { Outlet } from "react-router-dom";

const Home = () => {

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const logout = async () => {
    try {
      await onLogout();
      dispatch(unPopulateData())
      dispatch(unAuthenticateUser());
      localStorage.removeItem("isAuth");
    } catch (error) {
      console.log(error.response);
    }
  };

  const protectedInfo = async () => {
    try {
      const { data } = await fetchProtectedInfo();
      dispatch(populateData(data))
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
    <div className="border-4 border-indigo-500 p-3 max-h-full">
      <Header logout={logout} />
      <Amount />
      <OptionsMenu />
      <Outlet/>
    </div>
  );
};

export default Home;
