import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
const OptionsMenu = () => {
  const { user } = useSelector((state) => state.user);
  const role = user.payload.role;
  return (
    <div className="flex justify-between my-4 bg-red-600 text-white">
      <NavLink className=" hover:underline" to="/tags">
        Tags
      </NavLink>
      <NavLink className=" hover:underline" to="/expenses">
        Expenses
      </NavLink>
      {role === "admin" && (
        <NavLink className=" hover:underline" to="/category">
          Category
        </NavLink>
      )}
    </div>
  );
};

export default OptionsMenu;
