import { BrowserRouter, Routes, Route, Outlet,Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import { useSelector } from "react-redux";
import PageNotFound from "../pages/PageNotFound";
import Tags from '../components/Tags'
import Categories from '../components/Categories'
import Expenses from '../components/Expenses'

const PrivateRoutes = () => {
  const { isAuth } = useSelector((state) => state.auth);
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

const RestrictedRoutes = () => {
  const { isAuth } = useSelector((state) => state.auth);
  return !isAuth ? <Outlet /> : <Navigate to="/" />;
};

const AllRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route exact path="/" element={<Home />}>
            <Route path='tags' element={<Tags/>} />
            <Route path='category' element={<Categories />} />
            <Route path='expenses' element={<Expenses />} />
          </Route>
        </Route>
        <Route element={<RestrictedRoutes />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AllRoutes;
